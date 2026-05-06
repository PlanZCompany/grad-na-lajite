import type { Block } from 'payload'
import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const ProductReviewsBlock: Block = {
  slug: 'productReviewsBlock',
  interfaceName: 'ProductReviewsBlock',
  labels: {
    singular: 'Product Reviews',
    plural: 'Product Reviews Blocks',
  },
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
      name: 'cardsArray',
      type: 'array',
      label: 'Базов компонент (заглавие, описание и медия)',
      fields: [
        {
          name: 'basicComponent',
          type: 'group',
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
              name: 'description',
              type: 'richText',
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
    {
      name: 'orderButton',
      type: 'checkbox',
      label: 'Показване на бутон за поръчка',
      defaultValue: false,
    },
  ],
}
