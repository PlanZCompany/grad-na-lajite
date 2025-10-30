// app/(auth)/_actions/reset-password.ts
'use server'

import { cookies } from 'next/headers'
import { getPayload } from 'payload'
import config from '@payload-config'

type ResetUser = { email?: string }

export async function resetPassword(values: { token: string; password: string }) {
  const input = values
  const payload = await getPayload({ config })

  const resetRes = await payload.resetPassword({
    collection: 'users',
    data: { password: input.password, token: input.token },
    overrideAccess: true,
  })

  const email = (resetRes?.user as ResetUser | undefined)?.email
  if (!email) throw new Error('Password updated, but user email is unavailable.')

  const loginRes = await payload.login({
    collection: 'users',
    data: { email: email.toLowerCase(), password: input.password },
  })
  const jwt = loginRes?.token
  if (!jwt) throw new Error('Auto-login failed: no token returned.')

  const c = await cookies()
  c.set({
    name: 'payload-token',
    value: jwt,
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    secure: process.env.NODE_ENV === 'production',
  })

  return { ok: true }
}
