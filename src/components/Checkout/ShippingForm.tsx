'use client'

import { useAppDispatch, useAppSelector } from '@/hooks/redux-hooks'
import { setIsLoading } from '@/store/features/root'
//gradnalajite1234
// /home/anilevis/media.gradnalajite.anilevisoulwalks.com/media
import React, { useCallback, useState, useTransition } from 'react'
import { GenericButton, GenericHeading, GenericImage, GenericParagraph } from '../Generic'
import { EcontCity, EcontOffice } from '@/Econt/types'
import EcontWrapper from '@/Econt/components/EcontWrapper'
import SpeedyWrapper from '@/Speedy/components/SpeedyWrapper'
import { SpeedyOffice, SpeedySite } from '@/Speedy/types'
import { BoxNowWrapper } from '@/BoxNow/components'
import { BoxnowLocker } from '@/BoxNow/types'
import { setCheckoutFormData, setCompletedStage } from '@/store/features/checkout'
import { useCheckout } from '@/hooks/useCheckout'

export type InnerShippingProps =
  | null
  | 'econt-office'
  | 'econt-address'
  | 'speedy-office'
  | 'speedy-address'
  | 'box-now'

const shippingVariants = [
  {
    name: 'box-now',
    text: 'До автомат BoxNow',
    image: '/static/box-now.png',
    parent: 'box-now',
  },
  {
    name: 'econt-office',
    text: 'До офис Econt',
    image: '/static/econt.png',
    parent: 'econt',
  },
  {
    name: 'econt-address',
    text: 'До адрес Econt',
    image: '/static/econt.png',
    parent: 'econt',
  },
  {
    name: 'speedy-office',
    text: 'До офис Speedy',
    image: '/static/speedy.png',
    parent: 'speedy',
  },
  {
    name: 'speedy-address',
    text: 'До адрес Speedy',
    image: '/static/speedy.png',
    parent: 'speedy',
  },
]

const ShippingForm = ({
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
  const passedStep = useAppSelector((state) => state.checkout.stageCompleted)
  const couriers = useAppSelector((state) => state.checkout.shippingOptions)
  const { calculateTotalPrice } = useCheckout()
  const [error, setError] = useState<string | null>(null)
  const [pending, start] = useTransition()
  const [activeShippingInner, setActiveShippingInner] = useState<InnerShippingProps>(null)
  const [currentShippingCity, setCurrentShippingCity] = useState<
    EcontCity | SpeedySite | BoxnowLocker | null
  >(null)
  const handleCityChange = useCallback(
    (city: EcontCity | SpeedySite | BoxnowLocker) => setCurrentShippingCity(city),
    [],
  )
  const [chosenOffice, setChosenOffice] = useState<
    EcontOffice | SpeedyOffice | BoxnowLocker | null
  >(null)
  const handleOfficeChange = useCallback(
    (office: EcontOffice | SpeedyOffice | BoxnowLocker) =>
      setChosenOffice(office as EcontOffice | SpeedyOffice | BoxnowLocker),
    [],
  )
  const [address, setAddress] = useState('')
  const handleAddressChange = useCallback((address: string) => setAddress(address), [])

  const restoreStateAfterChangeActiveShipping = () => {
    setCurrentShippingCity(null)
    setChosenOffice(null)
    setAddress('')
  }

  const calculateShippingPrice = (shippingName: 'econt' | 'speedy' | 'boxnow') => {
    const match = couriers.find((item) => {
      return item.courier_code === shippingName
    })
    let shippingPrice = match?.base_fee || 0

    if (match?.free_shipping) {
      return (shippingPrice = 0)
    }
    const isEnoughForFreeShipping =
      !!match?.free_over_amount && calculateTotalPrice() >= match?.free_over_amount
    if (isEnoughForFreeShipping) {
      return (shippingPrice = 0)
    }
    return shippingPrice
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault()

    start(async () => {
      try {
        dispatch(setCompletedStage(2))
        let activeShipping: 'speedy' | 'econt' | 'boxnow' = 'boxnow'
        if (activeShippingInner === 'econt-address' || activeShippingInner === 'econt-office')
          activeShipping = 'econt'
        if (activeShippingInner === 'speedy-address' || activeShippingInner === 'speedy-office')
          activeShipping = 'speedy'
        dispatch(
          setCheckoutFormData({
            shipping: activeShipping,
            city: currentShippingCity?.name,
            office: chosenOffice?.name,
            address: address,
          }),
        )

        const nextTarget = document.querySelector('.REF_CHECKOUT_PAYMENT') as HTMLElement

        if (nextTarget) {
          nextTarget.scrollIntoView({ behavior: 'smooth' })
        }
      } catch (err) {
        console.log(err)
      }
    })

    setError(null)
  }

  const currentComponent = () => {
    const isEcont = activeShippingInner?.includes('econt')
    const isSpeedy = activeShippingInner?.includes('speedy')
    const isBoxNow = activeShippingInner?.includes('box-now')

    let component = null
    if (isEcont)
      component = (
        <EcontWrapper
          econtCities={econtCities}
          activeInnerShipping={activeShippingInner as InnerShippingProps}
          address={address}
          currentShippingCity={currentShippingCity as EcontCity}
          handleAddressChange={handleAddressChange}
          handleCityChange={handleCityChange}
          handleOfficeChange={handleOfficeChange}
          office={chosenOffice as EcontOffice}
        />
      )
    if (isSpeedy)
      component = (
        <SpeedyWrapper
          activeInnerShipping={activeShippingInner as InnerShippingProps}
          address={address}
          currentShippingCity={currentShippingCity as SpeedySite}
          handleAddressChange={handleAddressChange}
          handleCityChange={handleCityChange}
          handleOfficeChange={handleOfficeChange}
          office={chosenOffice as SpeedyOffice}
          speedySites={speedySites}
        />
      )
    if (isBoxNow)
      component = (
        <BoxNowWrapper
          activeInnerShipping={activeShippingInner as InnerShippingProps}
          currentShippingCity={currentShippingCity as BoxnowLocker}
          handleCityChange={handleCityChange}
          handleOfficeChange={handleOfficeChange}
          office={chosenOffice as null}
          boxNowCities={boxNowCities as BoxnowLocker[]}
        />
      )

    return component
  }

  //return boolean
  const disableButtonConditions = () => {
    const isEcont = activeShippingInner?.includes('econt')
    const isSpeedy = activeShippingInner?.includes('speedy')
    const isBoxNow = activeShippingInner?.includes('box-now')

    if (!isEcont && !isSpeedy && !isBoxNow) return true

    if (isBoxNow && !currentShippingCity) return true

    if (isEcont && activeShippingInner === 'econt-office' && !currentShippingCity) return true

    if (isEcont && activeShippingInner === 'econt-address' && !address) return true

    if (isSpeedy && activeShippingInner === 'speedy-office' && !currentShippingCity) return true

    if (isSpeedy && activeShippingInner === 'speedy-address' && !address) return true

    return false
  }

  const shippingContent = shippingVariants.map((variant) => {
    const isActive = activeShippingInner === variant.name

    const match = couriers.find((item) => item.courier_code === variant.parent.replace('-', ''))
    if (!match?.is_active) return null

    const shippingText =
      calculateShippingPrice(variant.parent.replace('-', '') as 'econt' | 'speedy' | 'boxnow') === 0
        ? 'безплатна доставка'
        : `+ ${calculateShippingPrice(variant.parent.replace('-', '') as 'econt' | 'speedy' | 'boxnow')}€`

    return (
      <li
        key={variant.name}
        className="w-full p-2 md:p-1 rounded-[8px] border-[1px] border-primaryYellow bg-white"
      >
        <button
          className="w-full flex items-center"
          type="button"
          onClick={() => {
            if (activeShippingInner === variant.name) {
              setActiveShippingInner(null)
            } else {
              setActiveShippingInner(variant.name as InnerShippingProps)
            }
            restoreStateAfterChangeActiveShipping()
          }}
        >
          <div className="flex items-center gap-2">
            <div className="w-[20px] h-[20px] md:w-[24px] md:h-[24px] flex items-center justify-center border-[1px] border-purpleLight rounded-full bg-transparent relative">
              {isActive && (
                <div className="w-[16px] h-[16px] rounded-full bg-purpleBackground"></div>
              )}
            </div>
            <GenericParagraph textColor="text-black" pType="small">
              {variant.text} -{' '}
            </GenericParagraph>

            <div className="px-[4px] py-[2px] bg-purpleBackground/80 rounded-[4px]">
              <GenericParagraph textColor="text-white" pType="small">
                {shippingText}
              </GenericParagraph>
            </div>
          </div>

          <div className="ml-auto">
            <GenericImage
              src={variant.image}
              alt={variant.text}
              wrapperClassName="w-[100px] h-[30px] flex items-center justify-center relative"
              imageClassName="w-full h-full object-contain"
            />
          </div>
        </button>

        {activeShippingInner === variant.name && (
          <div className="w-full py-3 md:px-4 md:py-3 bg-white">{currentComponent()}</div>
        )}
      </li>
    )
  })

  const isPassed = passedStep > 0

  return (
    <div
      className={`REF_CHECKOUT_SHIPPING scroll-mt-20 md:scroll-mt-[150px] p-3 md:p-6 rounded-[12px] border-[1px] 
        border-white/20 flex flex-col gap-m justify-center items-center form_container bg-purpleDark/50 relative`}
    >
      {!isPassed && <div className={`absolute inset-0 z-[5] backdrop-blur-sm`}></div>}
      <GenericHeading
        align="text-center"
        headingType="h4"
        textColor="text-primaryYellow"
        extraClass="border-b-[1px] border-primaryYellow"
      >
        <h2>Данни за доставка</h2>
      </GenericHeading>
      <form className="flex w-full flex-col gap-4" onSubmit={onSubmit}>
        <ul className="w-full flex flex-col gap-s">{shippingContent}</ul>

        <div className="my-4 flex w-full">
          <GenericButton
            type={'submit'}
            // className="primary-button mx-auto w-full max-w-[300px] font-clash-semibold"
            styleClass="w-full md:!px-4 md:!py-[10px]"
            variant="primary"
            click={() => {
              dispatch(setIsLoading(true))
            }}
            disabled={disableButtonConditions()}
          >
            {pending ? <span className="animate-pulse">Зареждане</span> : 'Продължи'}
          </GenericButton>
        </div>

        {error && <p className="text-red-600">{error}</p>}
      </form>
    </div>
  )
}

export default ShippingForm
