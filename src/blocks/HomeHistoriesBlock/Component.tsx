import type { HomeHistoriesBlock } from '@/payload-types'

import { GridCardsAndHeading } from '@/components/Sections'

export const HomeHistoriesBlockComponent = (props: HomeHistoriesBlock) => {
  return <GridCardsAndHeading data={props} />
}
