import { HomeBlock, Media } from '@/payload-types'
import React from 'react'
import HeadingPlusDescription from '../Generic/HeadingPlusDescription'
import { GenericImage } from '../Generic'
import { GallerySlider } from '../Sliders'
import { Settings } from 'react-slick'
import Link from 'next/link'

const Partners = ({ data }: { data: HomeBlock['partners'] }) => {
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
  const cardsContent = data?.cardsArray?.map((card) => {
    const media = card?.media as Media

    return (
      <div className="w-full px-2 md:px-[unset]" key={card.id}>
        <Link href={`${card.url}`}>
          <article
            className={`w-full bg-white/20 md:max-w-[280px] border-[1px] border-primaryYellow flex flex-col relative
         rounded-[12px] overflow-hidden p-5 h-[240px]`}
          >
            <GenericImage
              src={media?.url || ''}
              alt={media?.alt || ''}
              wrapperClassName="absolute inset-4"
              imageClassName="object-contain w-full h-full"
              sizes="(max-width: 1024px) 100vw, 33vw"
              priority={false}
              fill={true}
              updatedAt={media?.updatedAt}
            />
          </article>
        </Link>
      </div>
    )
  })

  return (
    <section className="w-full py-10 md:py-20 flex">
      <div className="w-full content_wrapper_mobile-full flex flex-col gap-10">
        <HeadingPlusDescription heading={data?.heading} />

        <div className="w-full relative">
          <div className="hidden md:block pointer-events-none absolute top-0 bottom-0 left-0 w-[25%] z-[3] bg-gradient-to-r from-[#200226] to-transparent"></div>
          <GallerySlider refKey="partners" sliderSettings={settings}>
            {cardsContent}
          </GallerySlider>
          <div className="hidden md:block pointer-events-none absolute top-0 bottom-0 right-0 w-[25%] z-[3] bg-gradient-to-l from-[#200226] to-transparent"></div>
        </div>
      </div>
    </section>
  )
}

export default Partners
