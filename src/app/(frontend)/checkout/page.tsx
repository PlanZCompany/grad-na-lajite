import { getBoxnowCitiesAction } from '@/BoxNow/action'
import { CheckoutHeader, ConfirmHolder } from '@/components/Checkout'
import type { Metadata } from 'next/types'

import econtCities from '../../../Econt/json/econt-cities.json'
import speedySites from '../../../Speedy/json/speedy-cities.json'

import React from 'react'
import ContentHolder from '@/components/Checkout/ContentHolder'
import { FooterCheckoutComponent } from '@/FooterCheckout/Component'
import SetCouriers from '@/components/Setters/SetCouriers'
import { CourierOption } from '@/store/features/checkout'
import { getCachedGlobal } from '@/utils/getGlobals'
import { Shipping } from '@/payload-types'

export default async function CheckoutPage() {
  //footer?

  const [boxNowCities] = await Promise.all([getBoxnowCitiesAction()])
  let couriers: CourierOption[] = []

  const couriersData = (await getCachedGlobal('shipping', 1)()) as Shipping

  if (couriersData.courierOptions) {
    couriers = couriersData.courierOptions as CourierOption[]
  }

  return (
    <div className="fixed w-full inset-0 h-screen overflow-y-auto bg-purpleBackground z-[30]">
      <SetCouriers couriers={couriers} />

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
    title: 'Град на лъжите | Завършване на поръчката',
  }
}
