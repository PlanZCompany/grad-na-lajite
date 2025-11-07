'use server'

import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { cookies } from 'next/headers'

export async function isUserSubscribed(): Promise<{ data: boolean }> {
  const payload = await getPayload({ config: configPromise })

  const jar = await cookies()
  const token = jar.get('payload-token')?.value
  if (!token) return { data: false }

  const headers = new Headers()
  headers.set('Authorization', `JWT ${token}`) // Payload supports this header :contentReference[oaicite:0]{index=0}

  const { user } = await payload.auth({ headers })

  if (!!user && user.subscribed)
    return {
      data: true,
    }

  return {
    data: false,
  }
}
