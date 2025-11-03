import {
  lexicalEditor,
  HeadingFeature,
  FixedToolbarFeature,
  InlineToolbarFeature,
} from '@payloadcms/richtext-lexical'
import { Field, RichTextField, UploadField } from 'payload'

export const HeadingConfig = {
  name: 'heading',
  type: 'richText',
  editor: lexicalEditor({
    features: ({ rootFeatures }) => [
      ...rootFeatures,
      HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }),
      FixedToolbarFeature(),
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
    features: ({ rootFeatures }) => [
      ...rootFeatures,
      FixedToolbarFeature(),
      InlineToolbarFeature(),
    ],
  }),
  label: 'Описание на секцията',
  admin: {
    description: 'Моля, придържайте се към конвенцията за описанията.',
  },
} satisfies RichTextField

export const MediaConfig = {
  name: 'media',
  type: 'upload',
  relationTo: 'media',
  required: true,
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
