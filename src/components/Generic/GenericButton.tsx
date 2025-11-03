'use client'

import React from 'react'

const constantClass = `inline-flex items-center justify-center 
whitespace-nowrap rounded ring-offset-background transition-colors focus-visible:outline-none 
focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none`
const classMap = {
  primary: `bg-gradient-to-br from-[#d4af37] to-[#b7952b] text-[#FFD700]
         text-xl font-bold cursor-pointer
         transition-all duration-300 ease-in-out
         shadow-[0_0_15px_rgba(212,175,55,0.4)]
         hover:from-[#e8c85c] hover:to-[#d4af37]
         hover:shadow-[0_0_25px_rgba(212,175,55,0.7)]`,
  secondary:
    'bg-transparent border-[1px] border-primaryBlackAccent hover:bg-primaryWhite hover:text-primaryBlack !text-primaryBlack',
  colored:
    'bg-gradient-to-tr from-[#023900] to-[#020202] border-[1px] border-primaryBlackAccent hover:from-[#020202] hover:to-[#023900]',
  gray: 'bg-gradient-to-tr from-primaryGray to-primaryBlack border-[1px] border-primaryBlackAccent hover:from-primaryWhiteAccent hover:to-primaryWhite',
  outLined: 'bg-pink/50 border-[1px] border-white text-white hover:bg-white hover:text-pink',
  white:
    'bg-transparent border-[1px] border-white text-white hover:bg-white hover:!text-bordo !font-[700] transition-all duration-300 ease-in-out',
}

type GenericButtonProps = {
  styleClass?: string
  disabled?: boolean
  children: React.ReactNode
  click?: () => void
  type?: 'button' | 'submit' | 'reset'
  ariaLabel?: string | null | undefined
  variant?: 'primary' | 'secondary' | 'colored' | 'gray' | 'outLined' | 'white'
  form?: string
}

const GenericButton = ({
  styleClass = '',
  disabled,
  children,
  click = () => {},
  type = 'button',
  ariaLabel,
  variant = 'primary',
  form = undefined,
}: GenericButtonProps) => {
  const variantClass = classMap[variant]

  return (
    <button
      className={`px-6 py-2 md:px-10 md:py-4 rounded-lg ${variantClass} ${constantClass} ${styleClass && styleClass} 
      font-georgia font-[400] uppercase`}
      disabled={disabled}
      onClick={() => {
        click()
      }}
      type={type}
      aria-label={ariaLabel || 'button'}
      form={form}
    >
      {children}
    </button>
  )
}

export default GenericButton
