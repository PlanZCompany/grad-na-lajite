import { GenericHeading, GenericImage, GenericParagraph } from '@/components/Generic'
import { SectionWrapper } from '@/components/Wrappers'
import { InfoAndImageBlock, Media } from '@/payload-types'
import { RichText } from '@payloadcms/richtext-lexical/react'
import React from 'react'

export const InfoAndImageBlockComponent: React.FC<InfoAndImageBlock> = (props) => {
  const faqMedia = props.media as Media

  const isReversed = props.reverse

  return (
    <SectionWrapper>
      <div className="m-auto content_wrapper">
        <div
          className={`flex flex-col-reverse gap-10 ${isReversed ? 'md:flex-row-reverse' : 'md:flex-row'}`}
        >
          <div className="flex-1 flex justify-center items-center">
            <article className={`flex gap-m flex-col`}>
              {props.heading && (
                <GenericHeading
                  textShadow={true}
                  headingType="h2"
                  align="text-center md:text-left"
                  extraClass={`w-full blog_headings`}
                  textColor="text-[#4B0082]"
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
  )
}
