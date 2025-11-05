'use client'

import { ArrowIcon } from '@/assets/icons'
import { COLORS } from '@/cssVariables'
import React from 'react'

const DirectionArrow = ({
  click,
  direction,
}: {
  click: () => void
  direction: 'left' | 'right'
  theme?: 'light' | 'dark'
}) => {
  return (
    <button
      className={`hidden md:flex z-[5] 
        absolute top-[50%] translate-y-[-50%] rounded-full size-[32px] min-w-[32px] md:size-[48px] md:min-w-[48px] border-[1px]  
        justify-center items-center ${
          direction === 'left' ? 'rotate-180 -left-[40px]' : '-right-[40px]'
        } border-[1px] border-primaryYellow bg-[#200226]/80
      focus:opacity-100 hover:opacity-50 transition-all duration-300 ease-in-out`}
      aria-label={`Виж ${direction === 'left' ? 'предходен' : 'следващ'} изглед`}
      onClick={click}
    >
      <div className="size-[24px] md:size-[32px]">
        <ArrowIcon color={COLORS.primaryYellow} />
      </div>
    </button>
  )
}

export default DirectionArrow
