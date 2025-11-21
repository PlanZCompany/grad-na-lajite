'use client'

import React, { useCallback, useState } from 'react'
import ContactForm from './ContactForm'
import ShippingForm from './ShippingForm'
import { SpeedySite } from '@/Speedy/types'
import { BoxnowLocker } from '@/BoxNow/types'

const CheckoutForms = ({
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
  const [passedStep, setPassedStep] = useState(0)
  const handlePassedStep = useCallback((step: number) => setPassedStep(step), [])

  return (
    <div className="w-full lg:max-w-[50%] flex flex-col gap-m p-6 md:p-10">
      <ContactForm handlePassedStep={handlePassedStep} />
      <ShippingForm
        econtCities={econtCities}
        speedySites={speedySites}
        boxNowCities={boxNowCities}
        passedStep={passedStep}
        handlePassedStep={handlePassedStep}
      />
    </div>
  )
}

export default CheckoutForms
