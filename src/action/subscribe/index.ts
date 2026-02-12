'use server'

import crypto from 'node:crypto'
import configPromise from '@payload-config'
import type { User } from '@/payload-types'
import { getPayload } from 'payload'

type SubscribeResult =
  | {
      ok: true
      message: string
      discountCode?: string
      userName: string
    }
  | { ok: false; message: string; fieldErrors?: { email?: string } }

async function createUniqueDiscountCode(
  ensureUnique: (code: string) => Promise<boolean>,
  maxTries = 5,
): Promise<string> {
  for (let i = 0; i < maxTries; i++) {
    const raw = crypto.randomBytes(4).toString('hex').toUpperCase() // e.g., "7F3A2BCD"
    const code = `${raw.slice(0, 4)}-${raw.slice(4, 8)}`
    const isUnique = await ensureUnique(code)
    if (isUnique) return code
  }
  throw new Error('Unable to generate a unique discount code.')
}

export async function subscribeAction(
  userEmail: string,
  sourceForm: User['marketing_consent_source'] | null = 'other',
): Promise<SubscribeResult> {
  try {
    const parsed = userEmail.trim().toLowerCase()

    if (!parsed) return { ok: false, message: 'Invalid email address.' }

    const payload = await getPayload({ config: configPromise })

    // 1) Try to find a user by email
    const userRes = await payload.find({
      collection: 'users',
      where: { email: { equals: parsed } },
      limit: 1,
    })

    let discountCodeToReturn: string | undefined
    let anonimousDiscountCodeToReturn: string | undefined
    let userId: string | number | undefined

    if (userRes.docs.length > 0) {
      const user = userRes.docs[0] as User
      userId = user.id

      const updates: Partial<User> = {}
      if (user.role === 'user') {
        if (!user.subscribed) updates.subscribed = true

        if (!user.discountCode) {
          const uniqueChecker = async (code: string) => {
            const existing = await payload.find({
              collection: 'users',
              where: { discountCode: { equals: code } },
              limit: 1,
            })
            return existing.docs.length === 0
          }
          const newCode = await createUniqueDiscountCode(uniqueChecker)
          updates.discountCode = newCode
          discountCodeToReturn = newCode
        }
      }

      if (Object.keys(updates).length > 0) {
        updates.marketing_consent = true
        updates.marketing_consent_date = new Date().toISOString()
        updates.marketing_consent_source = sourceForm
        updates.newsletter_status = 'subscribed'

        await payload.update({
          collection: 'users',
          id: user.id,
          data: updates,
        })
      }
    }

    // 2) Upsert subscription
    const existingSub = await payload.find({
      collection: 'subscriptions',
      where: { email: { equals: parsed } },
      limit: 1,
    })

    if (existingSub.docs.length > 0) {
      const sub = existingSub.docs[0]
      if (userId && !sub.user) {
        await payload.update({
          collection: 'subscriptions',
          id: sub.id,
          data: { user: userId as number },
        })
      }
      return {
        ok: true,
        message: userId
          ? 'Вече сте абонирани. Профилът е синхронизиран със записа за абонамент.'
          : 'Вече сте абонирани с този имейл.',
        discountCode: sub.discountCode ?? discountCodeToReturn, // ако имаш поле discountCode в subscriptions
        userName: userId ? ((userRes.docs[0] as User).firstName as string) : 'Играч',
      }
    } else {
      const annommousDiscountCode = await createUniqueDiscountCode(() => Promise.resolve(true))
      anonimousDiscountCodeToReturn = annommousDiscountCode

      await payload.create({
        collection: 'subscriptions',
        data: {
          email: parsed,
          discountCode: userRes.docs.length > 0 ? discountCodeToReturn : annommousDiscountCode,
        },
      })
    }

    return {
      ok: true,
      message: 'Успешно се абонирахте.',
      discountCode: userRes.docs.length > 0 ? discountCodeToReturn : anonimousDiscountCodeToReturn,
      userName: userId ? ((userRes.docs[0] as User).firstName as string) : 'Играч',
    }
  } catch (error: unknown) {
    const err = error as { data: { errors: { message: string }[] } }
    if (err?.data?.errors?.[0]?.message?.includes('unique')) {
      return { ok: true, message: 'Вече сте абонирани с този имейл.', userName: 'Играч' }
    }
    console.error('subscribeAction error:', err)
    return { ok: false, message: 'Нещо се обърка. Опитайте отново след малко.' }
  }
}
