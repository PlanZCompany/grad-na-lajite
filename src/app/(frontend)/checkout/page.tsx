import { getBoxnowCitiesAction } from '@/BoxNow/action'
import { CheckoutAside, CheckoutHeader } from '@/components/Checkout'
import CheckoutForms from '@/components/Checkout/CheckoutForms'
import type { Metadata } from 'next/types'

import econtCities from '../../../Econt/json/econt-cities.json'
import speedySites from '../../../Speedy/json/speedy-cities.json'

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

  //TODO econt for the towns that dont have offices in Bulgaria need to have extra property in the json to not be rendered in towns (maybe same for speedy)

  const [boxNowCities] = await Promise.all([getBoxnowCitiesAction()])

  return (
    <div className="fixed w-full inset-0 h-screen overflow-y-auto bg-purpleBackground z-[30]">
      <CheckoutHeader />

      <div className="w-full h-full flex flex-col lg:flex-row lg:justify-stretch lg:items-stretch">
        <CheckoutAside />
        <CheckoutForms
          econtCities={econtCities}
          speedySites={speedySites}
          boxNowCities={boxNowCities}
        />
      </div>
    </div>
  )
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Завършване на поръчката | Град на лъжите',
  }
}
