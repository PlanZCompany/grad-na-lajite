import type { Block } from 'payload'
import { HeadingConfig } from '../Reusable'

export const TableBlock: Block = {
  slug: 'tableBlock',
  interfaceName: 'TableBlock',
  fields: [
    HeadingConfig,
    {
      name: 'tableHeadings',
      type: 'array',
      fields: [
        {
          name: 'heading',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'tableRows',
      type: 'array',
      fields: [
        {
          name: 'row',
          type: 'array',
          fields: [
            {
              name: 'cell',
              type: 'text',
              required: true,
            },
          ],
        },
      ],
    },
  ],
}
