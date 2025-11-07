import { GenericHeading, GenericParagraph } from '@/components/Generic'
import { SectionWrapper } from '@/components/Wrappers'
import { ContactBlock } from '@/payload-types'
import { RichText } from '@payloadcms/richtext-lexical/react'
import React from 'react'

export const ContactBlockComponent: React.FC<ContactBlock> = (props) => {
  const { hero, id } = props

  return (
    <section
      className="w-full flex flex-col pt-[68px] md:pt-[130px] relative bg-purpleBackground"
      key={id}
    >
      <SectionWrapper>
        <div className="m-auto content_wrapper">
          <article className={`flex gap-m flex-col`}>
            {hero?.heading && (
              <GenericHeading
                textShadow={true}
                headingType="h2"
                extraClass={`border-b-[1px] border-primaryYellow pb-3 w-full !text-center md:!text-left`}
              >
                <RichText data={hero.heading} />
              </GenericHeading>
            )}

            {hero?.description && (
              <GenericParagraph extraClass="text-center md:text-left">
                <RichText data={hero.description} className="[&_p]:my-2 [&_a]:underline" />
              </GenericParagraph>
            )}
          </article>
        </div>
      </SectionWrapper>
      <div className="divider_section relative z-[2]"></div>
    </section>
  )
}
