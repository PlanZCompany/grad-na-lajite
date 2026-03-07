'use client'

import React, { Suspense, useEffect, useState } from 'react'
import CheckoutAside from './CheckoutAside'
import CheckoutForms from './CheckoutForms'
import { SpeedySite } from '@/Speedy/types'
import { BoxnowLocker } from '@/BoxNow/types'
import { useAppDispatch, useAppSelector } from '@/hooks/redux-hooks'
import { useSearchParams } from 'next/navigation'
import { ExtendedProduct, setProducts } from '@/store/features/checkout'
import { GlobalLoader } from '../Loader'
import { COLORS } from '@/cssVariables'

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
  const dispatch = useAppDispatch()
  const stage = useAppSelector((state) => state.checkout.stageCompleted)
  const products = useAppSelector((state) => state.checkout.products)
  const mainProduct = useAppSelector((state) => state.root.mainProduct)

  const [isClient, setIsClient] = useState(false)

  const extraClass =
    stage === 3 && 'max-h-[calc(100vh-68px)] md:max-h-[calc(100vh-130px)] overflow-hidden'

  const params = useSearchParams()

  useEffect(() => {
    const haveLinkWithOrderCount = params.get('order-count')

    if (!!haveLinkWithOrderCount && !!mainProduct) {
      const didCurrentProductsAreMore = Number(haveLinkWithOrderCount) <= products.length

      if (didCurrentProductsAreMore) return

      const mainProductWithOrderCount: ExtendedProduct = {
        ...mainProduct,
        id: mainProduct.id as number,
        orderQuantity: Number(haveLinkWithOrderCount),
      }

      dispatch(setProducts([mainProductWithOrderCount]))
    }
  }, [params, mainProduct, dispatch, products.length])

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient)
    return (
      <div className="fixed z-50 bg-purpleLight inset-0">
        <GlobalLoader color={COLORS.primaryYellow} />
      </div>
    )

  return (
    <div
      className={`w-full h-full flex flex-col lg:flex-row lg:justify-stretch lg:items-stretch ${extraClass}`}
    >
      <Suspense fallback={<div>Loading...</div>}>
        <CheckoutAside />
      </Suspense>
      <CheckoutForms
        econtCities={econtCities}
        speedySites={speedySites}
        boxNowCities={boxNowCities}
      />
    </div>
  )
}

export default ContentHolder
