import React from 'react'

type paragraphProps = {
  children: React.ReactNode
  extraClass?: string
  pType?: 'extraSmall' | 'small' | 'semi' | 'regular' | 'large' | 'custom'
  fontStyle?:
    | 'font-kolka font-[400]'
    | 'font-kolka font-[500]'
    | 'font-kolka font-[700]'
    | 'font-sansation font-[400]'
    | 'font-sansation font-[700]'
    | 'font-sansation font-[400] italic'
    | 'font-sansation font-[700] italic'
    | 'custom'
  textColor?: 'text-brown' | 'text-white' | 'text-bordo' | 'text-pink' | 'text-mixPink'
}

const fontMap = {
  extraSmall: 'text-xs',
  small: 'text-[12px] md:text-[16px] leading-[110%]',
  semi: 'text-[14px] md:text-[18px] leading-[110%]',
  regular: 'text-[16px] md:text-[20px] leading-[110%]',
  large: 'text-[18px] md:text-[24px] leading-[110%]',
  custom: 'custom',
}

const GenericParagraph = ({
  children,
  extraClass,
  pType = 'regular',
  fontStyle = 'font-sansation font-[400]',
  textColor = 'text-brown',
}: paragraphProps) => {
  return (
    <div
      className={`${fontStyle !== 'custom' && fontStyle} ${extraClass} ${
        pType !== 'custom' && fontMap[pType]
      } ${textColor}`}
    >
      {children}
    </div>
  )
}

export default GenericParagraph
