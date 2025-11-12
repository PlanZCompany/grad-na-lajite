import { GenericImage } from '@/components/Generic'
import { DividerBlock, Media } from '@/payload-types'
import React from 'react'

export const DividerBlockComponent: React.FC<DividerBlock> = (props) => {
  const media = props.media as Media
  return (
    <div className="w-full my-[32px] md:my-[48px] h-[2px] bg-[#D4AF37] relative">
      <GenericImage
        src={media?.url || ''}
        alt={media?.alt || ''}
        wrapperClassName="absolute left-[50%] translate-x-[-50%] top-[50%] translate-y-[-50%] w-[48px] h-[28px] bg-white"
        imageClassName="object-contain w-full h-full"
        fill={true}
        sizes="28px"
      />
    </div>
  )
}
