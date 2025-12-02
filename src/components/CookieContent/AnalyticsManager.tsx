'use client'

import { useEffect } from 'react'
import { getCookieConsent, hasAnalyticsConsent } from './CookieConsent'
import { initAnalyticsTools } from './Analytics'

export function AnalyticsManager() {
  useEffect(() => {
    const consent = getCookieConsent()
    if (hasAnalyticsConsent(consent)) {
      initAnalyticsTools()
    }
  }, [])

  return null
}
