import { HomeBlock, Media } from '@/payload-types'
import React from 'react'
import HeadingPlusDescription from '../Generic/HeadingPlusDescription'
import { GenericHeading, GenericImage, GenericParagraph } from '../Generic'
import { RichText } from '../Custom'
import Link from 'next/link'

const GridCardsAndHeading = ({ data }: { data: HomeBlock['histories'] }) => {
  const cardsContent = data?.cardsArray?.map((card, index) => {
    const media = card?.basicComponent.media as Media

    const { heading, description } = card?.basicComponent

    return (
      <article
        className={`w-full bg-[rgba(20,10,40,0.85)] shadow-[0_0_20px_rgba(0,0,0,0.6)] h-[460px] md:h-[480px] flex flex-col
            hover:translate-y-[-9px] duration-300 transition-transform rounded-[12px] overflow-hidden`}
        key={card.id}
      >
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

        <div className="w-full flex flex-col p-4 gap-3">
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
            <GenericParagraph pType="custom" extraClass="text-[16px] leading-[150%] line-clamp-4">
              <RichText data={description} />
            </GenericParagraph>
          )}
        </div>

        <div className="w-full px-3 mt-auto pb-3">
          <Link href={'/TODO'} className="w-full">
            <GenericParagraph
              pType="custom"
              extraClass="text-[16px] leading-[120%] font-bold hover:text-white transition-colors duration-300 ease-in-out"
              textColor="text-primaryYellow"
            >
              Прочети повече →
            </GenericParagraph>
          </Link>
        </div>
      </article>
    )
  })

  return (
    <section className="w-full py-10 md:py-20 flex">
      <div className="w-full content_wrapper flex flex-col gap-10">
        <HeadingPlusDescription heading={data?.heading} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 xl:grid-cols-3">{cardsContent}</div>
      </div>
    </section>
  )
}

export default GridCardsAndHeading
