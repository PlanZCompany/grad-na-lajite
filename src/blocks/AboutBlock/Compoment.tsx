import { Background, RichText } from '@/components/Custom'
import { GenericButton, GenericHeading, GenericImage, GenericParagraph } from '@/components/Generic'
import { SectionWrapper } from '@/components/Wrappers'
import { AboutBlock, Media } from '@/payload-types'
import { generateHref, LinkObject } from '@/utils/generateHref'
import Link from 'next/link'
import React from 'react'

export const AboutBlockComponent: React.FC<AboutBlock> = (props) => {
  const { hero, mission, values, id } = props

  const heroMedia = hero?.media as Media
  const missionMedia = mission?.media as Media
  const valuesMedia = values?.media as Media

  return (
    <section className="w-full flex flex-col pt-[68px] md:pt-[130px] relative" key={id}>
      <Background />
      <SectionWrapper>
        <div className="m-auto content_wrapper">
          <div className="flex flex-col gap-10 md:flex-row">
            <GenericImage
              src={heroMedia?.url || ''}
              alt={heroMedia?.alt || ''}
              wrapperClassName="w-full max-w-[355px] aspect-[3.6/5] relative rounded-[16px] overflow-hidden"
              fill={true}
              priority={true}
              focalX={heroMedia?.focalX || 50}
              focalY={heroMedia?.focalY || 50}
              imageClassName="w-full h-full object-contain rounded-[16px] overflow-hidden shadow-xl"
              sizes="100vw"
              fetchPriority="high"
              updatedAt={heroMedia?.updatedAt || ''}
            />
            {!!hero && (
              <div className="flex-1">
                <article className={`flex gap-s flex-col`}>
                  {hero.heading && (
                    <GenericHeading
                      textShadow={true}
                      headingType="h2"
                      extraClass={`border-b-[1px] border-primaryYellow pb-3 w-full !text-center md:!text-left`}
                    >
                      <RichText data={hero.heading} />
                    </GenericHeading>
                  )}
                  {hero.description && (
                    <GenericParagraph extraClass="text-center md:text-left">
                      <RichText data={hero.description} />
                    </GenericParagraph>
                  )}
                </article>

                {!!hero && !!hero.links?.length && (
                  <div className="mt-6 md:mt-10 w-full md:w-fit">
                    <Link href={generateHref(hero?.links[0] as LinkObject)}>
                      <GenericButton styleClass="w-full">
                        {hero.links?.[0]?.link?.label || 'Прочети повече'}
                      </GenericButton>
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </SectionWrapper>
      <div className="divider_section relative z-[2]"></div>
      {!!mission && (
        <SectionWrapper>
          <div className="m-auto content_wrapper">
            <div className="flex flex-col gap-10 md:flex-row">
              <div className="flex-1 flex justify-center items-center">
                <article className={`flex gap-s flex-col`}>
                  {mission.heading && (
                    <GenericHeading
                      textShadow={true}
                      headingType="h2"
                      align="text-center md:text-left"
                      extraClass={`border-b-[1px] border-primaryYellow pb-3 w-full`}
                    >
                      <RichText data={mission.heading} />
                    </GenericHeading>
                  )}
                  {mission.description && (
                    <GenericParagraph extraClass="text-center md:text-left">
                      <RichText data={mission.description} />
                    </GenericParagraph>
                  )}
                </article>
              </div>
              <GenericImage
                src={missionMedia?.url || ''}
                alt={missionMedia?.alt || ''}
                wrapperClassName="w-full max-w-[350px] aspect-square relative rounded-[16px] overflow-hidden shadow-xl"
                fill={true}
                priority={true}
                focalX={missionMedia?.focalX || 50}
                focalY={missionMedia?.focalY || 50}
                imageClassName="w-full h-full object-contain rounded-[16px] overflow-hidden"
                sizes="100vw"
                updatedAt={missionMedia?.updatedAt || ''}
              />
            </div>
          </div>
        </SectionWrapper>
      )}
      <div className="divider_section relative z-[2]"></div>
      {values && (
        <SectionWrapper>
          <div className="m-auto content_wrapper">
            <div className="flex flex-col gap-10 md:flex-row-reverse">
              <div className="flex-1 flex justify-center items-center">
                <article className={`flex gap-s flex-col`}>
                  {values.heading && (
                    <GenericHeading
                      textShadow={true}
                      headingType="h2"
                      align="text-center md:text-left"
                      extraClass={`border-b-[1px] border-primaryYellow pb-3 w-full`}
                    >
                      <RichText data={values.heading} />
                    </GenericHeading>
                  )}
                  {values.description && (
                    <GenericParagraph extraClass="text-center md:text-left">
                      <RichText data={values.description} />
                    </GenericParagraph>
                  )}
                </article>
              </div>
              <GenericImage
                src={valuesMedia?.url || ''}
                alt={valuesMedia?.alt || ''}
                wrapperClassName="w-full max-w-[350px] aspect-square relative rounded-[16px] overflow-hidden shadow-xl"
                fill={true}
                priority={true}
                focalX={valuesMedia?.focalX || 50}
                focalY={valuesMedia?.focalY || 50}
                imageClassName="w-full h-full object-contain rounded-[16px] overflow-hidden"
                sizes="100vw"
                updatedAt={valuesMedia?.updatedAt || ''}
              />
            </div>
          </div>
        </SectionWrapper>
      )}
    </section>
  )
}
