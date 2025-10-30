// app/forgot-password/page.tsx
'use client'

import { requestPasswordReset } from '@/action/auth/requestPassword'
import { GenericButton, GenericImage, GenericParagraph, TextInput } from '@/components/Generic'
import Link from 'next/link'
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
        <div className="py-6 px-6 md:px-20 md:translate-x-[80px] flex flex-col justify-center items-center">
          <p className="mt-2 text-sm text-brown/80">Въведете имейл адрес</p>
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
            <p className="mt-3 text-brown">
              Ако Акаунт съществува, ще получите имейл с инструкции за възстановяване на паролата.
            </p>
          )}
          {error && <p className="mt-3 text-red-600">{error}</p>}
        </div>
        <div className="w-full md:w-[300px] aspect-[3/4] md:aspect-[2.5/4] md:translate-x-[50%] h-[calc(100%-96px)] z-[2] rounded-tr-[12px] rounded-tl-[12px] md:rounded-[12px] overflow-hidden relative">
          <div className="absolute z-[2] bg-black/20 py-2 left-0 right-0 top-[28px] border-t-[1px] border-b-[1px] border-white/20">
            <GenericParagraph
              pType="regular"
              textColor="text-white"
              fontStyle="font-sansation font-[700]"
              extraClass="uppercase w-full text-center"
            >
              <span>Забравена парола</span>
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
