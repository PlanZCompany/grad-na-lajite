'use client'

import { useAppDispatch } from '@/hooks/redux-hooks'
import { setIsLoading, setUser } from '@/store/features/root'

import Link from 'next/link'
import React, { useState, useTransition } from 'react'
import { DateInput, GenericButton, TextInput } from '../Generic'
import { registerUser } from '@/action/auth/register'

const RegisterComponent = () => {
  const dispatch = useAppDispatch()
  const [ok, setOk] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [pending, start] = useTransition()
  const [formValues, setFormValues] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    dateOfBirth: '',
    email: '',
    password: '',
  })

  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    dateOfBirth: '',
    email: '',
    password: '',
  })

  function onSubmit(e: React.FormEvent) {
    e.preventDefault()

    const firsNameError = !formValues.firstName
    const lastNameError = !formValues.lastName
    const phoneNumberError = !formValues.phoneNumber
    const dateOfBirthError = !formValues.dateOfBirth
    const emailError =
      !formValues.email || !/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(formValues.email)
    const passwordError = formValues.password.length < 6

    if (
      firsNameError ||
      lastNameError ||
      phoneNumberError ||
      dateOfBirthError ||
      emailError ||
      passwordError
    ) {
      setErrors({
        firstName: firsNameError ? 'Полето "Име" е задължително' : '',
        lastName: lastNameError ? 'Полето "Фамилия" е задължително' : '',
        phoneNumber: phoneNumberError ? 'Полето "Телефон" е задължително' : '',
        dateOfBirth: dateOfBirthError ? 'Полето "Дата на раждане" е задължително' : '',
        email: emailError ? 'Въведете валиден имейл' : '',
        password: passwordError ? 'Полето "Парола" трябва да е поне 6 символа' : '',
      })

      return
    }

    setError(null)
    start(async () => {
      try {
        const res = await registerUser(formValues)
        if (!res?.ok) {
          setError(res?.message ?? 'Неуспешна регистрация, моля опитайте по-късно')
          return
        }

        setOk(true)
        const updatedUser = {
          ...res.user,
          createdAt: '',
          updatedAt: '',
          sessions: [],
        }
        dispatch(setUser(updatedUser))
      } catch (err) {
        if ((err as Error)?.message.includes('email')) {
          setError('Този email вече е регистриран')
          return
        }
        setError((err as Error)?.message ?? 'Неуспешна регистрация, моля опитайте по-късно')
      }
    })
  }

  return (
    <>
      {ok ? (
        <p className="mt-3 text-[20px] font-georgia text-center">
          Успешна регистрация! <br />
          Проверете своя email, за потвърждение на профила
        </p>
      ) : (
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
            <DateInput
              name="dateOfBirth"
              label="Дата на раждане"
              formValues={formValues}
              setFormValues={setFormValues}
              extraClass="w-full"
              placeholder="DD-MM-YYYY"
              required={true}
              error={errors.dateOfBirth}
            />
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
            <div>
              <TextInput
                name="password"
                label="Парола"
                formValues={formValues}
                setFormValues={setFormValues}
                extraClass="w-full"
                placeholder="******"
                required={true}
                type="password"
                error={errors.password}
              />
            </div>
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
              {pending ? <span className="animate-pulse">Зареждане</span> : 'Регистрация'}
            </GenericButton>
          </div>

          {error && <p className="text-red-600">{error}</p>}

          <div className="flex w-full items-center justify-center gap-2">
            <p className="text-[14px] text-white/80">{`Имаш акаунт?`}</p>
            <Link href="/auth/login" className="font-georgia font-[400] text-white">
              Вход
            </Link>
          </div>
        </form>
      )}
    </>
  )
}

export default RegisterComponent
