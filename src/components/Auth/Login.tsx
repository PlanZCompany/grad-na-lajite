'use client'

import { useAppDispatch } from '@/hooks/redux-hooks'
import { setIsLoading, setUser } from '@/store/features/root'

import Link from 'next/link'
import React, { useState, useTransition } from 'react'
import { GenericButton, TextInput } from '../Generic'
import { login } from '@/action/auth/login'
import { useRouter } from 'next/navigation'

const LoginComponent = () => {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
  })
  const [error, setError] = useState<string | null>(null)
  const [pending, start] = useTransition()

  function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    const { email, password } = formValues

    start(async () => {
      try {
        const res = await login({ email, password })
        if (res?.ok) {
          const updatedUser = {
            ...res.user,
            createdAt: '',
            updatedAt: '',
            sessions: [],
          }

          dispatch(setUser(updatedUser))
          dispatch(setIsLoading(false))
          router.push('/')
        }
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'Не валидна парола или потребителско име'
        setError(errorMessage)
      }
    })
  }

  return (
    <form className="flex w-full flex-col gap-4" onSubmit={onSubmit}>
      <div className="mx-auto flex w-full min-w-[300px] flex-col gap-6">
        <TextInput
          name="email"
          label="Емейл"
          formValues={formValues}
          setFormValues={setFormValues}
          extraClass="w-full"
          placeholder="john_doe@gmail.com"
          required={true}
          // error={errors.title}
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
            // error={errors.title}
          />

          <div className="mt-2 flex w-full items-center gap-1">
            <p className="font-kolka font-[400] text-[14px] text-brown/80">Забравена парола?</p>

            <Link href="/auth/forgot-password">
              <p className="font-kolka font-[500] text-[14px] text-brown">натиснете тук</p>
            </Link>
          </div>
        </div>
      </div>

      <div className="my-4 flex w-full">
        <GenericButton
          type={'submit'}
          // className="primary-button mx-auto w-full max-w-[300px] font-clash-semibold"
          styleClass="w-full"
          variant="primary"
          click={() => {
            dispatch(setIsLoading(true))
          }}
        >
          {pending ? 'Влизане...' : 'Вход'}
        </GenericButton>
      </div>

      {error && <p className="text-red-600">{error}</p>}

      <div className="flex w-full items-center justify-center gap-2">
        <p className="text-[14px] text-brown/80">{`Нямаш акаунт?`}</p>
        <Link href="/auth/register" className="font-kolka font-[500] text-brown">
          Регистрирай се
        </Link>
      </div>
    </form>
  )
}

export default LoginComponent
