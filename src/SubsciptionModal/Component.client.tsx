'use client'

import { subscribeAction } from '@/action/subscribe'
import { CloseCircle, DiscountIcon } from '@/assets/icons'
import { GenericHeading, GenericImage, GenericParagraph } from '@/components/Generic'
import { useAppDispatch } from '@/hooks/redux-hooks'
import { Media, SubscriptionModal } from '@/payload-types'
import { setNotification } from '@/store/features/notifications'
import { RichText } from '@payloadcms/richtext-lexical/react'
import Link from 'next/link'
import React, { useEffect, useRef, useState, useTransition } from 'react'

const SubscriptionModalClient = ({ data }: { data: SubscriptionModal }) => {
  const dispatch = useAppDispatch()
  const [openModal, setOpenModal] = useState(false)
  const { heading, description, media } = data
  const timeOut = useRef<NodeJS.Timeout | null>(null)

  const [email, setEmail] = useState<string>('')
  const [message, setMessage] = useState<string | null>(null)
  const [pending, startTransition] = useTransition()

  const subscriptionHandler = () => {
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    if (!isValid) {
      setMessage('Моля въведете валиден имейл адрес')
      return
    }

    startTransition(async () => {
      try {
        const res = await subscribeAction(email)

        if (res.ok) {
          setMessage(res.message)
          dispatch(
            setNotification({
              showNotification: true,
              message: 'Успешен абонамент',
              type: 'success',
            }),
          )

          timeOut.current = setTimeout(() => {
            setOpenModal(false)
          }, 1000)
        } else {
          setMessage(res.fieldErrors?.email ?? res.message)
        }
      } catch (err) {
        console.log(err)
      }
    })
  }

  useEffect(() => {
    return () => {
      if (timeOut.current) {
        clearTimeout(timeOut.current)
      }
    }
  }, [])

  return (
    <>
      <button
        className="fixed bottom-[64px] md:bottom-[66px] right-[12px] md:right-[18px] z-[10] REF_SUBSCRIPTION_MODAL"
        onClick={() => setOpenModal(true)}
      >
        <div className="w-[32px] h-[32px] md:w-[36px] md:h-[36px]">
          <DiscountIcon />
        </div>
      </button>

      <div
        role="dialog"
        aria-label="subscription-modal"
        className={`fixed z-[15] bg-black/80 inset-0 flex ${
          openModal ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'
        } transition-[transform,opacity] duration-700 ease-in-out`}
      >
        <div className="m-auto w-full max-w-[90%] md:max-w-[600px] xl:max-w-[710px] bg-purpleDark rounded-[12px] overflow-hidden relative">
          <button
            type="button"
            aria-label="Close Modal"
            className="flex justify-center items-center absolute top-2 right-2 z-[3] w-[32px] h-[32px] md:w-[36px] md:h-[36px]
             bg-primaryYellow/80 hover:bg-primaryYellow rounded-full"
            onClick={() => setOpenModal(false)}
          >
            <CloseCircle />
          </button>
          <div className="m-auto flex flex-col relative z-[2] py-4 md:py-6 xl:py-10 px-4 md:px-6 xl:px-10">
            <GenericImage
              src={(media as Media)?.url as string}
              alt={(media as Media)?.alt as string}
              wrapperClassName="w-[100px] h-[100px] md:w-[200px] md:h-[200px] xl:w-[250px] xl:h-[250px] flex items-center justify-center relative mx-auto"
              imageClassName="w-full h-full object-contain"
              fill={true}
            />
            <article className="flex justify-center items-center gap-s flex-col">
              {heading && (
                <GenericHeading
                  textShadow={true}
                  headingType="h2"
                  align="text-center"
                  extraClass="border-b-[1px] border-primaryYellow pb-3"
                >
                  <RichText data={heading} />
                </GenericHeading>
              )}
              {description && (
                <GenericParagraph extraClass="!text-center mb-6" pType="small">
                  <RichText data={description} />
                </GenericParagraph>
              )}
            </article>

            <form>
              <div className="w-full flex flex-col items-center justify-center gap-4">
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full p-2 text-[14px] md:text-[16px]
                rounded-[10px] bg-white text-[#1a0f2e] placeholder:text-[#1a0f2e]/80 placeholder:font-bold"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button
                  type="button"
                  className="w-full px-5 py-[8px] rounded-[10px] text-[#1a0f2e] bg-[#d4af37] font-bold uppercase
                hover:bg-[#b9972c] transition-all duration-300 ease-in-out md:text-[14px] 2xl:text-[16px]"
                  disabled={pending}
                  onClick={() => {
                    subscriptionHandler()
                  }}
                >
                  {pending ? 'Абониране...' : 'Абонирай ме'}
                </button>
              </div>

              <p className="text-white/60 text-[12px] md:text-[14px] mt-4 text-center">
                Записвайки се, сте съгласни с нашата{' '}
                <Link className="underline" href="/privacy-policy">
                  Политика за поверителност
                </Link>{' '}
                и{' '}
                <Link className="underline" href="/terms-and-conditions">
                  Условия за използване
                </Link>
                .
              </p>

              {message && (
                <p className="text-base text-primaryYellow text-center md:text-left">{message}</p>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default SubscriptionModalClient
