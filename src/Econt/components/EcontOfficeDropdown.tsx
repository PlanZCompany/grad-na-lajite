'use client'

import React, { useEffect, useState } from 'react'
import { EcontCity, EcontOffice } from '../types'
import { GenericParagraph } from '@/components/Generic'
import { ArrowIcon } from '@/assets/icons'
import { getEcontOfficesAction } from '../action'

const EcontOfficeDropdown = ({
  cities,
  setter,
  city,
  office,
  setOffice,
}: {
  cities: {
    regionName: string
    cities: EcontCity[]
  }[]
  setter: (city: EcontCity) => void
  city: EcontCity
  office: EcontOffice | null
  setOffice: (office: EcontOffice) => void
}) => {
  const [activeDropdown, setActiveDropdown] = useState(false)
  const [activeDropdownOffice, setActiveDropdownOffice] = useState(false)
  const [activeRegionName, setActiveRegionName] = useState('')

  const [cityOffices, setCityOffices] = useState<EcontOffice[]>([])

  useEffect(() => {
    if (!city) return

    getEcontOfficesAction(city.id).then((offices) => {
      setCityOffices(offices)
    })
  }, [city])

  const findCurrentCityInners = cities.find((city) => city.regionName === activeRegionName)

  const innerDropDownContent = !!findCurrentCityInners
    ? findCurrentCityInners.cities.map((city) => {
        return (
          <li key={city.id}>
            <button
              className="w-full flex items-center py-2 border-b-[1px] border-black/50"
              onClick={() => {
                setter(city)
                setActiveDropdown(false)
              }}
            >
              <GenericParagraph textColor="text-black" extraClass="w-full text-center">
                {city.name}
              </GenericParagraph>
            </button>
          </li>
        )
      })
    : []

  const citiesContent = cities.map((city) => {
    return (
      <li key={city.regionName}>
        <div className="w-full flex items-center relative">
          <button
            className="w-full flex items-center bg-gray-200 border-b-[1px] border-black/50 py-2 px-2"
            onClick={() => {
              if (activeRegionName === city.regionName) {
                setActiveRegionName('')
                return
              }
              setActiveRegionName(city.regionName)
            }}
          >
            <div className="flex-1">
              <GenericParagraph textColor="text-black" extraClass="w-full text-center">
                {city.regionName}
              </GenericParagraph>
            </div>

            <div className="ml-auto flex justify-center items-center size-6">
              <ArrowIcon />
            </div>
          </button>
        </div>

        {activeRegionName === city.regionName && (
          <ul className="w-full flex flex-col">{innerDropDownContent}</ul>
        )}
      </li>
    )
  })

  const officesContent = cityOffices.map((currentOffice) => {
    return (
      <li key={currentOffice.id}>
        <button
          className="w-full flex items-center"
          onClick={() => {
            setOffice(currentOffice)
            setActiveDropdownOffice(false)
          }}
        >
          <GenericParagraph
            textColor="text-black"
            extraClass="w-full text-center border-b-[1px] border-black/50"
          >
            {currentOffice.name}
          </GenericParagraph>
        </button>
      </li>
    )
  })

  return (
    <div className="w-full flex flex-col gap-s">
      <div>
        <div className="w-full flex items-center bg-white/80 rounded-[8px] py-2 px-2 border-[1px] border-black/50">
          <button
            className="w-full flex items-center"
            onClick={() => {
              setActiveDropdown(!activeDropdown)
            }}
          >
            <GenericParagraph textColor="text-black">
              {!!city ? city.name : '<Изберете град>'}
            </GenericParagraph>

            <div
              className={`flex justify-center items-center size-6 ml-auto ${
                !!city ? 'rotate-[270deg]' : 'rotate-90'
              }`}
            >
              <ArrowIcon />
            </div>
          </button>
        </div>
        {activeDropdown && (
          <ul className="flex flex-col gap-3 border-[1px] border-black/50 max-h-[400px] overflow-y-auto">
            {citiesContent}
          </ul>
        )}
      </div>

      {city && (
        <div>
          <div className="w-full flex items-center bg-white/80 rounded-[8px] py-2 px-2 border-[1px] border-black/50">
            <button
              className="w-full flex items-center"
              onClick={() => {
                setActiveDropdownOffice(!activeDropdownOffice)
              }}
            >
              <GenericParagraph textColor="text-black">
                {!!office ? office.name : '<Изберете офис>'}
              </GenericParagraph>

              <div
                className={`flex justify-center items-center size-6 ml-auto ${
                  !!office ? 'rotate-[270deg]' : 'rotate-90'
                }`}
              >
                <ArrowIcon />
              </div>
            </button>
          </div>
          {activeDropdownOffice && (
            <ul className="flex flex-col gap-3 border-[1px] border-black/50 max-h-[400px] overflow-y-auto">
              {officesContent}
            </ul>
          )}
        </div>
      )}
    </div>
  )
}

export default EcontOfficeDropdown
