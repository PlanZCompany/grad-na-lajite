import type { HomeWhyToChoseUsBlock } from '@/payload-types'

import { FlipCardsAndInfo } from '@/components/Sections'

export const HomeWhyToChoseUsBlockComponent = (props: HomeWhyToChoseUsBlock) => {
  return <FlipCardsAndInfo data={props} />
}
