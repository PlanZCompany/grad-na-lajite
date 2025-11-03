import { HomeBlock, Media } from '@/payload-types'
import React from 'react'
import HeadingPlusDescription from '../Generic/HeadingPlusDescription'
import { GenericHeading, GenericImage, GenericParagraph } from '../Generic'
import { RichText } from '../Custom'

const Testimonials = ({ data }: { data: HomeBlock['testimonials'] }) => {
  const cardsContent = data?.cardsArray?.map((card) => {
    const media = card?.basicComponent.media as Media

    const { heading, description } = card?.basicComponent

    return (
      <article
        className={`w-full bg-[rgba(20,10,40,0.85)] shadow-[0_0_20px_rgba(0,0,0,0.6)] max-w-[280px] flex flex-col gap-4
            hover:translate-y-[-9px] duration-300 transition-transform rounded-[12px] overflow-hidden p-5`}
        key={card.id}
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

        <div className="w-full flex flex-col gap-3">
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
    )
  })

  return (
    <section className="w-full py-10 md:py-20 flex">
      <div className="w-full content_wrapper flex flex-col gap-10">
        <HeadingPlusDescription heading={data?.heading} />
        <div className="flex justify-center gap-8 items-center flex-wrap">{cardsContent}</div>
      </div>
    </section>
  )
}

export default Testimonials
