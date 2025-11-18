'use client'

import React, { useState } from 'react'
import { GenericParagraph } from '@/components/Generic'
import { ArrowIcon } from '@/assets/icons'
import { SpeedySite } from '../types'

const SpeedyAddressDropdown = ({
  cities,
  setter,
  city,
  address,
  setAdrress,
}: {
  cities: SpeedySite[]
  setter: (city: SpeedySite) => void
  city: SpeedySite
  address: string
  setAdrress: (adress: string) => void
}) => {
  const [activeDropdown, setActiveDropdown] = useState(false)

  const citiesContent = cities.map((city) => {
    return (
      <li key={city.id}>
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
            {city.name}
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
            <textarea
              name="Address"
              placeholder={'<Въведете адрес>'}
              value={address}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setAdrress(e.target.value)}
              className={`w-full rounded-[12px] 
                        focus:outline focus:outline-1 focus:outline-black p-3 font-georgia font-[400] !text-black outline-none 
                      placeholder:text-black/80
                      `}
              rows={6}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default SpeedyAddressDropdown
