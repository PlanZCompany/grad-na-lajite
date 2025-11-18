import { CheckoutAside, CheckoutHeader } from '@/components/Checkout'
import CheckoutForms from '@/components/Checkout/CheckoutForms'
import { getEcontCitiesAction } from '@/Econt/action'
import type { Metadata } from 'next/types'

import React from 'react'

export default async function CheckoutPage() {
  //inner header (logo and steps)
  //steps forms
  //**contact
  //**shipping
  //**payment
  //**confirm
  //product and info section
  //**product
  //**info
  //footer?

  return (
    <div className="fixed w-full inset-0 h-screen overflow-y-auto bg-purpleBackground z-[30]">
      <CheckoutHeader />

      <div className="w-full h-full flex justify-stretch items-stretch">
        <CheckoutForms />
        <CheckoutAside />
      </div>
    </div>
  )
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Завършване на поръчката | Град на лъжите',
  }
}
