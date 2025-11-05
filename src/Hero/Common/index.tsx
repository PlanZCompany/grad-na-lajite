'use client'

import { RichText } from '@/components/Custom'
import { GenericButton, GenericHeading, GenericImage, GenericParagraph } from '@/components/Generic'
import { CommonHero, Media } from '@/payload-types'
import React from 'react'

const HeroCommon: React.FC<CommonHero> = (props) => {
  const { heading, description, media, background, links } = props

  return (
    <section
      className={`w-full flex min-h-screen xxl:min-h-[780px] pt-[68px] md:pt-[130px]`}
      id="hero"
    >
      <div className="w-full relative flex">
        <div className="absolute z-[1] background_overlay inset-0"></div>
        <GenericImage
          src={(background as Media).url || ''}
          alt={(background as Media).alt || ''}
          wrapperClassName="w-full h-full absolute inset-0"
          fill={true}
          priority={true}
          focalX={(background as Media).focalX || 50}
          focalY={(background as Media).focalY || 50}
          imageClassName="w-full h-full object-cover"
          sizes="100vw"
          fetchPriority="high"
        />
        <div className="w-full max-w-[920px] mx-auto my-auto flex flex-col md:flex-row gap-m items-center md:justify-between md:gap-[unset] relative z-[4]">
          <GenericImage
            src={(media as Media).url || ''}
            alt={(media as Media).alt || ''}
            wrapperClassName="w-[220px] h-[220px] md:w-[250px] md:h-[250px] xl:w-[300px] xl:h-[300px] relative"
            fill={true}
            priority={true}
            focalX={(media as Media).focalX || 50}
            focalY={(media as Media).focalY || 50}
            imageClassName="w-full h-full object-contain"
            sizes="100vw"
            fetchPriority="high"
          />

          <div className="flex flex-col gap-m relative z-[3] pb-20 md:pb-[unset]">
            {heading && (
              <GenericHeading
                headingType="h1"
                align="text-center md:text-right"
                extraClass="max-w-[90%] mx-auto md:max-w-[unset] md:mx-[unset]"
              >
                <h1 className="!text-[#FFD700]">
                  <RichText data={heading} />
                </h1>
              </GenericHeading>
            )}
            {description && (
              <GenericParagraph
                pType="regular"
                textColor="text-white"
                fontStyle="font-georgia font-[400]"
                extraClass="text-center md:text-right"
              >
                <RichText data={description} />
              </GenericParagraph>
            )}

            {!!links?.length && (
              <GenericButton
                ariaLabel={'Купи сега'}
                click={() => {
                  //add to cart
                }}
                variant="primary"
                styleClass="w-fit self-center md:self-end mt-6 md:mb-[unset]"
              >
                {links[0].link?.label}
              </GenericButton>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroCommon
