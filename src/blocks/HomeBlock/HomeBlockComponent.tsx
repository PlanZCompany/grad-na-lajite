import {
  FlipCardsAndInfo,
  InfoAndImage,
  InfoAndListWithImage,
  ThreeCardsGrid,
} from '@/components/Sections'
import InfoAndGridCards from '@/components/Sections/InfoAndGridCards'
import ProductPreview from '@/components/Sections/ProductPreview'
import { HomeBlock } from '@/payload-types'
import React from 'react'

export const HomeBlockComponent: React.FC<HomeBlock> = (props) => {
  const { whyToChoseUs, historySection, whatIsTheGame, gameRules, gameRules2, singlePreview } =
    props

  return (
    <section className="w-full flex">
      <div className="content_wrapper w-full my-auto">
        <FlipCardsAndInfo data={whyToChoseUs} />
        <InfoAndImage data={historySection} />
        <ThreeCardsGrid data={whatIsTheGame} />
        <InfoAndListWithImage data={gameRules} />
        <InfoAndGridCards data={gameRules2} />
        <ProductPreview data={singlePreview} />
      </div>
    </section>
  )
}
