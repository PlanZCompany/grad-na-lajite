'use client'

import React, { useState } from 'react'
import HeadingPlusDescription from '../Generic/HeadingPlusDescription'
import type { HomeBlock, Media } from '@/payload-types'
import { GenericImage } from '../Generic'
import { RichText } from '../Custom'

const FlipCardsAndInfo = ({ data }: { data: HomeBlock['whyToChoseUs'] }) => {
  const [flippedCardIds, setFlippedCardIds] = useState<Set<string>>(() => new Set())

  const toggleCard = (cardId: string) => {
    setFlippedCardIds((currentIds) => {
      const nextIds = new Set(currentIds)

      if (nextIds.has(cardId)) {
        nextIds.delete(cardId)
      } else {
        nextIds.add(cardId)
      }

      return nextIds
    })
  }

  const cardsContent = data?.cardsArray?.map((card, index) => {
    const media = (card?.basicComponent?.media as Media) ?? {}

    const heading = card?.basicComponent?.heading
    const description = card?.basicComponent?.description

    const cardId = String(card.id ?? index)
    const isFlipped = flippedCardIds.has(cardId)

    return (
      <div
        key={cardId}
        className={`flip-card group w-[300px] h-[400px] bg-transparent ${isFlipped ? 'is-flipped' : ''}`}
      >
        <div
          className="flip-card__surface"
          role="button"
          tabIndex={0}
          aria-pressed={isFlipped}
          aria-label="Show more information"
          onClick={(event) => {
            const clickedInteractiveElement = (event.target as HTMLElement).closest(
              'a, button, input, textarea, select, summary',
            )

            if (!clickedInteractiveElement) {
              toggleCard(cardId)
            }
          }}
          onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault()
              toggleCard(cardId)
            }
          }}
        >
          <div className="flip-card__inner relative h-full w-full text-center transition-transform duration-700">
            {/* FRONT */}
            <div
              className="flip-card__face flip-card__face--front absolute inset-0 rounded-xl p-4 shadow-[0_0_20px_rgba(0,0,0,0.6)]
                           flex flex-col items-center justify-center
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
              className="flip-card__face flip-card__face--back absolute inset-0 rounded-xl p-4 shadow-[0_0_20px_rgba(0,0,0,0.6)]
                           flex items-center justify-center text-center
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
      </div>
    )
  })

  return (
    <section className="w-full flex flex-col gap-m py-10 md:py-20">
      <div className="content_wrapper flex flex-col gap-m">
        <HeadingPlusDescription heading={data?.heading} description={data?.description} />
        <div className="modes-container mt-8 flex flex-wrap justify-center gap-[30px]">
          {cardsContent}
        </div>
      </div>
    </section>
  )
}

export default FlipCardsAndInfo
