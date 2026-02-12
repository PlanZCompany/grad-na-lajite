'use client'

import { useEffect, useRef } from 'react'
import { isUserSubscribed } from '@/action/subscribe/getUserSubscription'
import {
  isActive,
  isLocked,
  setLockNow,
  setForDays,
  LS_DISMISSED,
  LS_SUBSCRIBED,
  POPUP_DELAY_MS,
  SUB_DAYS,
} from '@/utils/newsletterPopup'

const SubscriptionModalActivator = () => {
  const timeOut = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return

    // 1) local fast checks
    if (isActive(LS_SUBSCRIBED)) return
    if (isActive(LS_DISMISSED)) return

    // 2) lock check (must be 30s)
    if (isLocked()) return
    ;(async () => {
      // 3) optional server check for logged-in users
      try {
        const itIsSubscribed = await isUserSubscribed()
        if (itIsSubscribed.data === true) {
          setForDays(LS_SUBSCRIBED, SUB_DAYS)
          return
        }
      } catch {
        // ignore (offline / error) -> fallback to local rules
      }

      // 4) will show => write lock BEFORE show
      setLockNow()

      timeOut.current = setTimeout(() => {
        const target = document.querySelector('.REF_SUBSCRIPTION_MODAL') as HTMLElement | null
        target?.click()
      }, POPUP_DELAY_MS)
    })()

    return () => {
      if (timeOut.current) clearTimeout(timeOut.current)
    }
  }, [])

  return null
}

export default SubscriptionModalActivator
