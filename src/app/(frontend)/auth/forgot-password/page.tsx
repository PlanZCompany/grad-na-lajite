// app/forgot-password/page.tsx
'use client'

import { requestPasswordReset } from '@/action/auth/requestPassword'
import { GenericButton, TextInput } from '@/components/Generic'
import { AuthWrapper } from '@/components/Wrappers'
import { useState, useTransition } from 'react'

export default function ForgotPasswordPage() {
  const [formValues, setFormValues] = useState({
    email: '',
  })
  const [ok, setOk] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [pending, start] = useTransition()

  function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    start(async () => {
      try {
        const res = await requestPasswordReset(formValues.email)
        if (res?.ok) setOk(true)
      } catch (err) {
        console.log(err)
        setOk(true)
      }
    })
  }

  return (
    <AuthWrapper>
      <div className="m-auto w-fit md:py-10 relative z-[1] rounded-[24px] flex flex-col-reverse md:flex-row">
        <div className="py-6 px-6 md:px-20  flex flex-col justify-center items-center">
          <p className="mt-2 text-sm text-white/80">Въведете имейл адрес</p>
          <form onSubmit={onSubmit} className="mt-4 space-y-3">
            <TextInput
              name="email"
              type="text"
              formValues={formValues}
              label="Имeйл"
              placeholder="ivan-georgiev@gmail.com"
              setFormValues={setFormValues}
              required={true}
              extraClass="min-w-[300px]"
            />
            <div className="my-4 flex w-full">
              <GenericButton
                type={'submit'}
                // className="primary-button mx-auto w-full max-w-[300px] font-clash-semibold"
                styleClass="w-full"
                variant="primary"
                disabled={pending || !formValues.email || !!ok}
              >
                {pending ? (ok ? 'Изпратено' : 'Изпращане...') : 'Изпращане'}
              </GenericButton>
            </div>
          </form>
          {ok && (
            <p className="mt-3 text-white">
              Ако Акаунт съществува, ще получите имейл с инструкции за възстановяване на паролата.
            </p>
          )}
          {error && <p className="mt-3 text-red-600">{error}</p>}
        </div>
      </div>
    </AuthWrapper>
  )
}
