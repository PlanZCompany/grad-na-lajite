import React from 'react'
import { getCachedGlobal } from '@/utils/getGlobals'

import type { Header } from '@/payload-types'
import HeaderClient from './Component.client'

export async function Header() {
  const headerData = (await getCachedGlobal('header', 1)()) as Header

  return <HeaderClient headerData={headerData} />
}
