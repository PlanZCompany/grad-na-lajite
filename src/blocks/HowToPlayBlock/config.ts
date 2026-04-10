import type { Block } from 'payload'
import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const HowToPlayBlock: Block = {
  slug: 'howToPlayBlock',
  interfaceName: 'HowToPlayBlock',
  labels: {
    singular: 'How To Play',
    plural: 'How To Play Blocks',
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
    {
      name: 'pdf',
      type: 'group',
      fields: [
        {
          name: 'pdfFile',
          label: 'PDF file',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'button',
          label: 'Текст на бутон',
          type: 'text',
          required: true,
          defaultValue: 'ИЗТЕГЛИ ПЪЛНИТЕ ПРАВИЛА',
        },
        {
          name: 'url',
          label: 'URL',
          type: 'text',
          required: true,
          defaultValue: '/upatvane',
        },
      ],
    },
  ],
}
