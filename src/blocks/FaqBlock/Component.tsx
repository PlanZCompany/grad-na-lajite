import { RichTextFull } from '@/components/Custom'
import { GenericHeading, GenericParagraph } from '@/components/Generic'
import { SectionWrapper } from '@/components/Wrappers'
import { FaqBlock } from '@/payload-types'
import { RichText } from '@payloadcms/richtext-lexical/react'
import React from 'react'

export const FaqBlockComponent: React.FC<FaqBlock> = (props) => {
  const { heading, cardsArray, id } = props

  const rowsContent = cardsArray?.map((card) => {
    const cardHeading = card?.basicComponentFull?.heading
    const cardDescription = card?.basicComponentFull?.description

    return (
      <li key={card.id} className="flex flex-col gap-6">
        <article className={`flex md:gap-3 flex-col`}>
          {cardHeading && (
            <GenericHeading textShadow={false} headingType="h3" align="text-center">
              <RichText data={cardHeading} />
            </GenericHeading>
          )}
          {cardDescription && (
            <GenericParagraph extraClass="text-left">
              <RichTextFull description={cardDescription} />
            </GenericParagraph>
          )}
        </article>

        <div className="divider_section relative z-[2]"></div>
      </li>
    )
  })

  return (
    <section
      className="w-full flex flex-col pt-[68px] md:pt-[130px] relative bg-purpleBackground"
      key={id}
    >
      <SectionWrapper>
        <div className="m-auto content_wrapper w-full flex flex-col gam-m">
          {heading && (
            <GenericHeading
              textShadow={true}
              headingType="h2"
              align="text-center md:text-left"
              extraClass={`border-b-[1px] border-primaryYellow pb-3 w-full mb-10`}
            >
              <RichText data={heading} />
            </GenericHeading>
          )}

          <ul className="w-full flex flex-col gap-8">{rowsContent}</ul>
        </div>
      </SectionWrapper>
    </section>
  )
}
