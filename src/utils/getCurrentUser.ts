'use server'

import { cookies } from 'next/headers'
import { getPayload } from 'payload'
import configPromise from '@/payload.config'

export async function getCurrentUser() {
  const payload = await getPayload({ config: configPromise })

  const jar = await cookies()
  const cookieHeader = jar
    .getAll()
    .map((c) => `${c.name}=${encodeURIComponent(c.value)}`)
    .join('; ')

  const h = new Headers()
  h.set('cookie', cookieHeader)

  const { user } = await payload.auth({ headers: h })
  return user ?? null
}
