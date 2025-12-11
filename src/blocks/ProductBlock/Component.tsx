import { RichText } from '@/components/Custom'
import { GenericButton, GenericHeading, GenericImage, GenericParagraph } from '@/components/Generic'
import { InfoAndImage } from '@/components/Sections'
import { SectionWrapper } from '@/components/Wrappers'
import { Media, ProductBlock } from '@/payload-types'
import { generateHref, LinkObject } from '@/utils/generateHref'
import Link from 'next/link'
import React from 'react'
import ProductHero from './ProductHero'
import BoxSection from './BoxSection'
import HowToPlay from './HowToPlay'

export default function ProductBlockComponent(props: ProductBlock) {
  const { hero, id, box, faq, play, reviews, roles, toWho } = props

  const faqMedia = faq?.media as Media

  return (
    <section
      className="w-full flex flex-col pt-[68px] md:pt-[130px] relative bg-purpleBackground"
      key={id}
    >
      <ProductHero hero={hero} />

      <div className="divider_section relative z-[2]"></div>

      <BoxSection box={box} />
      <div className="divider_section relative z-[2]"></div>

      {!!play && <HowToPlay play={play} />}
      <div className="divider_section relative z-[2]"></div>

      {!!roles && (
        <SectionWrapper>
          <div className="m-auto content_wrapper flex flex-col gap-6 md:gap-12">
            {!!roles.heading && (
              <GenericHeading
                textShadow={true}
                headingType="h2"
                align="text-center"
                extraClass={`w-full`}
              >
                <RichText data={roles.heading} />
              </GenericHeading>
            )}

            <ul className="w-full grid md:grid-cols-2 gap-8 xl:grid-cols-4">
              {roles.cardsArray?.map((card) => {
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
            {!!roles.orderButton && (
              <GenericButton styleClass="w-full md:w-fit mx-auto">Купи сега</GenericButton>
            )}
          </div>
        </SectionWrapper>
      )}
      <div className="divider_section relative z-[2]"></div>

      <InfoAndImage data={toWho} />

      <div className="divider_section relative z-[2]"></div>

      {!!faq && (
        <SectionWrapper>
          <div className="m-auto content_wrapper">
            <div className="flex flex-col-reverse gap-10 md:flex-row">
              <div className="flex-1 flex justify-center items-center">
                <article className={`flex gap-m flex-col`}>
                  {faq.heading && (
                    <GenericHeading
                      textShadow={true}
                      headingType="h2"
                      align="text-center md:text-left"
                      extraClass={`border-b-[1px] border-primaryYellow pb-3 w-full`}
                    >
                      <RichText data={faq.heading} />
                    </GenericHeading>
                  )}
                  {faq.description && (
                    <GenericParagraph extraClass="text-left">
                      <RichText data={faq.description} />
                    </GenericParagraph>
                  )}
                  {!!faq.links && !!faq.links.length && (
                    <Link
                      aria-label={faq.links[0].link.label}
                      href={generateHref(faq.links[0] as LinkObject)}
                    >
                      <GenericButton styleClass="w-full md:w-fit">
                        {faq.links[0].link.label}
                      </GenericButton>
                    </Link>
                  )}
                </article>
              </div>
              <GenericImage
                src={faqMedia?.url || ''}
                alt={faqMedia?.alt || ''}
                wrapperClassName="w-full max-w-[350px] aspect-square relative rounded-[16px] overflow-hidden"
                fill={true}
                priority={true}
                focalX={faqMedia?.focalX || 50}
                focalY={faqMedia?.focalY || 50}
                imageClassName="w-full h-full object-contain rounded-[16px] overflow-hidden"
                sizes="100vw"
                updatedAt={faqMedia?.updatedAt || ''}
              />
            </div>
          </div>
        </SectionWrapper>
      )}

      <div className="divider_section relative z-[2]"></div>

      {!!reviews && (
        <SectionWrapper>
          <div className="m-auto content_wrapper flex flex-col gap-6 md:gap-12">
            {!!reviews.heading && (
              <GenericHeading
                textShadow={true}
                headingType="h2"
                align="text-center"
                extraClass={`w-full`}
              >
                <RichText data={reviews.heading} />
              </GenericHeading>
            )}

            <ul className="w-full max-w-[710px] flex flex-col gap-m mx-auto">
              {reviews.cardsArray?.map((card) => {
                return (
                  <li
                    key={card.id}
                    className="w-full bg-purpleDark flex flex-col items-center justify-center gap-4 glass shadow-2xl p-5 rounded-[16px] overflow-hidden"
                  >
                    {card?.basicComponent?.description && (
                      <GenericParagraph
                        pType="custom"
                        extraClass="text-[16px] leading-[150%] text-center"
                      >
                        <RichText data={card?.basicComponent?.description} />
                      </GenericParagraph>
                    )}
                    {card?.basicComponent?.heading && (
                      <GenericHeading textShadow={false} headingType="h5" align="text-center">
                        <RichText data={card?.basicComponent?.heading} />
                      </GenericHeading>
                    )}
                  </li>
                )
              })}
            </ul>
          </div>
        </SectionWrapper>
      )}
      <div className="divider_section relative z-[2]"></div>
    </section>
  )
}
