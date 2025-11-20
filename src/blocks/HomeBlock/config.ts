import type { Block } from 'payload'

import {
  lexicalEditor,
  HeadingFeature,
  FixedToolbarFeature,
  InlineToolbarFeature,
  OrderedListFeature,
  UnorderedListFeature,
} from '@payloadcms/richtext-lexical'
import { LEXICAL_H2_DEFAULT, LEXICAL_PARAGRAPH } from '../Reusable'
import { linkGroup } from '@/fields/linkGroup'

export const HomeBlock: Block = {
  slug: 'homeBlock',
  interfaceName: 'HomeBlock',
  fields: [
    {
      name: 'sh',
      label: 'Допълнителна секция (Preview)',
      type: 'group',
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
    },
    {
      name: 'whyToChoseUs',
      label: 'Защо да изберете нас',
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
    },
    {
      name: 'historySection',
      label: 'История',
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
    },
    {
      name: 'whatIsTheGame',
      label: 'Какво е играта',
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
    },
    {
      name: 'gameRules',
      label: 'Правила',
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
        {
          name: 'media',
          type: 'upload',
          relationTo: 'media',
          required: false,
          maxDepth: 2,
        },
      ],
    },
    {
      name: 'gameRules2',
      label: 'Правила Втора секция',
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
    },
    {
      name: 'singlePreview',
      label: 'Продукт - Preview',
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
      ],
    },
    {
      name: 'galleryPreview',
      label: 'Галерия - Preview',
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
          name: 'mediaArray',
          type: 'array',
          label: 'Медии',
          defaultValue: [],
          fields: [
            {
              name: 'media',
              type: 'upload',
              relationTo: 'media',
              required: false,
              maxDepth: 2,
            },
            {
              name: 'externalVideo',
              type: 'text',
              required: false,
              label: 'Връзка към вънщен източник',
            },
          ],
        },
      ],
    },
    {
      name: 'histories',
      label: 'Истории',
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
    },
    {
      name: 'partners',
      type: 'group',
      defaultValue: {},
      label: 'Партньори - секция',
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
              name: 'media',
              type: 'upload',
              relationTo: 'media',
              required: false,
              maxDepth: 2,
            },
            {
              name: 'url',
              type: 'text',
              label: 'Връзка',
            },
          ],
        },
      ],
    },
    {
      name: 'testimonials',
      label: 'Мнения на потребители',
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
    },
  ],
}
