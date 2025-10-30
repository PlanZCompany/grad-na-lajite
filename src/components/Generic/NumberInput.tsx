import React from 'react'
import ErrorMessageBox from './ErrorMessage'

export type NumberInputProps<T> = {
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
  autoFocus?: boolean
}

const NumberInput = <T,>({
  name,
  label,
  formValues,
  setFormValues,
  placeholder,
  error,
  extraClass,
  required = false,
  autoFocus = false,
}: NumberInputProps<T>) => {
  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <div className="flex w-full flex-col gap-2">
      <label htmlFor={name} className="font-kolka font-[500] text-brown">
        {label}
        {required && <span className="text-brown"> *</span>}
      </label>

      <div className="relative flex w-full items-center justify-between">
        <input
          name={name}
          id={name}
          type={'number'}
          placeholder={placeholder}
          value={formValues[name as keyof object]}
          onChange={(e) => onChangeHandler(e)}
          autoFocus={autoFocus}
          className={` w-full rounded-lg border border-brown/20 bg-brown/20 p-3 font-sansation font-[400] text-brown outline-none ${extraClass}
          placeholder:text-brown/80`}
        />
      </div>

      {!!error && <ErrorMessageBox errors={error} />}
    </div>
  )
}

export default NumberInput
