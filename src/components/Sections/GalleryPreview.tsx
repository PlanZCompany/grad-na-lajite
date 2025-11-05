import { HomeBlock, Media } from '@/payload-types'
import React from 'react'
import HeadingPlusDescription from '../Generic/HeadingPlusDescription'
import { GenericImage } from '../Generic'
import { GallerySlider } from '../Sliders'
import { Settings } from 'react-slick'

const GalleryPreview = ({ data }: { data: HomeBlock['galleryPreview'] }) => {
  const settings: Settings = {
    slidesToShow: 4,
    responsive: [
      {
        breakpoint: 1279,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1023,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: true,
          centerPadding: '24px',
        },
      },
    ],
  }

  const cardsContent = data?.mediaArray?.map((card) => {
    const media = card?.media as Media

    return (
      <div key={card.id} className="w-full px-2 md:px-4">
        <article
          className={`w-full my-4 bg-[#d4af37] min-h-[320px]
        relative hover:scale-[1.03] duration-300 transition-transform p-2.5 rounded-[12px] shadow-[0_4px_20px_rgba(0,0,0,0.6)]`}
        >
          <div className="w-full h-[320px] rounded-[6px] overflow-hidden relative shadow_card hover:scale-[1.07] transition-transform duration-300">
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
      </div>
    )
  })

  return (
    <section className="w-full py-10 md:py-20 flex">
      <div className="w-full content_wrapper_mobile-full flex flex-col gap-10">
        <HeadingPlusDescription heading={data?.heading} />
        <div className="w-full relative">
          <div className="hidden md:block absolute top-0 bottom-0 left-0 w-[25%] z-[3] bg-gradient-to-r from-[#200226] to-transparent"></div>
          <GallerySlider
            extraClass="min-h-[320px]"
            refKey="galleryPreview"
            sliderSettings={settings}
          >
            {cardsContent}
          </GallerySlider>
          <div className="hidden md:block absolute top-0 bottom-0 right-0 w-[25%] z-[3] bg-gradient-to-l from-[#200226] to-transparent"></div>
        </div>
      </div>
    </section>
  )
}

export default GalleryPreview
