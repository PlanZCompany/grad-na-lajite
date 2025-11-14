import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'

import { revalidateAside } from './hooks/revalidateAside'

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
        {
          name: 'media',
          type: 'upload',
          relationTo: 'media',
          required: false,
          maxDepth: 2,
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateAside],
  },
}
