import type { Block } from 'payload'
import {
  lexicalEditor,
  HeadingFeature,
  FixedToolbarFeature,
  InlineToolbarFeature,
} from '@payloadcms/richtext-lexical'

import { LEXICAL_H2_DEFAULT, LEXICAL_PARAGRAPH } from '@/blocks/Reusable'
import { linkGroup } from '@/fields/linkGroup'

export const HomeShBlock: Block = {
  slug: 'homeShBlock',
  interfaceName: 'HomeShBlock',
  fields: [
    {
      name: 'heading',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => [
          ...rootFeatures,
          HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4', 'h5', 'h6'] }),
          FixedToolbarFeature(),
        ],
      }),
      defaultValue: LEXICAL_H2_DEFAULT,
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
    linkGroup({
      overrides: {
        maxRows: 1,
      },
    }),
    {
      name: 'media',
      type: 'upload',
      relationTo: 'media',
      required: false,
      maxDepth: 2,
    },
  ],
}
