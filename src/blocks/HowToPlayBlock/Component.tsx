import type { HowToPlayBlock } from '@/payload-types'

import HowToPlay from '@/blocks/ProductBlock/HowToPlay'

export const HowToPlayBlockComponent = (props: HowToPlayBlock) => {
  return <HowToPlay play={props} />
}
