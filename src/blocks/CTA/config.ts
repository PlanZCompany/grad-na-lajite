import { linkGroup } from '@/fields/linkGroup'
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
    linkGroup({
      overrides: {
        maxRows: 1,
      },
    }),
  ],
}
