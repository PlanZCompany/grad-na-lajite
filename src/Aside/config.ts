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
    {
      label: 'AI',
      name: 'ai',
      type: 'group',
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
        {
          name: 'desktopText',
          type: 'text',
          required: true,
        },
        {
          name: 'mobileText',
          type: 'text',
          required: true,
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateAside],
  },
}
