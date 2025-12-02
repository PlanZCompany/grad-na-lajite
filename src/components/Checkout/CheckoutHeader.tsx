'use client'
import Link from 'next/link'
import React from 'react'
import { GenericImage, GenericParagraph } from '../Generic'
import { useAppSelector } from '@/hooks/redux-hooks'

const stages = ['Контакт', 'Доставка', 'Плащане', 'Потвърждение']
const REFS = [
  'REF_CHECKOUT_CONTACT',
  'REF_CHECKOUT_SHIPPING',
  'REF_CHECKOUT_PAYMENT',
  'REF_CHECKOUT_CONFIRMATION',
]

const CheckoutHeader = () => {
  const completedStage = useAppSelector((state) => state.checkout.stageCompleted)

  const stageContent = stages.map((stage, index) => {
    const currentRef = REFS[index]

    const isStageCompleted = completedStage >= index + 1
    const isCurrentStep = completedStage === index

    let extraClass = 'bg-transparent text-primaryYellow'
    if (isStageCompleted) extraClass = 'bg-primaryYellow text-black'
    if (isCurrentStep) extraClass = 'radial_yellow text-black scale-110'

    return (
      <li className="w-full flex items-center gap-2" key={stage}>
        <button
          className={`size-6 lg:size-10 rounded-full flex justify-center items-center p-2 border-[1px] border-primaryYellow
          ${extraClass}
          `}
          aria-label={stage}
          onClick={() => {
            const nextTarget = document.querySelector(`.${currentRef}`) as HTMLElement

            if (nextTarget) {
              nextTarget.scrollIntoView({ behavior: 'smooth', block: 'start' })
            }
          }}
          disabled={completedStage === 3}
        >
          <p className="text-center text-[12px] lg:text-[16px]">{index + 1}</p>
        </button>

        <GenericParagraph extraClass="text-white hidden lg:block">{stage}</GenericParagraph>

        <div className="flex-1 bg-gradient-to-r from-primaryYellow to-transparent h-[2px] w-full"></div>
      </li>
    )
  })

  return (
    <header className="w-full bg-black/70 z-[12] py-[4px] md:py-[15px] px-4 lg:px-[40px] flex justify-center items-center sticky top-0">
      <nav className="w-full flex justify-between items-center content_wrapper_mobile-full relative z-[2]">
        <Link href={'/'} aria-label="Отиди на начална страница">
          <GenericImage
            src={`/Logo.png`}
            alt="Лого"
            wrapperClassName="w-[60px] h-[60px] md:w-[100px] md:h-[100px] flex items-center justify-center relative"
            imageClassName="w-full h-full object-contain"
            fill={true}
          />
        </Link>

        <ul className="grid grid-cols-4 w-full px-6">{stageContent}</ul>
      </nav>
    </header>
  )
}

export default CheckoutHeader
