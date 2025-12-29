'use server'

import { getPayload } from 'payload'
import config from '@payload-config'
import { headers } from 'next/headers'
import crypto from 'crypto'
import type { Where } from 'payload'

const FAILED_ATTEMPT_LIMIT = 5
const FAILED_ATTEMPT_WINDOW_MIN = 10

async function getDummyClientKey(): Promise<string> {
  const requestHeaders = await headers()

  const userAgent = (requestHeaders.get('user-agent') ?? '').trim() || 'unknown-ua'
  const forwardedForHeader = (requestHeaders.get('x-forwarded-for') ?? '').trim()
  const ipFromForwardedFor = (forwardedForHeader.split(',')[0] ?? '').trim()
  const ipFromRealIp = (requestHeaders.get('x-real-ip') ?? '').trim()

  const clientIp = ipFromForwardedFor || ipFromRealIp || 'unknown-ip'

  return crypto.createHash('sha256').update(`${clientIp}|${userAgent}`).digest('hex')
}

type ValidateResult =
  | {
      ok: true
      normalizedCode: string
      discountCodeId: string
      discountType: 'percent' | 'fixed'
      discountValue: number
    }
  | {
      ok: false
      normalizedCode: string
      reason:
        | 'INVALID_CODE'
        | 'TOO_MANY_ATTEMPTS_TRY_LATER'
        | 'CODE_NOT_FOUND'
        | 'CODE_INACTIVE'
        | 'CODE_NOT_STARTED_YET'
        | 'CODE_EXPIRED'
        | 'CODE_GLOBAL_LIMIT_REACHED'
        | 'USER_IDENTIFICATION_REQUIRED'
        | 'CODE_USER_LIMIT_REACHED'
    }

export async function validateDiscountCode(
  code: string,
  usedEmail?: string | null,
  userId?: number | null,
): Promise<ValidateResult> {
  const payload = await getPayload({ config })

  const clientKey = await getDummyClientKey()
  const normalizedCode = code.trim().toUpperCase()
  const normalizedEmail = usedEmail ? usedEmail.trim().toLowerCase() : undefined

  const logAttempt = async (success: boolean, failReason?: string) => {
    await payload.create({
      collection: 'discount-code-attempt',
      data: {
        clientKey,
        code: normalizedCode,
        success,
        failReason: success ? undefined : failReason,
        usedEmail: normalizedEmail,
        user: userId ?? undefined,
        createdAt: new Date().toISOString(),
      },
    })
  }

  // 0) Anti-spam: failed attempts in window
  const attemptWindowStartISO = new Date(
    Date.now() - FAILED_ATTEMPT_WINDOW_MIN * 60_000,
  ).toISOString()

  const recentFailedAttempts = await payload.find({
    collection: 'discount-code-attempt',
    where: {
      and: [
        { clientKey: { equals: clientKey } },
        { success: { equals: false } },
        { createdAt: { greater_than_equal: attemptWindowStartISO } },
      ],
    },
    limit: FAILED_ATTEMPT_LIMIT,
    pagination: false,
  })

  if ((recentFailedAttempts.totalDocs ?? 0) >= FAILED_ATTEMPT_LIMIT) {
    await logAttempt(false, 'TOO_MANY_ATTEMPTS_TRY_LATER')
    return { ok: false, normalizedCode, reason: 'TOO_MANY_ATTEMPTS_TRY_LATER' }
  }

  // 1) Basic validation
  if (!normalizedCode) {
    await logAttempt(false, 'INVALID_CODE')
    return { ok: false, normalizedCode, reason: 'INVALID_CODE' }
  }

  const foundDiscountCodes = await payload.find({
    collection: 'discount-code',
    where: { code: { equals: normalizedCode } },
    limit: 1,
    pagination: false,
  })

  const discountCode = foundDiscountCodes.docs[0]
  if (!discountCode) {
    await logAttempt(false, 'CODE_NOT_FOUND')
    return { ok: false, normalizedCode, reason: 'CODE_NOT_FOUND' }
  }

  if (discountCode.isActive === false) {
    await logAttempt(false, 'CODE_INACTIVE')
    return { ok: false, normalizedCode, reason: 'CODE_INACTIVE' }
  }

  const now = new Date()

  if (discountCode.startDate && now < new Date(discountCode.startDate)) {
    await logAttempt(false, 'CODE_NOT_STARTED_YET')
    return { ok: false, normalizedCode, reason: 'CODE_NOT_STARTED_YET' }
  }

  if (discountCode.endDate && now > new Date(discountCode.endDate)) {
    await logAttempt(false, 'CODE_EXPIRED')
    return { ok: false, normalizedCode, reason: 'CODE_EXPIRED' }
  }

  // Usage limits: maxUsesTotal
  if (typeof discountCode.maxUsesTotal === 'number') {
    const totalUsageCount = await payload.find({
      collection: 'discount-code-usages',
      where: { discountCode: { equals: discountCode.id } },
      limit: 1,
      pagination: false,
    })

    if ((totalUsageCount.totalDocs ?? 0) >= discountCode.maxUsesTotal) {
      await logAttempt(false, 'CODE_GLOBAL_LIMIT_REACHED')
      return { ok: false as const, normalizedCode, reason: 'CODE_GLOBAL_LIMIT_REACHED' }
    }
  }

  // Usage limits: maxUsesPerUser
  if (typeof discountCode.maxUsesPerUser === 'number') {
    const hasAuthenticatedUser = typeof userId === 'number'
    const hasGuestEmail = Boolean(normalizedEmail)

    if (!hasAuthenticatedUser && !hasGuestEmail) {
      await logAttempt(false, 'USER_IDENTIFICATION_REQUIRED')
      return { ok: false as const, normalizedCode, reason: 'USER_IDENTIFICATION_REQUIRED' }
    }

    let perCustomerUsageWhere: Where

    if (hasAuthenticatedUser) {
      perCustomerUsageWhere = {
        and: [{ discountCode: { equals: discountCode.id } }, { user: { equals: userId } }],
      }
    } else {
      perCustomerUsageWhere = {
        and: [
          { discountCode: { equals: discountCode.id } },
          { usedEmail: { equals: normalizedEmail! } },
        ],
      }
    }

    const perCustomerUsageCount = await payload.find({
      collection: 'discount-code-usages',
      where: perCustomerUsageWhere,
      limit: 1,
      pagination: false,
    })

    if ((perCustomerUsageCount.totalDocs ?? 0) >= discountCode.maxUsesPerUser) {
      await logAttempt(false, 'CODE_USER_LIMIT_REACHED')
      return { ok: false as const, normalizedCode, reason: 'CODE_USER_LIMIT_REACHED' }
    }
  }

  await logAttempt(true)
  return {
    ok: true,
    normalizedCode,
    discountCodeId: String(discountCode.id),
    discountType: discountCode.discountType,
    discountValue: discountCode.discountValue,
  }
}
