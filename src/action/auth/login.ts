'use server'

import { cookies } from 'next/headers'
import { getPayload } from 'payload'
import config from '@payload-config'
import { User } from '@/payload-types'

export async function login(values: {
  email: string
  password: string
}): Promise<{ ok: boolean; user: User }> {
  const payload = await getPayload({ config })

  const res = await payload.login({
    collection: 'users',
    data: { email: values.email.toLowerCase(), password: values.password },
  })

  const jwt = res?.token
  if (!jwt) throw new Error('Login failed: no token returned')

  const cookieStore = await cookies() // Next 15: async
  cookieStore.set({
    name: 'payload-token',
    value: jwt,
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    secure: process.env.NODE_ENV === 'production',
    // maxAge: 60 * 60 * 24 * 7, // optional
  })

  const user = res?.user

  return { ok: true, user }
}
