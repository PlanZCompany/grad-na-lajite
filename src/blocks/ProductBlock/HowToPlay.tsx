'use client'

import { GenericHeading, GenericImage, GenericButton } from '@/components/Generic'
import { SectionWrapper } from '@/components/Wrappers'
import { Media, ProductBlock } from '@/payload-types'
import { RichText } from '@payloadcms/richtext-lexical/react'
import Link from 'next/link'
import React from 'react'

const HowToPlay = ({ play }: { play: ProductBlock['play'] }) => {
  return (
    <SectionWrapper>
      <div className="m-auto content_wrapper flex flex-col gap-6 md:gap-12">
        {!!play.heading && (
          <GenericHeading
            textShadow={true}
            headingType="h2"
            align="text-center"
            extraClass={`w-full`}
          >
            <RichText data={play.heading} />
          </GenericHeading>
        )}

        <ul className="w-full grid md:grid-cols-2 gap-8 xl:grid-cols-4">
          {play.cardsArray?.map((card) => {
            const media = card?.basicComponent?.media as Media
            return (
              <li key={card.id} className="flex flex-col items-center gap-4">
                <GenericImage
                  src={media?.url || ''}
                  alt={media?.alt || ''}
                  wrapperClassName="w-full p-4 shadow-2xl max-w-[150px] xl:max-w-[150px] aspect-square relative rounded-[16px] overflow-hidden"
                  fill={true}
                  focalX={media?.focalX || 50}
                  focalY={media?.focalY || 50}
                  imageClassName="w-full h-full object-contain rounded-[16px] overflow-hidden"
                  sizes="100vw"
                  fetchPriority="high"
                  updatedAt={media?.updatedAt || ''}
                />

                {!!card?.basicComponent?.heading && (
                  <GenericHeading
                    textShadow={false}
                    headingType="h3"
                    align="text-center"
                    extraClass={`w-full text-[18px] leading-[150%]`}
                    customStyles={true}
                    textColor="text-white"
                  >
                    <RichText data={card?.basicComponent?.heading as any} />
                  </GenericHeading>
                )}
              </li>
            )
          })}
        </ul>
        {!!play.orderButton && (
          <GenericButton styleClass="w-full md:w-fit mx-auto">Купи сега</GenericButton>
        )}
        {!!play?.pdf?.button && (
          <GenericButton styleClass="w-full md:w-fit mx-auto">
            <Link href={play?.pdf?.url} className="w-full h-full">
              <div className="flex">{play?.pdf?.button}</div>
            </Link>
          </GenericButton>
        )}
      </div>
    </SectionWrapper>
  )
}

export default HowToPlay
