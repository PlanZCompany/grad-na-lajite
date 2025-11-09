import { RichTextFull } from '@/components/Custom'
import { GenericHeading, GenericParagraph } from '@/components/Generic'
import { SectionWrapper } from '@/components/Wrappers'
import { RegulatoryBlock } from '@/payload-types'
import { RichText } from '@payloadcms/richtext-lexical/react'
import React from 'react'

export const RegulatoryBlockComponent: React.FC<RegulatoryBlock> = (props) => {
  const { heading, description, id, shortDescription } = props

  const headingRichTextClassName = `[&_h2]:mb-4 [&_h2]:text-primaryYellow [&_h2]:text-[28px] [&_h2]:sm:text-[28px] [&_h2]:md:text-[32px] [&_h2]:xl:text-[32px] [&_h2]:2xl:text-[32px] [&_h2]:leading-[120%] [&_h2]:md:leading-[120%] [&_h2]:relative [&_h2]:before:absolute [&_h2]:before:w-[100%] [&_h2]:before:mx-auto [&_h2]:before:content-[""] [&_h2]:before:left-0 [&_h2]:before:left-0 [&_h2]:before:h-[2px] [&_h2]:before:-left-[50px] [&_h2]:before:top-1/2 [&_h2]:before:translate-y-[-48px] [&_h2]:mt-[64px] [&_h2]:before:bg-gradient-to-r [&_h2]:before:from-transparent [&_h2]:before:via-primaryYellow [&_h2]:before:to-transparent [&_h2]:before:z-[1]`
  const paragraphRichTextClassName = `[&_p]:text-white [&_p]:text-[16px] [&_p]:sm:text-[16px] [&_p]:md:text-[18px] [&_p]:xl:text-[18px] [&_p]:2xl:text-[18px] [&_p]:leading-[150%] [&_p]:md:leading-[150%]`

  return (
    <section
      className="w-full flex flex-col pt-[68px] md:pt-[130px] relative bg-purpleBackground"
      key={id}
    >
      <SectionWrapper>
        <div className="m-auto content_wrapper w-full flex flex-col gam-m">
          <div className="flex flex-col gap-s">
            {heading && (
              <GenericHeading
                textShadow={true}
                headingType="h2"
                align="text-center md:text-left"
                extraClass={``}
              >
                <RichText data={heading} />
              </GenericHeading>
            )}
            {shortDescription && (
              <GenericParagraph extraClass="text-left">
                <RichText data={shortDescription} />
              </GenericParagraph>
            )}
          </div>

          <div className="w-full">
            {description && (
              <RichTextFull
                description={description}
                className={`${headingRichTextClassName} ${paragraphRichTextClassName}`}
              />
            )}
          </div>
        </div>
      </SectionWrapper>
    </section>
  )
}
