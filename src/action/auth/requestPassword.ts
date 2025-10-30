'use server'

import { getPayload } from 'payload'
import config from '@payload-config'

export async function requestPasswordReset(email: string) {
  const payload = await getPayload({ config })

  await payload.forgotPassword({
    collection: 'users',
    data: { email: email.toLowerCase() },
  })

  return { ok: true, message: 'If an account exists, a reset link has been sent.' }
}
