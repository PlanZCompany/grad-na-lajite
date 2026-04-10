import type { HomeGalleryPreviewBlock } from '@/payload-types'

import { GalleryPreview } from '@/components/Sections'

export const HomeGalleryPreviewBlockComponent = (props: HomeGalleryPreviewBlock) => {
  return <GalleryPreview data={props} />
}
