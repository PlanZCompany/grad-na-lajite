'use client'

import React from 'react'

export type SelectProps<T> = {
  options: { label: string; value: string }[]
  label: string
  formValues: object
  setFormValues: React.Dispatch<React.SetStateAction<T>>
  name: string
  required?: boolean
}

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

  const onSelectHandler = (value: string) => {
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  return (
    <div className="w-full flex flex-col gap-2">
      <label htmlFor={name} className="font-kolka font-[500] text-primaryYellow">
        {label}
        {required && <span className="text-primaryBlue"> *</span>}
      </label>

      <div className="w-full flex flex-col md:flex-row">
        <button
          className={`flex-1 border-[1px] border-primaryYellow/80 md:rounded-tl-[8px] md:rounded-bl-[8px] h-[50px] py-4 md:py-[unset]
          ${isFirstSelected ? 'bg-primaryYellow text-black' : 'text-primaryYellow'} 
          hover:opacity-80 hover:shadow-sm transition-color duration-300 ease-in-out
        `}
          type="button"
          onClick={() => onSelectHandler(options[0].value)}
        >
          {options[0].label}
        </button>
        <button
          className={`flex-1 border-[1px] border-primaryYellow/80 md:rounded-tr-[8px] md:rounded-br-[8px] h-[50px] py-4 md:py-[unset]
          ${isSecondSelected ? 'bg-primaryYellow text-black' : 'text-primaryYellow'} hover:opacity-80 hover:shadow-sm transition-color duration-300 ease-in-out
        `}
          type="button"
          onClick={() => onSelectHandler(options[1].value)}
        >
          {options[1].label}
        </button>
      </div>
    </div>
  )
}

export default RadioSelect
