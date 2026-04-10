import type { HomeShBlock } from '@/payload-types'

import { InfoImageWithBackground } from '@/components/Sections'

export const HomeShBlockComponent = (props: HomeShBlock) => {
  return <InfoImageWithBackground data={props} />
}
