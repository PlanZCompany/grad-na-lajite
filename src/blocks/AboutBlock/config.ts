import type { Block } from 'payload'
import { DescriptionConfig, HeadingConfig, MediaConfig } from '../Reusable'
import { linkGroup } from '@/fields/linkGroup'

export const AboutBlock: Block = {
  slug: 'aboutBlock',
  interfaceName: 'AboutBlock',
  fields: [
    {
      name: 'hero',
      label: 'Oсновна секция',
      type: 'group',
      fields: [
        HeadingConfig,
        DescriptionConfig,
        MediaConfig,
        linkGroup({
          overrides: {
            maxRows: 1,
          },
        }),
      ],
    },
    {
      name: 'mission',
      type: 'group',
      label: 'Мисия - секция',
      fields: [HeadingConfig, DescriptionConfig, MediaConfig],
    },
    {
      name: 'values',
      type: 'group',
      label: 'Ценности - секция',
      fields: [HeadingConfig, DescriptionConfig, MediaConfig],
    },
  ],
}
