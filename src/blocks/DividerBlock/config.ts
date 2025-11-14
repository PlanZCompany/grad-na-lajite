import type { Block } from 'payload'
export const DividerBlock: Block = {
  slug: 'dividerBlock',
  interfaceName: 'DividerBlock',
  fields: [
    {
      name: 'media',
      type: 'upload',
      relationTo: 'media',
      required: false,
      maxDepth: 2,
    },
  ],
}
