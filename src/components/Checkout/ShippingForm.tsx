'use client'

import { useAppDispatch } from '@/hooks/redux-hooks'
import { setIsLoading } from '@/store/features/root'

import React, { useCallback, useState, useTransition } from 'react'
import { GenericButton, GenericHeading, GenericImage, GenericParagraph } from '../Generic'
import { EcontCity, EcontOffice } from '@/Econt/types'
import EcontWrapper from '@/Econt/components/EcontWrapper'
import SpeedyWrapper from '@/Speedy/components/SpeedyWrapper'
import { SpeedyOffice, SpeedySite } from '@/Speedy/types'

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

const shippingSelectArray = ['econt', 'speedy', 'box-now']

const ShippingForm = () => {
  const dispatch = useAppDispatch()
  const [ok, setOk] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [pending, start] = useTransition()
  const [activeShipping, setActiveShipping] = useState<null | 'econt' | 'speedy' | 'box-now'>(null)
  const [activeShippingInner, setActiveShippingInner] = useState<InnerShippingProps>(null)
  const [currentShippingCity, setCurrentShippingCity] = useState<EcontCity | SpeedySite | null>(
    null,
  )
  const handleCityChange = useCallback(
    (city: EcontCity | SpeedySite) => setCurrentShippingCity(city),
    [],
  )
  const [chosenOffice, setChosenOffice] = useState<EcontOffice | SpeedyOffice | null>(null)
  const handleOfficeChange = useCallback(
    (office: EcontOffice | SpeedyOffice) => setChosenOffice(office),
    [],
  )
  const [address, setAddress] = useState('')
  const handleAddressChange = useCallback((address: string) => setAddress(address), [])

  const restoreStateAfterChangeActiveShipping = () => {
    setCurrentShippingCity(null)
    setChosenOffice(null)
    setAddress('')
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault()

    //go to next step

    setError(null)
  }

  const shippingSelect = shippingSelectArray.map((variant) => {
    const isActive = activeShipping === variant

    return (
      <li
        key={variant}
        className={`w-full aspect-square ${isActive ? 'bg-purpleBackground/50' : 'bg-white'} border-[2px] border-gray-700 rounded-[12px] flex max-h-[48px] md:max-h-[100px] md:p-4`}
      >
        <button
          className="w-full flex items-center justify-center"
          onClick={() => {
            setActiveShipping(variant as 'speedy' | 'econt' | 'box-now')
            restoreStateAfterChangeActiveShipping()
          }}
        >
          <GenericImage
            src={`/static/${variant}.png`}
            alt={variant}
            wrapperClassName="w-full h-full object-contain relative"
            imageClassName="w-full h-full object-contain"
            fill={true}
          />
        </button>
      </li>
    )
  })

  const currentComponent = () => {
    switch (activeShipping) {
      case 'box-now':
        return <></>
      case 'econt':
        return (
          <EcontWrapper
            activeInnerShipping={activeShippingInner as InnerShippingProps}
            address={address}
            currentShippingCity={currentShippingCity as EcontCity}
            handleAddressChange={handleAddressChange}
            handleCityChange={handleCityChange}
            handleOfficeChange={handleOfficeChange}
            office={chosenOffice as EcontOffice}
          />
        )
      case 'speedy':
        return (
          <SpeedyWrapper
            activeInnerShipping={activeShippingInner as InnerShippingProps}
            address={address}
            currentShippingCity={currentShippingCity as SpeedySite}
            handleAddressChange={handleAddressChange}
            handleCityChange={handleCityChange}
            handleOfficeChange={handleOfficeChange}
            office={chosenOffice as SpeedyOffice}
          />
        )
      default:
        return <></>
    }
  }

  const shippingContent = shippingVariants.map((variant) => {
    const isActive = activeShippingInner === variant.name
    const needToBeRendered = activeShipping === variant.parent

    return needToBeRendered ? (
      <li
        key={variant.name}
        className="w-full p-2 rounded-[8px] border-[1px] border-primaryYellow bg-white"
      >
        <button
          className="w-full flex items-center"
          onClick={() => {
            setActiveShippingInner(variant.name as InnerShippingProps)
            restoreStateAfterChangeActiveShipping()
          }}
        >
          <div className="flex items-center gap-2">
            <div className="w-[24px] h-[24px] flex items-center justify-center border-[1px] border-purpleLight rounded-full bg-transparent relative">
              {isActive && (
                <div className="w-[16px] h-[16px] rounded-full bg-purpleBackground"></div>
              )}
            </div>
            <GenericParagraph textColor="text-black" pType="small">
              {variant.text}
            </GenericParagraph>
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

        {!!activeShipping && activeShipping === variant.parent && (
          <div className="w-full px-4 py-3 bg-white">{currentComponent()}</div>
        )}
      </li>
    ) : null
  })

  return (
    <div className="p-3 md:p-6 rounded-[12px] border-[1px] border-white/20 flex flex-col gap-m justify-center items-center form_container bg-purpleDark/50">
      <GenericHeading
        align="text-center"
        headingType="h4"
        textColor="text-primaryYellow"
        extraClass="border-b-[1px] border-primaryYellow"
      >
        <h2>Данни за доставка</h2>
      </GenericHeading>
      <form className="flex w-full flex-col gap-4" onSubmit={onSubmit}>
        <ul className="w-full grid grid-cols-3 gap-1">{shippingSelect}</ul>
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
