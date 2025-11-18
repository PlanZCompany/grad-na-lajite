'use client'

import { useAppDispatch } from '@/hooks/redux-hooks'
import { setIsLoading } from '@/store/features/root'

import React, { useState, useTransition } from 'react'
import { GenericButton, GenericHeading, TextInput } from '../Generic'

//TODO if user populate the form

const ContactForm = () => {
  const dispatch = useAppDispatch()
  const [ok, setOk] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [pending, start] = useTransition()
  const [formValues, setFormValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
  })

  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
  })

  function onSubmit(e: React.FormEvent) {
    e.preventDefault()

    const firsNameError = !formValues.firstName
    const lastNameError = !formValues.lastName
    const phoneNumberError = !formValues.phoneNumber
    const emailError =
      !formValues.email || !/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(formValues.email)

    if (firsNameError || lastNameError || phoneNumberError || emailError) {
      setErrors({
        firstName: firsNameError ? 'Полето "Име" е задължително' : '',
        lastName: lastNameError ? 'Полето "Фамилия" е задължително' : '',
        phoneNumber: phoneNumberError ? 'Полето "Телефон" е задължително' : '',
        email: emailError ? 'Въведете валиден имейл' : '',
      })

      return
    }

    //go to next step

    setError(null)
  }

  return (
    <div className="p-3 md:p-6 rounded-[12px] border-[1px] border-white/20 flex flex-col gap-m justify-center items-center form_container bg-purpleDark/50">
      <GenericHeading
        align="text-center"
        headingType="h4"
        textColor="text-primaryYellow"
        extraClass="border-b-[1px] border-primaryYellow"
      >
        <h2>Данни за контакт</h2>
      </GenericHeading>
      <form className="flex w-full flex-col gap-4" onSubmit={onSubmit}>
        <div className="w-full flex flex-col md:flex-row gap-4">
          <TextInput
            name="firstName"
            label="Име"
            formValues={formValues}
            setFormValues={setFormValues}
            extraClass="w-full"
            placeholder="Иван"
            required={true}
            error={errors.firstName}
            autoFocus={false}
          />
          <TextInput
            name="lastName"
            label="Фамилия"
            formValues={formValues}
            setFormValues={setFormValues}
            extraClass="w-full"
            placeholder="Иванов"
            required={true}
            error={errors.lastName}
            autoFocus={false}
          />
        </div>

        <div className="w-full flex flex-col gap-4">
          <TextInput
            name="phoneNumber"
            label="Телефонен номер"
            formValues={formValues}
            setFormValues={setFormValues}
            extraClass="w-full"
            placeholder="+359888888888"
            required={true}
            error={errors.phoneNumber}
            autoFocus={false}
          />
        </div>
        <div className="mx-auto flex w-full min-w-[300px] flex-col gap-4">
          <TextInput
            name="email"
            label="Емейл"
            formValues={formValues}
            setFormValues={setFormValues}
            extraClass="w-full"
            placeholder="john_doe@gmail.com"
            required={true}
            error={errors.email}
            autoFocus={false}
          />
        </div>

        <div className="my-4 flex w-full">
          <GenericButton
            type={'submit'}
            // className="primary-button mx-auto w-full max-w-[300px] font-clash-semibold"
            styleClass="w-full md:!px-4 md:!py-[10px]"
            variant="primary"
            click={() => {
              dispatch(setIsLoading(true))
            }}
          >
            {pending ? <span className="animate-pulse">Зареждане</span> : 'Продължи'}
          </GenericButton>
        </div>

        {error && <p className="text-red-600">{error}</p>}
      </form>
    </div>
  )
}

export default ContactForm
