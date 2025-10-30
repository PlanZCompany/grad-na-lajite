// app/reset-password/page.tsx
'use client'

import { resetPassword } from '@/action/auth/resetPassowrd'
import { GenericButton, GenericImage, GenericParagraph, TextInput } from '@/components/Generic'
import Link from 'next/link'
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
    return <main className="p-6">Reset link is missing or invalid.</main>
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
    <section className="w-full relative py-10 md:py-20 flex mt-[52px] md:mt-[140px]">
      <GenericImage
        src="/static/auth-background.png"
        alt="auth-background"
        wrapperClassName="w-full h-full absolute top-0 left-0 z-[0]"
        imageClassName="w-full h-full object-cover"
        fill={true}
        sizes="100vw"
        fetchPriority="high"
      />

      <div className="m-auto white_background_bubble w-fit md:py-10 relative z-[1] rounded-[24px] flex flex-col-reverse md:flex-row">
        <div className="py-6 px-6 md:px-20 md:translate-x-[80px] flex justify-center items-center">
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

        <div className="w-full md:w-[300px] aspect-[3/4] md:aspect-[2.5/4] md:translate-x-[50%] h-[calc(100%-96px)] z-[2] rounded-tr-[12px] rounded-tl-[12px] md:rounded-[12px] overflow-hidden relative">
          <div className="absolute z-[2] bg-black/20 py-2 left-0 right-0 top-[28px] border-t-[1px] border-b-[1px] border-white/20">
            <GenericParagraph
              pType="regular"
              textColor="text-white"
              fontStyle="font-sansation font-[700]"
              extraClass="uppercase w-full text-center"
            >
              <span>възстановяване на парола</span>
            </GenericParagraph>
          </div>
          <GenericImage
            src="/static/auth-inner.jpg"
            alt="auth-inner"
            wrapperClassName="w-full h-full absolute top-0 left-0 z-[0]"
            imageClassName="w-full h-full object-cover"
            fill={true}
            sizes="400px"
          />

          <div className="absolute z-[2] bg-black/20 py-[2px] left-0 right-0 bottom-[0px] border-t-[1px] flex justify-center items-center border-b-[1px] border-white/20">
            <Link href="/terms" className="w-full text-white text-center">
              <span className="font-kolka font-[400] text-white text-center text-[14px] w-full">
                Политика за поверителност
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
