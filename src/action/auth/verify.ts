// app/(auth)/_actions/verify.ts
'use server'

import { cookies } from 'next/headers'
import { getPayload } from 'payload'
import config from '@payload-config'

export async function verifyUser(
  token: string,
  opts?: { autoLogin?: { email: string; password: string } }
) {
  const payload = await getPayload({ config })

  await payload.verifyEmail({
    collection: 'users',
    token,
  })

  if (opts?.autoLogin) {
    const loginRes = await payload.login({
      collection: 'users',
      data: {
        email: opts.autoLogin.email.toLowerCase(),
        password: opts.autoLogin.password,
      },
    })

    const jwt = loginRes?.token
    if (!jwt) {
      throw new Error('Auto-login failed: no token returned')
    }

    const cookieStore = await cookies()
    cookieStore.set({
      name: 'payload-token',
      value: jwt,
      httpOnly: true,
      sameSite: 'lax',
      path: '/',
      secure: process.env.NODE_ENV === 'production',
      // maxAge: 60 * 60 * 24 * 7, // optional
    })
  }

  return { ok: true }
}
