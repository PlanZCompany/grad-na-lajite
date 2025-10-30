import type { Block } from 'payload'

export const MediaBlock: Block = {
  slug: 'mediaBlock',
  interfaceName: 'MediaBlock',
  fields: [
    {
      name: 'media',
      type: 'upload',
      maxDepth: 2,
      relationTo: 'media',
      required: true,
      label: 'Медиа',
    },
  ],
}
