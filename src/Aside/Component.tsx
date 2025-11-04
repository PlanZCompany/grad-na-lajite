import React from 'react'
import { getCachedGlobal } from '@/utils/getGlobals'

import { Aside } from '@/payload-types'
import AsideClient from './Component.client'

export async function AsideComponent() {
  const asideData = (await getCachedGlobal('aside', 1)()) as Aside

  return <AsideClient asideData={asideData} />
}
