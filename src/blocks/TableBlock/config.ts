import { lexicalEditor, HeadingFeature, FixedToolbarFeature } from '@payloadcms/richtext-lexical'
import type { Block } from 'payload'

export const TableBlock: Block = {
  slug: 'tableBlock',
  interfaceName: 'TableBlock',
  fields: [
    {
      name: 'heading',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => [
          ...rootFeatures,
          HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }),
          FixedToolbarFeature(),
        ],
      }),
      label: 'Заглавие на секцията',
      admin: {
        description:
          'Моля, придържайте се към конвенцията за заглавията. (2 или 3 разделени редове)',
      },
    },
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
