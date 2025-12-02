'use client'

import React from 'react'
import ContactForm from './ContactForm'
import ShippingForm from './ShippingForm'
import { SpeedySite } from '@/Speedy/types'
import { BoxnowLocker } from '@/BoxNow/types'
import PaymentFormSection from './PaymentFormSection'
import CheckoutConfirm from './CheckoutConfirm'

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
  return (
    <div className="w-full lg:max-w-[50%] flex flex-col gap-m p-6 md:p-10">
      <ContactForm />
      <ShippingForm
        econtCities={econtCities}
        speedySites={speedySites}
        boxNowCities={boxNowCities}
      />
      <PaymentFormSection />
      <CheckoutConfirm />
    </div>
  )
}

export default CheckoutForms
