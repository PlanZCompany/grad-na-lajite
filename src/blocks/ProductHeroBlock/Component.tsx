import type { ProductHeroBlock } from '@/payload-types'

import ProductHero from '@/blocks/ProductBlock/ProductHero'

export const ProductHeroBlockComponent = (props: ProductHeroBlock) => {
  return (
    <div className="pt-[68px] md:pt-[130px]">
      <ProductHero hero={props} />
    </div>
  )
}
