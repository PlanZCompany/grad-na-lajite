import type { Block } from 'payload'

export const CTABlock: Block = {
  slug: 'cta',
  interfaceName: 'CTABlock',
  labels: {
    singular: 'CTA',
    plural: 'CTA Blocks',
  },
  fields: [
    {
      name: 'content',
      type: 'textarea',
      label: 'Text',
      required: true,
    },
    {
      name: 'buttonText',
      type: 'text',
      label: 'Button text',
      required: true,
    },
    {
      name: 'buttonLink',
      type: 'relationship',
      label: 'Internal link',
      relationTo: 'pages',
      required: true,
      hasMany: false,
    },
  ],
}
