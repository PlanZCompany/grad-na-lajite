import type { Block } from 'payload'
import {
  lexicalEditor,
  HeadingFeature,
  FixedToolbarFeature,
  InlineToolbarFeature,
} from '@payloadcms/richtext-lexical'

import { LEXICAL_H2_DEFAULT, LEXICAL_PARAGRAPH } from '@/blocks/Reusable'

export const HomeHistoriesBlock: Block = {
  slug: 'homeHistoriesBlock',
  interfaceName: 'HomeHistoriesBlock',
  fields: [
    {
      name: 'heading',
      type: 'richText',
      defaultValue: LEXICAL_H2_DEFAULT,
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
      name: 'cardsArray',
      defaultValue: [],
      type: 'array',
      label: 'Базов компонент (заглавие, описание и медия)',
      fields: [
        {
          name: 'basicComponent',
          type: 'group',
          defaultValue: {},
          fields: [
            {
              name: 'heading',
              type: 'richText',
              defaultValue: LEXICAL_H2_DEFAULT,
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
              name: 'description',
              type: 'richText',
              defaultValue: LEXICAL_PARAGRAPH,
              editor: lexicalEditor({
                features: ({ rootFeatures }) => [
                  ...rootFeatures,
                  HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }),
                  FixedToolbarFeature(),
                  InlineToolbarFeature(),
                ],
              }),
              label: 'Описание на секцията',
              admin: {
                description: 'Моля, придържайте се към конвенцията за описанията.',
              },
            },
            {
              name: 'media',
              type: 'upload',
              relationTo: 'media',
              required: false,
              maxDepth: 2,
            },
          ],
          label: 'Базов компонент (заглавие, описание и медия)',
        },
      ],
    },
  ],
}
