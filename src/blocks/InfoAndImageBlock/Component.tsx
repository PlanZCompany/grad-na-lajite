import { GenericHeading, GenericImage, GenericParagraph } from '@/components/Generic'
import { InfoAndImageBlock, Media } from '@/payload-types'
import { RichText } from '@payloadcms/richtext-lexical/react'
import React from 'react'

export const InfoAndImageBlockComponent: React.FC<InfoAndImageBlock> = (props) => {
  const faqMedia = props.media as Media

  const isReversed = props.reverse

  return (
    <section className="w-full py-6 md:py-10 flex relative z-[2]">
      <div className="m-auto">
        <div
          className={`flex flex-col-reverse gap-10 ${isReversed ? 'xl:flex-row-reverse' : 'xl:flex-row'}`}
        >
          <div className="flex-1 flex justify-center items-center">
            <article className={`flex gap-m flex-col`}>
              {props.heading && (
                <GenericHeading
                  textShadow={false}
                  headingType="h2"
                  align="text-center md:text-left"
                  extraClass={`w-full`}
                  textColor="text-[#2d2d2d]"
                >
                  <RichText data={props.heading} />
                </GenericHeading>
              )}
              {props.description && (
                <GenericParagraph extraClass="text-left" textColor="text-black">
                  <RichText data={props.description} />
                </GenericParagraph>
              )}
            </article>
          </div>
          <GenericImage
            src={faqMedia?.url || ''}
            alt={faqMedia?.alt || ''}
            wrapperClassName="w-full max-w-[350px] max-h-[350px] mx-auto xl:mx-[unset] aspect-square relative rounded-[16px] overflow-hidden"
            fill={true}
            priority={true}
            focalX={faqMedia?.focalX || 50}
            focalY={faqMedia?.focalY || 50}
            imageClassName="w-full h-full object-cover rounded-[16px] overflow-hidden"
            sizes="100vw"
            updatedAt={faqMedia?.updatedAt || ''}
          />
        </div>
      </div>
    </section>
  )
}
