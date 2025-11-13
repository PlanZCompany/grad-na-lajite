'use client'

import { HomeBlock, Media } from '@/payload-types'
import React from 'react'
import HeadingPlusDescription from '../Generic/HeadingPlusDescription'
import { GenericHeading, GenericImage, GenericParagraph } from '../Generic'
import { RichText } from '../Custom'
import Link from 'next/link'
import { GallerySlider } from '../Sliders'
import { Settings } from 'react-slick'
import { useAppSelector } from '@/hooks/redux-hooks'

const GridCardsAndHeading = ({ data }: { data: HomeBlock['histories'] }) => {
  const blogs = useAppSelector((state) => state.root.blogs)

  const settings: Settings = {
    slidesToShow: 3,
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
  const cardsContent = blogs?.map((card) => {
    const media = (card?.media as Media) ?? undefined

    const heading = card?.heading
    const description = card?.description

    return (
      <div key={card.id} className="w-full px-2 md:px-4">
        <Link href={`/blog/${card.slug}`}>
          <article
            className={`w-full bg-[rgba(20,10,40,0.85)] shadow-[0_0_20px_rgba(0,0,0,0.6)] md:h-[480px] flex flex-col
            hover:translate-y-[-9px] duration-300 transition-transform rounded-[12px] overflow-hidden`}
          >
            {!!media && (
              <div className="w-full h-[230px] relative">
                <GenericImage
                  src={media?.url || ''}
                  alt={media?.alt || ''}
                  wrapperClassName="absolute inset-0 "
                  imageClassName="object-cover w-full h-full"
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  priority={false}
                  fill={true}
                  updatedAt={media?.updatedAt}
                />
              </div>
            )}

            <div className="w-full flex flex-col p-4 gap-3 mb-6 md:mb-[unset]">
              {heading && (
                <GenericHeading
                  textShadow={true}
                  headingType="h4"
                  align="text-left"
                  extraClass="line-clamp-3"
                >
                  <RichText data={heading} />
                </GenericHeading>
              )}
              {description && (
                <GenericParagraph
                  pType="custom"
                  extraClass="text-[16px] leading-[150%] md:line-clamp-4"
                >
                  <RichText data={description} />
                </GenericParagraph>
              )}
            </div>

            <div className="w-full px-3 mt-auto pb-3">
              <GenericParagraph
                pType="custom"
                extraClass="text-[16px] leading-[120%] font-bold hover:text-white transition-colors duration-300 ease-in-out"
                textColor="text-primaryYellow"
              >
                Прочети повече →
              </GenericParagraph>
            </div>
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
          <div className="hidden md:block absolute pointer-events-none top-0 bottom-0 left-0 w-[25%] z-[3] bg-gradient-to-r from-[#200226] to-transparent"></div>
          <GallerySlider extraClass="min-h-[320px]" refKey="gridCards" sliderSettings={settings}>
            {cardsContent}
          </GallerySlider>
          <div className="hidden md:block absolute pointer-events-none top-0 bottom-0 right-0 w-[25%] z-[3] bg-gradient-to-l from-[#200226] to-transparent"></div>
        </div>
      </div>
    </section>
  )
}

export default GridCardsAndHeading
