'use client'

import React, { useEffect, useState } from 'react'
import { EcontCity, EcontOffice } from '../types'
import { EcontOfficeDropdown } from '.'
import EcontAddressDropdown from './EcontAddressDropdown'
import { getEcontCitiesAction } from '../action'
import { InnerShippingProps } from '@/components/Checkout/ShippingForm'

type EcontWrapperProps = {
  activeInnerShipping: InnerShippingProps
  currentShippingCity: EcontCity | null
  address: string
  office: EcontOffice | null
  handleCityChange: (city: EcontCity) => void
  handleOfficeChange: (office: EcontOffice) => void
  handleAddressChange: (address: string) => void
}

const EcontWrapper = ({
  activeInnerShipping,
  currentShippingCity,
  address,
  office,
  handleCityChange,
  handleOfficeChange,
  handleAddressChange,
}: EcontWrapperProps) => {
  const [cities, setCities] = useState<EcontCity[]>([])

  const handleGetCities = async () => {
    const econtCities = (await getEcontCitiesAction()) || []

    if (econtCities.length > 0) setCities(econtCities)
  }

  useEffect(() => {
    handleGetCities()
  }, [])

  return (
    <>
      {activeInnerShipping === 'econt-office' ? (
        <EcontOfficeDropdown
          cities={cities}
          setter={handleCityChange}
          office={office}
          city={currentShippingCity as EcontCity}
          setOffice={handleOfficeChange}
        />
      ) : (
        <EcontAddressDropdown
          cities={cities}
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
