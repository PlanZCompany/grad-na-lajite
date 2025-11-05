'use client'

import { subscribeAction } from '@/action/subscribe'
import subscribeEmail from '@/action/subscribe/subscribeEmail'
import { GenericHeading, GenericImage, GenericParagraph } from '@/components/Generic'
import SectionWrapper from '@/components/Wrappers/SectionWrapper'
import { useAppDispatch, useAppSelector } from '@/hooks/redux-hooks'
import { Media, SubscriptionForm } from '@/payload-types'
import { setNotification } from '@/store/features/notifications'
import { RichText } from '@payloadcms/richtext-lexical/react'
import React, { useState, useTransition } from 'react'

export const SubscriptionFormBlock: React.FC<SubscriptionForm> = (props) => {
  const dispatch = useAppDispatch()
  const { heading, description, media } = props
  const user = useAppSelector((state) => state.root.user)

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
          setMessage(res.message + (res.discountCode ? ` Код: ${res.discountCode}` : ''))
        } else {
          setMessage(res.fieldErrors?.email ?? res.message)
        }

        if (res.ok && !!res.discountCode) {
          subscribeEmail(email, res.userName, res.discountCode)
        }
        dispatch(
          setNotification({
            showNotification: true,
            message: 'Успешен абонамент',
            type: 'success',
          }),
        )
      } catch (err) {
        console.log(err)
      }
    })
  }

  if (!!user?.subscribed) {
    return <></>
  }

  return (
    <SectionWrapper>
      <div
        className="w-full max-w-[calc(100%-24px)] xl:max-w-[1000px] 
      mx-auto my-auto relative flex px-6 py-10 md:py-[150px] rounded-[16px] overflow-hidden"
      >
        <GenericImage
          src={(media as Media).url || ''}
          alt={(media as Media).alt || ''}
          wrapperClassName="w-full h-full absolute inset-0"
          fill={true}
          priority={false}
          imageClassName="w-full h-full object-cover"
          updatedAt={(media as Media).updatedAt}
        />

        <div className="m-auto flex flex-col gap-m relative z-[2]">
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
              <GenericParagraph extraClass="!text-center" pType="small">
                <RichText data={description} />
              </GenericParagraph>
            )}
          </article>

          <form>
            <div className="w-full flex flex-col md:flex-row items-center justify-center gap-4">
              <input
                type="email"
                placeholder="Email"
                className="w-full md:w-fit md:min-w-[250px] 2xl:min-w-[300px] p-2 text-[14px] md:text-[16px]
                rounded-[10px] bg-white text-[#1a0f2e] placeholder:text-[#1a0f2e]/80 placeholder:font-bold"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button
                type="button"
                className="w-fit px-5 py-[8px] rounded-[10px] text-[#1a0f2e] bg-[#d4af37] font-bold uppercase
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
              Записвайки се, сте съгласни с нашата политика за поверителност и условия за
              използване.
            </p>

            {message && (
              <p className="text-base text-primaryYellow text-center md:text-left">{message}</p>
            )}
          </form>
        </div>
      </div>
    </SectionWrapper>
  )
}
