import type { Block } from 'payload'
import {
  lexicalEditor,
  HeadingFeature,
  FixedToolbarFeature,
  InlineToolbarFeature,
} from '@payloadcms/richtext-lexical'

import { LEXICAL_H2_DEFAULT } from '@/blocks/Reusable'

export const HomeSinglePreviewBlock: Block = {
  slug: 'homeSinglePreviewBlock',
  interfaceName: 'HomeSinglePreviewBlock',
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
    {
      name: 'price',
      label: 'Цена',
      type: 'text',
    },
    {
      name: 'buttonText',
      label: 'Текст на бутон',
      type: 'text',
    },
  ],
}
