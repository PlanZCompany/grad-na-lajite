'use client'

import { Blog, Media } from '@/payload-types'
import React from 'react'
import { GenericHeading, GenericImage, GenericParagraph } from '../Generic'
import { RichText } from '../Custom'
import Link from 'next/link'
import { SectionWrapper } from '../Wrappers'

const GridBlog = ({ data }: { data: Blog[] }) => {
  const cardsContent = data?.map((card) => {
    const media = (card?.media as Media) ?? undefined

    const heading = card?.heading
    const description = card?.description

    return (
      <div key={card.id} className="w-full px-2 md:px-4">
        <Link
          href={`/blog/${card?.slug}`}
          onClick={() => {
            const target = document.querySelector('.REF_CLOSE_SEARCH') as HTMLButtonElement

            if (target) {
              target.click()
            }
          }}
        >
          <article
            className={`w-full bg-[rgba(20,10,40,0.85)] shadow-[0_0_20px_rgba(0,0,0,0.6)] md:h-[480px] flex flex-col
            hover:translate-y-[-9px] duration-300 transition-transform rounded-[12px] overflow-hidden`}
          >
            {!!media && (
              <div className="w-full h-[230px] relative">
                <GenericImage
                  src={media?.url || ''}
                  alt={media?.alt || ''}
                  wrapperClassName="absolute inset-0 "
                  imageClassName="object-cover w-full h-full"
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  priority={false}
                  fill={true}
                  updatedAt={media?.updatedAt}
                />
              </div>
            )}

            <div className="w-full flex flex-col p-4 gap-3 mb-6 md:mb-[unset]">
              {heading && (
                <GenericHeading
                  textShadow={true}
                  headingType="h4"
                  align="text-left"
                  extraClass="line-clamp-3"
                >
                  <RichText data={heading} />
                </GenericHeading>
              )}
              {description && (
                <GenericParagraph
                  pType="custom"
                  extraClass="text-[16px] leading-[150%] line-clamp-4"
                >
                  <RichText data={description} />
                </GenericParagraph>
              )}
            </div>

            <div className="w-full px-3 mt-auto pb-3">
              <GenericParagraph
                pType="custom"
                extraClass="text-[16px] leading-[120%] font-bold hover:text-white transition-colors duration-300 ease-in-out"
                textColor="text-primaryYellow"
              >
                Прочети повече →
              </GenericParagraph>
            </div>
          </article>
        </Link>
      </div>
    )
  })

  return (
    <SectionWrapper>
      <div className="w-full content_wrapper">
        <ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">{cardsContent}</ul>
      </div>
    </SectionWrapper>
  )
}

export default GridBlog
