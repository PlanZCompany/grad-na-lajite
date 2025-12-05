'use client'

import { useAppDispatch, useAppSelector } from '@/hooks/redux-hooks'
import { setIsLoading } from '@/store/features/root'

import React, { useState, useTransition } from 'react'
import { GenericButton, GenericHeading, GenericParagraph, TextInput } from '../Generic'
import {
  setCheckoutFormData,
  setCompletedStage,
  setUserWantSubscription,
} from '@/store/features/checkout'
import { CheckIcon } from '@/assets/icons'
import Link from 'next/link'

const ContactForm = () => {
  const dispatch = useAppDispatch()

  const user = useAppSelector((state) => state.root.user)
  const userWantSubscription = useAppSelector((state) => state.checkout.userWantSubscription)
  const [error, setError] = useState<string | null>(null)
  const [pending, start] = useTransition()
  const [acceptTerms, setAcceptTerms] = useState(false)
  const [formValues, setFormValues] = useState({
    firstName: user?.firstName ?? '',
    lastName: user?.lastName ?? '',
    email: user?.email ?? '',
    phoneNumber: user?.phoneNumber ?? '',
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
    const termsError = !acceptTerms

    if (termsError) {
      setError('Моля прочетете и съгласете с условията на политиката за обработка на данните.')

      return
    }

    if (firsNameError || lastNameError || phoneNumberError || emailError) {
      setErrors({
        firstName: firsNameError ? 'Полето "Име" е задължително' : '',
        lastName: lastNameError ? 'Полето "Фамилия" е задължително' : '',
        phoneNumber: phoneNumberError ? 'Полето "Телефон" е задължително' : '',
        email: emailError ? 'Въведете валиден имейл' : '',
      })

      return
    }

    start(async () => {
      try {
        setErrors({ firstName: '', lastName: '', phoneNumber: '', email: '' })
        dispatch(setCompletedStage(1))
        dispatch(setCheckoutFormData(formValues))

        const nextTarget = document.querySelector('.REF_CHECKOUT_SHIPPING') as HTMLElement

        if (nextTarget) {
          nextTarget.scrollIntoView({ behavior: 'smooth' })
        }
      } catch (err) {
        console.log(err)
      }
    })

    setError(null)
  }

  return (
    <div className="REF_CHECKOUT_CONTACT scroll-mt-20 md:scroll-mt-[150px] p-3 md:p-6 rounded-[12px] border-[1px] border-white/20 flex flex-col gap-m justify-center items-center form_container bg-purpleDark/50">
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

        <div className="w-full flex items-start gap-2">
          <button
            className={`size-5 md:size-6 min-w-[20px] md:min-w-[24px] border-[1px] border-primaryYellow flex justify-center items-center
          ${acceptTerms && 'bg-primaryYellow'}
          `}
            onClick={() => {
              setAcceptTerms(!acceptTerms)
            }}
            type="button"
          >
            {acceptTerms && <CheckIcon />}
          </button>

          <GenericParagraph pType="custom" extraClass="text-[12px] md:text-[14px] text-white/80">
            Да, съгласен/на съм с{' '}
            <Link className="underline" href="/terms-and-conditions">
              Общите условия
            </Link>
            . Да, съгласен/на съм с{' '}
            <Link className="underline" href="/privacy-policy">
              {' '}
              Политиката за поверителност
            </Link>
            . (Градът има свои закони… и този чекбокс е един от тях.)
          </GenericParagraph>
        </div>

        <div className="w-full flex items-start gap-2">
          <button
            className={`size-5 md:size-6 min-w-[20px] md:min-w-[24px] border-[1px] border-primaryYellow flex justify-center items-center
          ${userWantSubscription && 'bg-primaryYellow'}
          `}
            onClick={() => {
              dispatch(setUserWantSubscription(!userWantSubscription))
            }}
            type="button"
          >
            {userWantSubscription && <CheckIcon />}
          </button>

          <GenericParagraph pType="custom" extraClass="text-[12px] md:text-[14px] text-white/80">
            <span>{`Искам да получавам имейли с новини и оферти от 'Град на Лъжите'`}</span>
          </GenericParagraph>
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
