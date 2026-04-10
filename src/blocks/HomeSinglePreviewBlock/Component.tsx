import type { HomeSinglePreviewBlock } from '@/payload-types'

import { ProductPreview } from '@/components/Sections'

export const HomeSinglePreviewBlockComponent = (props: HomeSinglePreviewBlock) => {
  return <ProductPreview data={props} />
}
