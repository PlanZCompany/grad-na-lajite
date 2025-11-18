'use client'

import { isUserSubscribed } from '@/action/subscribe/getUserSubscription'
import React, { useEffect, useRef } from 'react'

const SubscriptionModalActivator = () => {
  const timeOut = useRef<NodeJS.Timeout | null>(null)

  const needToShowModalHandler = async () => {
    const itIsSubscribed = await isUserSubscribed()

    if (itIsSubscribed.data === true) return

    timeOut.current = setTimeout(() => {
      const target = document.querySelector('.REF_SUBSCRIPTION_MODAL') as HTMLElement

      if (target) {
        target.click()
      }
    }, 5000)
  }

  useEffect(() => {
    needToShowModalHandler()
  }, [])

  return <></>
}

export default SubscriptionModalActivator
