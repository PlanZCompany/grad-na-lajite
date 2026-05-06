import type { Block } from 'payload'
export const SimpleDividerBlock: Block = {
  slug: 'simpleDividerBlock',
  interfaceName: 'SimpleDividerBlock',
  fields: [
    {
      name: 'color',
      type: 'text',
      required: false,
      defaultValue: '#d4af37',
    },
  ],
}
