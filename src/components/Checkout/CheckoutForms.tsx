'use client'

import React, { useCallback, useState } from 'react'
import ContactForm from './ContactForm'
import ShippingForm from './ShippingForm'
import { EcontCity } from '@/Econt/types'
import { SpeedySite } from '@/Speedy/types'

const CheckoutForms = ({
  econtCities,
  speedySites,
  boxNowCities,
}: {
  econtCities: EcontCity[]
  speedySites: SpeedySite[]
  boxNowCities: string[]
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
