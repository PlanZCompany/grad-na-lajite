import type { ProductBoxBlock } from '@/payload-types'

import BoxSection from '@/blocks/ProductBlock/BoxSection'

export const ProductBoxBlockComponent = (props: ProductBoxBlock) => {
  return <BoxSection box={props} />
}
