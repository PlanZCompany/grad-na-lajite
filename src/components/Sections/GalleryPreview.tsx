import { HomeBlock, Media } from '@/payload-types'
import React from 'react'
import HeadingPlusDescription from '../Generic/HeadingPlusDescription'
import { GenericImage } from '../Generic'

const GalleryPreview = ({ data }: { data: HomeBlock['galleryPreview'] }) => {
  const cardsContent = data?.mediaArray?.map((card, index) => {
    const media = card?.media as Media

    return (
      <article
        className={`w-full xl:max-w-[266px] xl:h-full bg-[#d4af37] min-h-[320px] xl:min-h-[unset]
        relative hover:scale-[1.03] duration-300 transition-transform p-2.5 rounded-[12px] shadow-[0_4px_20px_rgba(0,0,0,0.6)]
    ${index === 1 && 'xl:h-[220px]'}`}
        key={card.id}
      >
        <div className="w-full h-[320px] xl:h-full rounded-[6px] overflow-hidden relative shadow_card hover:scale-[1.07] transition-transform duration-300">
          <GenericImage
            src={media?.url || ''}
            alt={media?.alt || ''}
            wrapperClassName="absolute inset-0"
            imageClassName="object-contain w-full h-full"
            sizes="(max-width: 1024px) 100vw, 33vw"
            priority={false}
            fill={true}
            updatedAt={media?.updatedAt}
          />
        </div>
      </article>
    )
  })

  return (
    <section className="w-full py-10 md:py-20 flex">
      <div className="w-full content_wrapper flex flex-col gap-10">
        <HeadingPlusDescription heading={data?.heading} />
        <div className="flex flex-wrap justify-evenly items-center gap-6 xl:gap-[unset] xl:min-h-[320px]">
          {cardsContent}
        </div>
      </div>
    </section>
  )
}

export default GalleryPreview
