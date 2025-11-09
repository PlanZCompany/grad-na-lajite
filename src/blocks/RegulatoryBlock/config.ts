import type { Block } from 'payload'
import { HeadingConfig } from '../Reusable'
import {
  lexicalEditor,
  ParagraphFeature,
  BoldFeature,
  HeadingFeature,
  ItalicFeature,
  UnderlineFeature,
  LinkFeature,
  FixedToolbarFeature,
  InlineToolbarFeature,
  UnorderedListFeature,
  OrderedListFeature,
} from '@payloadcms/richtext-lexical'

export const RegulatoryBlock: Block = {
  slug: 'regulatoryBlock',
  interfaceName: 'RegulatoryBlock',
  fields: [
    HeadingConfig,
    {
      name: 'shortDescription',
      type: 'richText',
      editor: lexicalEditor({
        features: () => [
          ParagraphFeature(),
          BoldFeature(),
          ItalicFeature(),
          UnderlineFeature(),
          LinkFeature(),
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
      name: 'description',
      type: 'richText',
      editor: lexicalEditor({
        features: () => [
          ParagraphFeature(),
          BoldFeature(),
          HeadingFeature({ enabledHeadingSizes: ['h2'] }),
          ItalicFeature(),
          UnderlineFeature(),
          LinkFeature(),
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
  ],
}
