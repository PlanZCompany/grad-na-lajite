'use client'

import { HomeBlock, Media } from '@/payload-types'
import React from 'react'
import HeadingPlusDescription from '../Generic/HeadingPlusDescription'
import { GenericHeading, GenericImage, GenericParagraph } from '../Generic'
import { RichText } from '../Custom'
import { GallerySlider } from '../Sliders'
import { Settings } from 'react-slick'
import { useAppSelector } from '@/hooks/redux-hooks'

const Testimonials = ({ data }: { data: HomeBlock['testimonials'] }) => {
  const extraComment = useAppSelector((state) => state.root.extraComments)

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
    const media = card?.basicComponent?.media as Media

    const heading = card?.basicComponent?.heading
    const description = card?.basicComponent?.description

    return (
      <div className="w-full px-2 md:px-[unset]" key={card.id}>
        <article
          className={`w-full bg-[rgba(20,10,40,0.85)] shadow-[0_0_20px_rgba(0,0,0,0.6)] md:max-w-[280px] flex flex-col
           rounded-[12px] overflow-hidden p-6`}
        >
          <div className="w-full h-[80px] relative flex justify-center items-center">
            <GenericImage
              src={media?.url || ''}
              alt={media?.alt || ''}
              wrapperClassName="m-auto w-[80px] h-[80px] relative rounded-full overflow-hidden border-[1px] border-primaryYellow"
              imageClassName="object-cover w-full h-full"
              sizes="(max-width: 1024px) 100vw, 33vw"
              priority={false}
              fill={true}
              updatedAt={media?.updatedAt}
            />
          </div>

          <div className="w-full flex flex-col gap-3 mt-4">
            {description && (
              <GenericParagraph pType="custom" extraClass="text-[16px] leading-[150%] text-center">
                <RichText data={description} />
              </GenericParagraph>
            )}
            {heading && (
              <GenericHeading textShadow={false} headingType="h5" align="text-center">
                <RichText data={heading} />
              </GenericHeading>
            )}
          </div>
        </article>
      </div>
    )
  })

  const extraCommentsContent = extraComment.map((currentComment, index) => {
    const comment = currentComment.comment
    const description = currentComment.name

    const currentImage =
      index % 2 === 0 ? '/static/user-testimonials-clear.jpg' : '/static/user-testimonials-dark.jpg'

    return (
      <div className="w-full px-2 md:px-[unset]" key={`extra-comment-${index}`}>
        <article
          className={`w-full bg-[rgba(20,10,40,0.85)] shadow-[0_0_20px_rgba(0,0,0,0.6)] md:max-w-[280px] flex flex-col
           rounded-[12px] overflow-hidden p-5`}
        >
          <div className="w-full h-[80px] relative flex justify-center items-center">
            <GenericImage
              src={`${currentImage}`}
              alt={'User static image'}
              wrapperClassName="m-auto w-[80px] h-[80px] relative rounded-full overflow-hidden border-[1px] border-primaryYellow"
              imageClassName="object-cover w-full h-full"
              sizes="(max-width: 1024px) 100vw, 33vw"
              priority={false}
              fill={true}
            />
          </div>

          <div className="w-full flex flex-col gap-3 mt-4">
            <GenericParagraph pType="custom" extraClass="text-[16px] leading-[150%] text-center">
              <p>{comment}</p>
            </GenericParagraph>

            <GenericHeading textShadow={false} headingType="h5" align="text-center">
              <p>{description}</p>
            </GenericHeading>
          </div>
        </article>
      </div>
    )
  })

  return (
    <section className="w-full py-10 md:py-20 flex">
      <div className="w-full content_wrapper_mobile-full flex flex-col gap-10">
        <HeadingPlusDescription heading={data?.heading} />
        {/* <div className="flex justify-center gap-8 items-center flex-wrap">{cardsContent}</div>
         */}
        <div className="w-full relative">
          <div className="hidden md:block pointer-events-none absolute top-0 bottom-0 left-0 w-[25%] z-[3] bg-gradient-to-r from-[#200226] to-transparent"></div>
          <GallerySlider refKey="testimonials" sliderSettings={settings}>
            {cardsContent?.concat(extraCommentsContent)}
          </GallerySlider>
          <div className="hidden md:block pointer-events-none absolute top-0 bottom-0 right-0 w-[25%] z-[3] bg-gradient-to-l from-[#200226] to-transparent"></div>
        </div>
      </div>
    </section>
  )
}

export default Testimonials
