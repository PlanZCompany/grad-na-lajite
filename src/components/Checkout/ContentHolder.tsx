'use client'

import React from 'react'
import CheckoutAside from './CheckoutAside'
import CheckoutForms from './CheckoutForms'
import { SpeedySite } from '@/Speedy/types'
import { BoxnowLocker } from '@/BoxNow/types'
import { useAppSelector } from '@/hooks/redux-hooks'

const ContentHolder = ({
  econtCities,
  speedySites,
  boxNowCities,
}: {
  econtCities: {
    id: number
    name: string
  }[]
  speedySites: SpeedySite[]
  boxNowCities: BoxnowLocker[]
}) => {
  const stage = useAppSelector((state) => state.checkout.stageCompleted)

  const extraClass =
    stage === 3 && 'max-h-[calc(100vh-68px)] md:max-h-[calc(100vh-130px)] overflow-hidden'

  return (
    <div
      className={`w-full h-full flex flex-col lg:flex-row lg:justify-stretch lg:items-stretch ${extraClass}`}
    >
      <CheckoutAside />
      <CheckoutForms
        econtCities={econtCities}
        speedySites={speedySites}
        boxNowCities={boxNowCities}
      />
    </div>
  )
}

export default ContentHolder
