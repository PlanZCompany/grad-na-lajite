// app/reset-password/page.tsx
'use client'

import { resetPassword } from '@/action/auth/resetPassowrd'
import { GenericButton, TextInput } from '@/components/Generic'
import { AuthWrapper } from '@/components/Wrappers'
import { useSearchParams, useRouter } from 'next/navigation'
import { useState, useTransition } from 'react'

export default function ResetPasswordPage() {
  const params = useSearchParams()
  const router = useRouter()
  const token = params.get('token') ?? ''
  const [formValues, setFormValues] = useState({ password: '', passwordConfirm: '' })
  const [error, setError] = useState<string | null>(null)
  const [ok, setOk] = useState(false)
  const [pending, start] = useTransition()

  if (!token) {
    return <main className="p-6">Линкът за нулиране липсва или е невалиден.</main>
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    if (formValues.password.length < 6) {
      setError('Паролата трябва да е минимум 6 символа')
      return
    }
    if (formValues.password !== formValues.passwordConfirm) {
      setError('Паролите не съвпадат')
      return
    }
    start(async () => {
      try {
        const pass = formValues.password
        const res = await resetPassword({ token, password: pass })
        if (res?.ok) {
          setOk(true)
          // if your action auto-logs in, go to dashboard; else go to login
          router.replace('/')
        }
      } catch (err: unknown) {
        const errorMessage =
          err instanceof Error
            ? err.message
            : 'Неуспешно обновяване, линкът може да е навалиден или изтекъл'
        setError(errorMessage)
      }
    })
  }

  return (
    <AuthWrapper>
      <div className="py-6 px-6 md:px-20 flex justify-center items-center">
        <form onSubmit={onSubmit} className="mt-4 space-y-3">
          <TextInput
            type="password"
            placeholder="******"
            label="Нова Парола"
            formValues={formValues}
            setFormValues={setFormValues}
            name="password"
            required={true}
            extraClass="min-w-[300px]"
          />
          <TextInput
            type="password"
            placeholder="******"
            label="Потвърди Паролата"
            formValues={formValues}
            setFormValues={setFormValues}
            name="passwordConfirm"
            required={true}
            extraClass="min-w-[300px]"
          />
          <GenericButton type={'submit'} styleClass="w-full" variant="primary" disabled={pending}>
            {pending ? 'Зареждане...' : 'Изпращане'}
          </GenericButton>
          {error && <p className="text-red-600">{error}</p>}
          {ok && <p className="text-green-700">Паролата е обновена</p>}
        </form>
      </div>
    </AuthWrapper>
  )
}
