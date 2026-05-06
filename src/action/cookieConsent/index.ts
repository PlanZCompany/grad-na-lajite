'use server'

import { cookies } from 'next/headers'

// cookie consent
const CONSENT_COOKIE_NAME = 'cookie-consent'
const CONSENT_COOKIE_VALUE = 'granted'
const NECESSARY_COOKIE_VALUE = 'necessary'

export default async function cookieConsent(): Promise<'granted' | 'necessary' | null> {
  const cookieStore = await cookies()
  const cookieConsent = cookieStore.get(CONSENT_COOKIE_NAME)?.value

  if (cookieConsent === CONSENT_COOKIE_VALUE) return 'granted'
  if (cookieConsent === NECESSARY_COOKIE_VALUE) return 'necessary'

  return null
}
