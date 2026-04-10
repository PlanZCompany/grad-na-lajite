import { RichTextFull, RichText } from '@/components/Custom'
import { GenericButton, GenericHeading, GenericImage, GenericParagraph } from '@/components/Generic'
import { SectionWrapper } from '@/components/Wrappers'
import type { AboutHeroBlock, Media } from '@/payload-types'
import { generateHref, LinkObject } from '@/utils/generateHref'
import Link from 'next/link'

export const AboutHeroBlockComponent = (props: AboutHeroBlock) => {
  const heroMedia = props.media as Media

  return (
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
          <div className="flex-1">
            <article className="flex gap-s flex-col">
              {props.heading && (
                <GenericHeading
                  textShadow={true}
                  headingType="h2"
                  extraClass="border-b-[1px] border-primaryYellow pb-3 w-full !text-center md:!text-left"
                >
                  <RichText data={props.heading} />
                </GenericHeading>
              )}
              {props.description && (
                <GenericParagraph extraClass="text-center md:text-left">
                  <RichTextFull description={props.description} />
                </GenericParagraph>
              )}
            </article>

            {!!props.links?.length && (
              <div className="mt-6 md:mt-10 w-full md:w-fit">
                <Link href={generateHref(props.links[0] as LinkObject)}>
                  <GenericButton styleClass="w-full">
                    {props.links?.[0]?.link?.label || 'Прочети повече'}
                  </GenericButton>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}
