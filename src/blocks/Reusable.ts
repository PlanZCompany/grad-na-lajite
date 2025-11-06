import {
  lexicalEditor,
  HeadingFeature,
  FixedToolbarFeature,
  InlineToolbarFeature,
  UnorderedListFeature,
  OrderedListFeature,
  BoldFeature,
  ItalicFeature,
  UnderlineFeature,
  LinkFeature,
  ParagraphFeature,
} from '@payloadcms/richtext-lexical'
import { Field, RichTextField, UploadField } from 'payload'

export const HeadingConfig = {
  name: 'heading',
  type: 'richText',
  editor: lexicalEditor({
    features: () => [
      ParagraphFeature(),
      BoldFeature(),
      HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }),
      FixedToolbarFeature(),
      ItalicFeature(),
      UnderlineFeature(),
      LinkFeature(),
      InlineToolbarFeature(),
    ],
  }),
  label: 'Заглавие на секцията',
  admin: {
    description: 'Моля, придържайте се към конвенцията за заглавията. (2 или 3 разделени редове)',
  },
} satisfies RichTextField

export const DescriptionConfig = {
  name: 'description',
  type: 'richText',
  editor: lexicalEditor({
    features: () => [
      ParagraphFeature(),
      BoldFeature(),
      HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }),
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
} satisfies RichTextField

export const DescriptionFullRichTextConfig = {
  name: 'description',
  type: 'richText',
  editor: lexicalEditor({
    features: () => [
      ParagraphFeature(),
      BoldFeature(),
      HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }),
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
} satisfies RichTextField

export const MediaConfig = {
  name: 'media',
  type: 'upload',
  relationTo: 'media',
  required: false,
  maxDepth: 2,
} satisfies UploadField

export const mediaMobileConfig = {
  name: 'mediaMobile',
  type: 'upload',
  maxDepth: 2,
  relationTo: 'media',
  required: false,
}

export const BasicComponentConfig = {
  name: 'basicComponent',
  type: 'group',
  fields: [HeadingConfig, DescriptionConfig, MediaConfig],
  label: 'Базов компонент (заглавие, описание и медия)',
} satisfies Field

export const BasicComponentsArray = {
  name: 'cardsArray',
  type: 'array',
  label: 'Базов компонент (заглавие, описание и медия)',
  fields: [BasicComponentConfig],
} satisfies Field

export const OrderButtonCheckField = {
  name: 'orderButton',
  type: 'checkbox',
  label: 'Показване на бутон за поръчка',
  defaultValue: false,
} satisfies Field
