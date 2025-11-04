import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { MediaConfig } from '@/blocks/Reusable'

export const Aside: GlobalConfig = {
  slug: 'aside',
  access: {
    read: () => true,
  },
  fields: [
    {
      label: 'Връзки',
      name: 'links',
      type: 'array',
      fields: [
        link({
          appearances: false,
        }),
        MediaConfig,
      ],
    },
  ],
}
