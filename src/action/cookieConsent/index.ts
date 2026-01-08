'use server'

import { cookies } from 'next/headers'

// cookie consent
const CONSENT_COOKIE_NAME = 'cookie-consent'
const CONSENT_COOKIE_VALUE = 'granted'

export default async function cookieConsent(): Promise<'granted' | 'necessary'> {
  const cookieStore = await cookies()
  const cookieConsent = cookieStore.get(CONSENT_COOKIE_NAME)?.value

  if (cookieConsent === CONSENT_COOKIE_VALUE) return 'granted'

  return 'necessary'
}
