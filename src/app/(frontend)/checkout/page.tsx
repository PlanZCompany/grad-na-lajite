import { getBoxnowCitiesAction } from '@/BoxNow/action'
import { CheckoutHeader, ConfirmHolder } from '@/components/Checkout'
import type { Metadata } from 'next/types'

import econtCities from '../../../Econt/json/econt-cities.json'
import speedySites from '../../../Speedy/json/speedy-cities.json'

import React from 'react'
import ContentHolder from '@/components/Checkout/ContentHolder'
import { FooterCheckoutComponent } from '@/FooterCheckout/Component'

export default async function CheckoutPage() {
  //footer?

  const [boxNowCities] = await Promise.all([getBoxnowCitiesAction()])

  return (
    <div className="fixed w-full inset-0 h-screen overflow-y-auto bg-purpleBackground z-[30]">
      <CheckoutHeader />

      <ConfirmHolder />

      <ContentHolder
        boxNowCities={boxNowCities}
        econtCities={econtCities}
        speedySites={speedySites}
      />

      <FooterCheckoutComponent />
    </div>
  )
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Завършване на поръчката | Град на лъжите',
  }
}
