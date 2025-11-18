'use client'

import React from 'react'
import { EcontCity, EcontOffice } from '../types'
import { EcontOfficeDropdown } from '.'
import EcontAddressDropdown from './EcontAddressDropdown'
import { InnerShippingProps } from '@/components/Checkout/ShippingForm'

type EcontWrapperProps = {
  activeInnerShipping: InnerShippingProps
  currentShippingCity: EcontCity | null
  address: string
  office: EcontOffice | null
  handleCityChange: (city: EcontCity) => void
  handleOfficeChange: (office: EcontOffice) => void
  handleAddressChange: (address: string) => void
  econtCities: EcontCity[]
}

const EcontWrapper = ({
  activeInnerShipping,
  currentShippingCity,
  address,
  office,
  handleCityChange,
  handleOfficeChange,
  handleAddressChange,
  econtCities,
}: EcontWrapperProps) => {
  return (
    <>
      {activeInnerShipping === 'econt-office' ? (
        <EcontOfficeDropdown
          cities={econtCities}
          setter={handleCityChange}
          office={office}
          city={currentShippingCity as EcontCity}
          setOffice={handleOfficeChange}
        />
      ) : (
        <EcontAddressDropdown
          cities={econtCities}
          setter={handleCityChange}
          city={currentShippingCity as EcontCity}
          address={address}
          setAdrress={handleAddressChange}
        />
      )}
    </>
  )
}

export default EcontWrapper
