'use client'

import React from 'react'
import { InnerShippingProps } from '@/components/Checkout/ShippingForm'
import { BoxnowLocker } from '../types'
import BoxNowOfficeDropdown from './BoxNowOffice'

type BoxNowWrapperProps = {
  activeInnerShipping: InnerShippingProps
  currentShippingCity: string | null
  office: BoxnowLocker | null
  handleCityChange: (city: string) => void
  handleOfficeChange: (office: BoxnowLocker) => void
  boxNowCities: string[]
}

const BoxNowWrapper = ({
  currentShippingCity,
  office,
  handleCityChange,
  handleOfficeChange,
  boxNowCities,
}: BoxNowWrapperProps) => {
  return (
    <BoxNowOfficeDropdown
      cities={boxNowCities}
      setter={handleCityChange}
      office={office}
      city={currentShippingCity as string}
      setOffice={handleOfficeChange}
    />
  )
}

export default BoxNowWrapper
