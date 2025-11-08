// app/reset-password/page.tsx
'use client'

import { resetPassword } from '@/action/auth/resetPassowrd'
import { GenericButton, TextInput } from '@/components/Generic'
import { AuthWrapper } from '@/components/Wrappers'
import { checkPassword } from '@/utils/passwordValidatior'
import { useSearchParams, useRouter } from 'next/navigation'
import { useEffect, useState, useTransition } from 'react'

export default function ResetPasswordPage() {
  const params = useSearchParams()
  const router = useRouter()
  const token = params.get('token') ?? ''
  const [formValues, setFormValues] = useState({ password: '', passwordConfirm: '' })
  const [error, setError] = useState<string | null>(null)
  const [ok, setOk] = useState(false)
  const [pending, start] = useTransition()

  const [validPasswordFields, setValidPasswordFields] = useState({
    hasUppercase: false,
    has8Chars: false,
    hasNumber: false,
    hasLowercase: false,
  })

  useEffect(() => {
    if (!formValues.password) return

    const validateFields = checkPassword(formValues.password)

    setValidPasswordFields((prev) => {
      return {
        ...prev,
        hasUppercase: validateFields !== 'Password is valid!' && validateFields.hasUppercase,
        has8Chars: validateFields !== 'Password is valid!' && validateFields.has8Chars,
        hasNumber: validateFields !== 'Password is valid!' && validateFields.hasNumber,
        hasLowercase: validateFields !== 'Password is valid!' && validateFields.hasLowercase,
      }
    })
  }, [formValues.password])

  if (!token) {
    return <main className="p-6">Линкът за нулиране липсва или е невалиден.</main>
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)

    const passwordError = Object.values(validPasswordFields).some((field) => field === false)

    if (passwordError) {
      setError('Полето "Парола" трябва да отговавя на критериите')
      return
    }
    start(async () => {
      try {
        const pass = formValues.password
        const res = await resetPassword({ token, password: pass })
        if (res?.ok) {
          setOk(true)
          router.replace('/')
        }
      } catch (err: unknown) {
        console.log(err)
        const errorMessage = 'Неуспешно обновяване, линкът може да е навалиден или изтекъл'
        setError(errorMessage)
      }
    })
  }

  return (
    <AuthWrapper>
      <div className="py-6 px-6 md:px-20 flex justify-center items-center">
        <form onSubmit={onSubmit} className="mt-4 space-y-3 flex flex-col gap-m">
          <div>
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
            <ul className="w-full flex flex-col gap-2 list-disc list-inside pl-2">
              <li
                className={`w-full font-georgia font-medium text-[12px]  marker:text-[#797979] ${
                  validPasswordFields.has8Chars ? 'text-green-600' : 'text-white'
                }`}
              >
                Минимум 6 символа
              </li>
              <li
                className={`w-full font-georgia font-medium text-[12px]  marker:text-[#797979] ${
                  validPasswordFields.hasNumber ? 'text-green-600' : 'text-white'
                }`}
              >
                Поне едно число
              </li>
              <li
                className={`w-full font-georgia font-medium text-[12px]  marker:text-[#797979] ${
                  validPasswordFields.hasUppercase && validPasswordFields.hasLowercase
                    ? 'text-green-600'
                    : 'text-white'
                }`}
              >
                Поне една главна и една малка английска буква
              </li>
            </ul>
          </div>
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
