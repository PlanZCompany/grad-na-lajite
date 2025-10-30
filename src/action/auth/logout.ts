'use server'

import { cookies } from 'next/headers'

export async function logout() {
  const c = await cookies()
  c.delete('payload-token')

  return { ok: true }
}
