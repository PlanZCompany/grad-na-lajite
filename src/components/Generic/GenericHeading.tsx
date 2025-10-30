import React from 'react'

type heading1Props = {
  children: React.ReactNode
  extraClass?: string
  headingType?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  fontStyle?:
    | 'font-kolka font-[400]'
    | 'font-kolka font-[500]'
    | 'font-kolka font-[700]'
    | 'font-sansation font-[400]'
    | 'font-sansation font-[700]'
    | 'font-sansation font-[400] italic'
    | 'font-sansation font-[700] italic'
    | 'custom'
  textColor?: 'text-white' | 'text-brown' | 'text-bordo' | 'text-pink'
  align?:
    | 'text-left'
    | 'text-center'
    | 'text-right'
    | 'portrait:text-center landscape:text-left'
    | 'portrait:text-center landscape:text-right'
  customStyles?: boolean
}

const headingMap = {
  h1: 'text-[40px] sm:text-[48px] md:text-[64px] xl:text-[72px] 2xl:text-[86px] leading-[120%]',
  h2: 'text-[32px] sm:text-[40px] md:text-[48px] xl:text-[56px] 2xl:text-[60px] leading-[100%]',
  h3: 'text-[28px] sm:text-[36px] md:text-[40px] xl:text-[48px] 2xl:text-[48px] leading-[110%]',
  h4: 'text-[24px] sm:text-[32px] md:text-[28px] xl:text-[32px] 2xl:text-[32px] leading-[120%]',
  h5: 'text-[20px] sm:text-[20px] md:text-[18px] xl:text-[20px] 2xl:text-[22px] leading-[110%]',
  h6: 'text-[16px] sm:text-[18px] md:text-[20px] xl:text-[24px] 2xl:text-[16px] leading-[120%]',
}

const GenericHeading = ({
  children,
  extraClass,
  headingType = 'h1',
  fontStyle = 'font-sansation font-[700]',
  textColor = 'text-white',
  customStyles = false,
  align = 'text-left',
}: heading1Props) => {
  return (
    <div
      className={`${!customStyles && headingMap[headingType]} ${extraClass} ${fontStyle !== 'custom' && fontStyle} ${textColor} ${align && align}`}
    >
      {children}
    </div>
  )
}

export default GenericHeading
