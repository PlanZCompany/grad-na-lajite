'use client'

import React from 'react'
import GenericImage from './GenericImage'

export type SelectProps<T> = {
  options: { label: string; value: string }[]
  label: string
  formValues: object
  setFormValues: React.Dispatch<React.SetStateAction<T>>
  name: string
  required?: boolean
}

const cardImagesArray = ['googlepay.png', 'applepay.png', 'mastercard.png', 'visa.png']

const RadioSelect = <T,>({
  options,
  label,
  formValues,
  setFormValues,
  name,
  required,
}: SelectProps<T>) => {
  const isFirstSelected = formValues[name as keyof object] === options[0].value
  const isSecondSelected = formValues[name as keyof object] === options[1].value

  const cardImagesContent = cardImagesArray.map((image) => {
    return (
      <li key={image}>
        <GenericImage
          src={`/static/${image}`}
          alt="CashDevileryIconBlack"
          wrapperClassName="w-[64px] h-[64px] relative"
          imageClassName="w-full h-full object-contain"
          fill={true}
        />
      </li>
    )
  })

  const onSelectHandler = (value: string) => {
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const cashImage = isFirstSelected
    ? '/static/CashDevileryIconBlack.png'
    : '/static/CashDeliveryIconYellow.png'

  return (
    <div className="w-full flex flex-col gap-2">
      <label htmlFor={name} className="font-kolka font-[500] text-primaryYellow">
        {label}
        {required && <span className="text-primaryBlue"> *</span>}
      </label>

      <div className="w-full flex flex-col md:flex-row gap-6 md:gap-8">
        <button
          className={`border-[1px] border-primaryYellow/80 py-4 font-[700] rounded-[24px] flex-1
          ${isFirstSelected ? 'bg-primaryYellow text-black' : 'text-primaryYellow'} 
          hover:opacity-80 hover:shadow-sm transition-color duration-300 ease-in-out flex flex-col justify-center items-center gap-2
        `}
          type="button"
          onClick={() => onSelectHandler(options[0].value)}
        >
          <p className="w-full max-w-[80%] mx-auto">{options[0].label}</p>
          <GenericImage
            src={cashImage}
            alt="CashDevileryIconBlack"
            wrapperClassName="w-[64px] h-[64px] relative"
            imageClassName="w-full h-full object-contain"
            fill={true}
          />
        </button>
        <button
          className={`border-[1px] border-primaryYellow/80 py-4 font-[700] rounded-[24px] flex-1
          ${isSecondSelected ? 'bg-primaryYellow text-black' : 'text-primaryYellow'} hover:opacity-80 hover:shadow-sm transition-color duration-300 ease-in-out
        `}
          type="button"
          onClick={() => onSelectHandler(options[1].value)}
        >
          <p className="w-full max-w-[80%] mx-auto">{options[1].label}</p>
          <ul className="flex flex-row justify-center items-center gap-2 flex-wrap">
            {cardImagesContent}
          </ul>
        </button>
      </div>
    </div>
  )
}

export default RadioSelect
