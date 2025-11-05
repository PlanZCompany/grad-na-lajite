import React from 'react'
import { getCachedGlobal } from '@/utils/getGlobals'

import { SubscriptionModal } from '@/payload-types'
import SubscriptionModalClient from './Component.client'

export async function SubscriptionModalComponent() {
  const data = (await getCachedGlobal('subscriptionModal', 1)()) as SubscriptionModal

  return <SubscriptionModalClient data={data} />
}
