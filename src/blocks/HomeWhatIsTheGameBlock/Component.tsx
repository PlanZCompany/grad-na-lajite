import type { HomeWhatIsTheGameBlock } from '@/payload-types'

import { ThreeCardsGrid } from '@/components/Sections'

export const HomeWhatIsTheGameBlockComponent = (props: HomeWhatIsTheGameBlock) => {
  return <ThreeCardsGrid data={props} />
}
