import React from 'react'

export type DateInputProps<T> = {
  name: string
  label: string
  formValues: object
  setFormValues: React.Dispatch<React.SetStateAction<T>>
  placeholder: string
  error?: {
    [key: string]: string | null
  }
  extraClass?: string
  required?: boolean
  voice?: boolean
}

const DateInput = <T,>({
  name,
  label,
  formValues,
  setFormValues,
  extraClass,
  required = false,
}: DateInputProps<T>) => {
  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }
  return (
    <div className="flex w-full flex-col gap-2">
      <label htmlFor="date" className="font-georgia font-[400] text-white">
        {label}
        {required && <span className="text-primaryBlue"> *</span>}
      </label>
      <input
        type="date"
        name={name}
        id="date"
        value={formValues[name as keyof object]}
        onChange={(e) => onChangeHandler(e)}
        className={`w-full rounded-lg bg-[#200226]/50 focus:outline focus:outline-1 focus:outline-white p-[10px] font-clash-medium text-white outline-none ${extraClass}`}
      />
    </div>
  )
}

export default DateInput
