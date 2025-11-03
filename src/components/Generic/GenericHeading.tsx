import React from 'react'

type heading1Props = {
  children: React.ReactNode
  extraClass?: string
  headingType?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  fontStyle?: 'font-georgia font-[400]' | 'font-georgia font-[700]' | 'custom'
  textColor?: 'text-white' | 'text-primaryYellow' | 'text-black'
  align?:
    | 'text-left'
    | 'text-center'
    | 'text-right'
    | 'portrait:text-center landscape:text-left'
    | 'portrait:text-center landscape:text-right'
    | 'text-center md:text-right'
    | 'text-center md:text-left'
  customStyles?: boolean
  textShadow?: boolean
}

const headingMap = {
  h1: 'text-[32px] sm:text-[32px] md:text-[32px] xl:text-[32px] 2xl:text-[32px] leading-[120%] md:leading-[160%]',
  h2: 'text-[28px] sm:text-[28px] md:text-[32px] xl:text-[32px] 2xl:text-[32px] leading-[120%] md:leading-[120%]',
  h3: 'text-[28px] sm:text-[36px] md:text-[40px] xl:text-[48px] 2xl:text-[48px] leading-[110%]',
  h4: 'text-[24px] sm:text-[32px] md:text-[28px] xl:text-[32px] 2xl:text-[32px] leading-[120%]',
  h5: 'text-[20px] sm:text-[20px] md:text-[18px] xl:text-[20px] 2xl:text-[22px] leading-[110%]',
  h6: 'text-[16px] sm:text-[18px] md:text-[20px] xl:text-[24px] 2xl:text-[16px] leading-[120%]',
}

const GenericHeading = ({
  children,
  extraClass,
  headingType = 'h1',
  fontStyle = 'font-georgia font-[700]',
  textColor = 'text-primaryYellow',
  customStyles = false,
  align = 'text-left',
  textShadow = false,
}: heading1Props) => {
  return (
    <div
      className={`${textShadow && 'heading_text_shadow'} ${!customStyles && headingMap[headingType]} ${extraClass} ${fontStyle !== 'custom' && fontStyle} ${textColor} ${align && align}`}
    >
      {children}
    </div>
  )
}

export default GenericHeading
