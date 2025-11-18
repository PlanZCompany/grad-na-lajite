'use client'

import React, { useEffect, useState } from 'react'
import { SpeedyOffice, SpeedySite } from '../types'
import { getSpeedySitesAction } from '../actions'
import SpeedyOfficeDropdown from './SpeedyOfficeDropdown'
import SpeedyAddressDropdown from './SpeedyAddressDropdown'
import { InnerShippingProps } from '@/components/Checkout/ShippingForm'

type SpeedyWrapperProps = {
  activeInnerShipping: InnerShippingProps
  currentShippingCity: SpeedySite | null
  address: string
  office: SpeedyOffice | null
  handleCityChange: (city: SpeedySite) => void
  handleOfficeChange: (office: SpeedyOffice) => void
  handleAddressChange: (address: string) => void
}

const SpeedyWrapper = ({
  activeInnerShipping,
  currentShippingCity,
  address,
  office,
  handleCityChange,
  handleOfficeChange,
  handleAddressChange,
}: SpeedyWrapperProps) => {
  const [cities, setCities] = useState<SpeedySite[]>([])

  const handleGetCities = async () => {
    const speedyCities = (await getSpeedySitesAction()) || []

    if (speedyCities.length > 0) setCities(speedyCities)
  }

  useEffect(() => {
    handleGetCities()
  }, [])

  console.log('cities', cities.slice(0, 5))

  return (
    <>
      {activeInnerShipping === 'speedy-office' ? (
        <SpeedyOfficeDropdown
          cities={cities}
          setter={handleCityChange}
          office={office}
          city={currentShippingCity as SpeedySite}
          setOffice={handleOfficeChange}
        />
      ) : (
        <SpeedyAddressDropdown
          cities={cities}
          setter={handleCityChange}
          city={currentShippingCity as SpeedySite}
          address={address}
          setAdrress={handleAddressChange}
        />
      )}
    </>
  )
}

export default SpeedyWrapper
