'use client'

import React, { useEffect, useState } from 'react'
import { GenericParagraph } from '@/components/Generic'
import { ArrowIcon } from '@/assets/icons'
import { BoxnowLocker } from '../types'
import { getBoxnowLockersByCityAction } from '../action'

const BoxNowOfficeDropdown = ({
  cities,
  setter,
  city,
  office,
  setOffice,
}: {
  cities: string[]
  setter: (city: string) => void
  city: string
  office: BoxnowLocker | null
  setOffice: (office: BoxnowLocker) => void
}) => {
  const [activeDropdown, setActiveDropdown] = useState(false)
  const [activeDropdownOffice, setActiveDropdownOffice] = useState(false)

  const [cityOffices, setCityOffices] = useState<BoxnowLocker[]>([])

  useEffect(() => {
    if (!city) return

    getBoxnowLockersByCityAction(city).then((offices) => {
      setCityOffices(offices)
    })
  }, [city])

  const citiesContent = cities.map((city) => {
    return (
      <li key={city}>
        <button
          className="w-full flex items-center"
          onClick={() => {
            setter(city)
            setActiveDropdown(false)
          }}
        >
          <GenericParagraph
            textColor="text-black"
            extraClass="w-full text-center border-b-[1px] border-black/50"
          >
            {city}
          </GenericParagraph>
        </button>
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
              {!!city ? city : '<Изберете град>'}
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

export default BoxNowOfficeDropdown
