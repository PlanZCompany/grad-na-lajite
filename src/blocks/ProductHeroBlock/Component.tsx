import type { ProductHeroBlock } from '@/payload-types'

import ProductHero from '@/blocks/ProductBlock/ProductHero'

export const ProductHeroBlockComponent = (props: ProductHeroBlock) => {
  return <ProductHero hero={props} />
}
