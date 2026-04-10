import type { HomePartnersBlock } from '@/payload-types'

import { Partners } from '@/components/Sections'

export const HomePartnersBlockComponent = (props: HomePartnersBlock) => {
  return <Partners data={props} />
}
