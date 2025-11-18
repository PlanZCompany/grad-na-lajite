'use client'

import React from 'react'
import ContactForm from './ContactForm'
import ShippingForm from './ShippingForm'

const CheckoutForms = () => {
  return (
    <div className="w-full lg:max-w-[50%] min-h-[100svh] flex flex-col gap-m p-6 md:p-10">
      <ContactForm />
      <ShippingForm />
    </div>
  )
}

export default CheckoutForms
