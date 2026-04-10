import type { HomeGameRules2Block } from '@/payload-types'

import { InfoAndGridCards } from '@/components/Sections'

export const HomeGameRules2BlockComponent = (props: HomeGameRules2Block) => {
  return <InfoAndGridCards data={props} />
}
