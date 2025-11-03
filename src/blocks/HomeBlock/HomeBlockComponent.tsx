import { RichText } from '@/components/Custom'
import { FlipCardsAndInfo } from '@/components/Sections'
import { HomeBlock } from '@/payload-types'
import React from 'react'

export const HomeBlockComponent: React.FC<HomeBlock> = (props) => {
  const { whyToChoseUs } = props

  return (
    <section className="w-full flex">
      <div className="content_wrapper w-full my-auto">
        <FlipCardsAndInfo data={whyToChoseUs} />
      </div>
    </section>
  )
}
