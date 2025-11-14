import { HomeBlock, Media } from '@/payload-types'
import React from 'react'
import { RichText } from '../Custom'
import { GenericHeading, GenericParagraph, GenericImage, GenericButton } from '../Generic'
import { SectionWrapper } from '../Wrappers'
import Link from 'next/link'
import { generateHref, LinkObject } from '@/utils/generateHref'

const InfoImageWithBackground = ({ data }: { data: HomeBlock['sh'] }) => {
  const media = data?.media as Media

  return (
    <SectionWrapper>
      <div className="w-full content_wrapper bg-[#d4af37] border-[#D4AF37] border-[4px] relative rounded-[16px] overflow-hidden py-6 md:py-10 border-">
        <div className={`flex flex-col-reverse gap-10 xl:flex-row`}>
          <div className="flex-1 flex justify-center items-center">
            <article
              className={`flex gap-m flex-col max-w-[90%] mx-auto md:mx-[unset] md:max-w-[unset]`}
            >
              {data?.heading && (
                <GenericHeading
                  textShadow={true}
                  headingType="h2"
                  align="text-center md:text-left"
                  extraClass={`w-full blog_headings`}
                  textColor="text-[#4B0082]"
                >
                  <RichText data={data.heading} />
                </GenericHeading>
              )}
              {data?.description && (
                <GenericParagraph extraClass="text-center md:text-left" textColor="text-black">
                  <RichText data={data.description} />
                </GenericParagraph>
              )}
              {!!data && !!data.links?.length && (
                <div className="w-full md:w-fit">
                  <Link href={generateHref(data?.links[0] as LinkObject)}>
                    <GenericButton styleClass="w-full min-w-[200px]" variant="colored">
                      {data.links?.[0]?.link?.label || 'Прочети повече'}
                    </GenericButton>
                  </Link>
                </div>
              )}
            </article>
          </div>
          <div className="flex-1 flex justify-center items-center">
            <GenericImage
              src={media?.url || ''}
              alt={media?.alt || ''}
              wrapperClassName="w-full max-w-[350px] mx-auto xl:mx-[unset] aspect-square relative rounded-[16px] overflow-hidden"
              fill={true}
              priority={true}
              focalX={media?.focalX || 50}
              focalY={media?.focalY || 50}
              imageClassName="w-full h-full object-cover rounded-[16px] overflow-hidden"
              sizes="100vw"
              updatedAt={media?.updatedAt || ''}
            />
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}

export default InfoImageWithBackground
