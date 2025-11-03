import React from 'react'
import HeadingPlusDescription from '../Generic/HeadingPlusDescription'
import { HomeBlock, Media } from '@/payload-types'
import { GenericImage } from '../Generic'
import { RichText } from '../Custom'

const FlipCardsAndInfo = ({ data }: { data: HomeBlock['whyToChoseUs'] }) => {
  const cardsContent = data?.cardsArray?.map((card) => {
    const media = card?.basicComponent.media as Media

    const { heading, description } = card?.basicComponent

    return (
      <div key={card.id} className="group w-[300px] h-[400px] bg-transparent [perspective:1000px]">
        <div
          className="relative h-full w-full text-center transition-transform duration-700
                         [transform-style:preserve-3d]
                         group-hover:[transform:rotateY(180deg)]"
        >
          {/* FRONT */}
          <div
            className="absolute inset-0 rounded-xl p-4 shadow-[0_0_20px_rgba(0,0,0,0.6)]
                           flex flex-col items-center justify-center
                           [backface-visibility:hidden] [-webkit-backface-visibility:hidden]
                           bg-[rgba(20,10,40,0.85)] text-[#FFD700]"
          >
            <GenericImage
              src={media?.url || ''}
              alt={media?.alt || ''}
              wrapperClassName="mb-2 block w-full h-[280px] rounded-md object-contain relative"
              fill={true}
              imageClassName="w-full h-full object-contain"
            />
            {!!heading && (
              <h3 className="m-0 text-[1.2rem] font-bold heading_text_shadow">
                <RichText data={card?.basicComponent?.heading as any} />
              </h3>
            )}
          </div>

          {/* BACK */}
          <div
            className="absolute inset-0 rounded-xl p-4 shadow-[0_0_20px_rgba(0,0,0,0.6)]
                           flex items-center justify-center text-center
                           [backface-visibility:hidden] [-webkit-backface-visibility:hidden]
                           [transform:rotateY(180deg)]
                           bg-[rgba(0,0,0,0.9)] text-[#f8f6f2] text-base leading-6"
          >
            {!!description && (
              <div className="m-0">
                <RichText data={card?.basicComponent?.description as any} />
              </div>
            )}
          </div>
        </div>
      </div>
    )
  })

  return (
    <section className="w-full flex flex-col gap-m py-10 md:py-20">
      <HeadingPlusDescription heading={data?.heading} description={data?.description} />
      <div className="modes-container mt-8 flex flex-wrap justify-center gap-[30px]">
        {cardsContent}
      </div>
    </section>
  )
}

export default FlipCardsAndInfo
