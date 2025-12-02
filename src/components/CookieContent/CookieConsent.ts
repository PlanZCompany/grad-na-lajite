export type CookieConsentValue = 'all' | 'necessary'

const STORAGE_KEY = 'cookie_consent_GNL'

export function getCookieConsent(): CookieConsentValue | null {
  if (typeof window === 'undefined') return null

  const raw = window.localStorage.getItem(STORAGE_KEY)
  if (!raw) return null

  if (raw === 'all' || raw === 'necessary') return raw
  return null
}

export function setCookieConsent(value: CookieConsentValue) {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(STORAGE_KEY, value)
}

export function hasAnalyticsConsent(value: CookieConsentValue | null): boolean {
  return value === 'all'
}
