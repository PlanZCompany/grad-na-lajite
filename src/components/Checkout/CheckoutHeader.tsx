'use client'
import Link from 'next/link'
import React from 'react'
import { GenericImage, GenericParagraph } from '../Generic'

const stages = ['Контакт', 'Доставка', 'Плащане', 'Потвърждение']

const CheckoutHeader = () => {
  const stageContent = stages.map((stage, index) => {
    return (
      <li className="w-full flex items-center gap-2" key={stage}>
        <div className="size-10 rounded-full flex justify-center items-center p-2 border-[1px] border-primaryYellow">
          <p className="text-center text-primaryYellow">{index + 1}</p>
        </div>

        <GenericParagraph extraClass="text-white">{stage}</GenericParagraph>

        <div className="flex-1 bg-gradient-to-r from-primaryYellow to-transparent h-[2px] w-full"></div>
      </li>
    )
  })

  return (
    <header className="w-full bg-black/70 z-[12] py-[4px] md:py-[15px] px-4 lg:px-[40px] flex justify-center items-center">
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
