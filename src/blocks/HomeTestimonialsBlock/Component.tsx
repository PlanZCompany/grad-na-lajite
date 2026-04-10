import type { HomeTestimonialsBlock } from '@/payload-types'

import { Testimonials } from '@/components/Sections'

export const HomeTestimonialsBlockComponent = (props: HomeTestimonialsBlock) => {
  return <Testimonials data={props} />
}
