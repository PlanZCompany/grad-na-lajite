import { RichText } from '@/components/Custom'
import { GenericHeading, GenericImage, GenericParagraph } from '@/components/Generic'
import { SectionWrapper } from '@/components/Wrappers'
import type { Media, ValuesBlock } from '@/payload-types'

export const ValuesBlockComponent = (props: ValuesBlock) => {
  const valuesMedia = props.media as Media

  return (
    <SectionWrapper>
      <div className="m-auto content_wrapper">
        <div className="flex flex-col gap-10 md:flex-row-reverse">
          <div className="flex-1 flex justify-center items-center">
            <article className="flex gap-s flex-col">
              {props.heading && (
                <GenericHeading
                  textShadow={true}
                  headingType="h2"
                  align="text-center md:text-left"
                  extraClass="border-b-[1px] border-primaryYellow pb-3 w-full"
                >
                  <RichText data={props.heading} />
                </GenericHeading>
              )}
              {props.description && (
                <GenericParagraph extraClass="text-center md:text-left">
                  <RichText data={props.description} />
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
  )
}
