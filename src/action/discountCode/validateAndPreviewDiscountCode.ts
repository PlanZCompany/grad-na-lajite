'use server'

import { getPayload } from 'payload'
import config from '@payload-config'

const FAILED_ATTEMPT_LIMIT = 5
const FAILED_ATTEMPT_WINDOW_MIN = 10

const normalizeCode = (code: string) => code.trim().toUpperCase()
const normalizeEmail = (email?: string | null) => (email ? email.trim().toLowerCase() : undefined)

export async function validateDiscountCode(
  code: string,
  clientKey: string,
  usedEmail?: string | null,
  userId?: number | null,
) {
  const payload = await getPayload({ config })

  const normalizedCode = normalizeCode(code)
  const normalizedEmail = normalizeEmail(usedEmail)

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

  // 0) Anti-spam
  const windowStartISO = new Date(Date.now() - FAILED_ATTEMPT_WINDOW_MIN * 60_000).toISOString()

  const failedRecent = await payload.find({
    collection: 'discount-code-attempt',
    where: {
      and: [
        { clientKey: { equals: clientKey } },
        { success: { equals: false } },
        { createdAt: { greater_than_equal: windowStartISO } },
      ],
    },
    limit: 0,
    pagination: false,
  })

  if ((failedRecent.totalDocs ?? 0) >= FAILED_ATTEMPT_LIMIT) {
    await logAttempt(false, 'TOO_MANY_ATTEMPTS_TRY_LATER')
    return { ok: false as const, reason: 'TOO_MANY_ATTEMPTS_TRY_LATER', normalizedCode }
  }

  // 1) Empty / invalid code
  if (!normalizedCode) {
    await logAttempt(false, 'INVALID_CODE')
    return { ok: false as const, reason: 'INVALID_CODE', normalizedCode }
  }

  // 2) Find code
  const found = await payload.find({
    collection: 'discount-code',
    where: { code: { equals: normalizedCode } },
    limit: 1,
    pagination: false,
  })

  const discountCode = found.docs[0]
  if (!discountCode) {
    await logAttempt(false, 'CODE_NOT_FOUND')
    return { ok: false as const, reason: 'CODE_NOT_FOUND', normalizedCode }
  }

  // 3) Active
  if (discountCode.isActive === false) {
    await logAttempt(false, 'CODE_INACTIVE')
    return { ok: false as const, reason: 'CODE_INACTIVE', normalizedCode }
  }

  // 4) Date range (optional)
  const now = new Date()

  if (discountCode.startDate && now < new Date(discountCode.startDate)) {
    await logAttempt(false, 'CODE_NOT_STARTED_YET')
    return { ok: false as const, reason: 'CODE_NOT_STARTED_YET', normalizedCode }
  }

  if (discountCode.endDate && now > new Date(discountCode.endDate)) {
    await logAttempt(false, 'CODE_EXPIRED')
    return { ok: false as const, reason: 'CODE_EXPIRED', normalizedCode }
  }

  await logAttempt(true)
  return { ok: true as const, normalizedCode, discountCodeId: String(discountCode.id) }
}
