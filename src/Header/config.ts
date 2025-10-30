import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { revalidateHeader } from './hooks/revalidateHeader'

export const Header: GlobalConfig = {
  slug: 'header',
  access: {
    read: () => true,
  },
  fields: [
    {
      label: 'Категориини Линкове',
      name: 'categoryItems',
      type: 'array',
      fields: [
        link({
          appearances: false,
        }),
        {
          name: 'children',
          label: 'Под Kатегории',
          type: 'array',
          fields: [link({ appearances: false })],
        },
        {
          name: 'media',
          type: 'upload',
          maxDepth: 2,
          relationTo: 'media',
          required: false,
        },
      ],
      admin: {
        components: {
          RowLabel: '@/Header/RowLabel#RowLabel',
        },
      },
    },
    {
      name: 'logo',
      type: 'upload',
      maxDepth: 2,
      relationTo: 'media',
      required: true,
      label: 'Лого',
    },
  ],
  hooks: {
    afterChange: [revalidateHeader],
  },
}
