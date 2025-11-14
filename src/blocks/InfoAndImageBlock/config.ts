import type { Block } from 'payload'
import {
  lexicalEditor,
  HeadingFeature,
  FixedToolbarFeature,
  InlineToolbarFeature,
  OrderedListFeature,
  UnorderedListFeature,
} from '@payloadcms/richtext-lexical'

export const InfoAndImageBlock: Block = {
  slug: 'infoAndImageBlock',
  interfaceName: 'InfoAndImageBlock',
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
          UnorderedListFeature(),
          OrderedListFeature(),
        ],
      }),
      label: 'Описание на секцията',
      admin: {
        description: 'Включа пълна свобода в richtext полето.',
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
      name: 'reverse',
      type: 'checkbox',
      defaultValue: false,
      label: 'Разменяне на местата на снимата и текста',
    },
  ],
}
