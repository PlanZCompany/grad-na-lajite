'use client'

import React from 'react'
import ContactForm from './ContactForm'
import ShippingForm from './ShippingForm'
import { EcontCity } from '@/Econt/types'
import { SpeedySite } from '@/Speedy/types'

const CheckoutForms = ({
  econtCities,
  speedySites,
}: {
  econtCities: EcontCity[]
  speedySites: SpeedySite[]
}) => {
  return (
    <div className="w-full lg:max-w-[50%] min-h-[100svh] flex flex-col gap-m p-6 md:p-10">
      <ContactForm />
      <ShippingForm econtCities={econtCities} speedySites={speedySites} />
    </div>
  )
}

export default CheckoutForms
