import { HomeBlock, Media } from '@/payload-types'
import React from 'react'
import HeadingPlusDescription from '../Generic/HeadingPlusDescription'
import { GenericImage, GenericParagraph } from '../Generic'
import { RichText } from '../Custom'

const InfoAndGridCards = ({ data }: { data: HomeBlock['gameRules2'] }) => {
  const cardsContent = data?.cardsArray?.map((card) => {
    const media = card?.basicComponent?.media as Media

    const heading = card?.basicComponent?.heading
    const description = card?.basicComponent?.description

    return (
      <article
        key={card.id}
        aria-labelledby={`${card.id}-title`}
        className="group rounded-xl border-white/10 bg-[#0a010b]
                 px-4 pt-4 pb-5 shadow-[0_4px_20px_rgba(0,0,0,0.6)] transition
                 hover:shadow-[0_8px_28px_rgba(0,0,0,0.7)] focus-within:outline-none
                 focus-within:ring-2 focus-within:ring-[#d4af37]/60 w-full md:max-w-[260px]
                 hover:translate-y-[-9px] duration-300"
        tabIndex={-1}
      >
        <figure className="flex flex-col items-center text-center">
          <div
            className="relative mb-3 h-[220px] w-full overflow-hidden rounded-[12px]"
            aria-hidden="true"
          >
            <GenericImage
              src={media?.url || ''}
              alt={media?.alt || ''}
              wrapperClassName="absolute inset-0"
              imageClassName="object-contain"
              sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
              fill={true}
            />
          </div>

          <figcaption className="w-full">
            <div id={`${card.id}-title`} className="text-xl font-semibold text-[#FFD700] mb-3">
              <RichText data={heading as any} />
            </div>

            {/* Definition list for structured data */}
            <GenericParagraph>
              <RichText data={description as any} />
            </GenericParagraph>
          </figcaption>
        </figure>
      </article>
    )
  })

  return (
    <section className="w-full py-10 md:py-20 flex">
      <div className="w-full content_wrapper flex flex-col gap-10">
        <HeadingPlusDescription heading={data?.heading} description={data?.description} />
        <div className="flex gap-8 flex-wrap justify-center items-center">{cardsContent}</div>
      </div>
    </section>
  )
}

export default InfoAndGridCards
