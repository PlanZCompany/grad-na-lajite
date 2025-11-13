import type { Block } from 'payload'
import { MediaConfig } from '../Reusable'
import {
  lexicalEditor,
  HeadingFeature,
  FixedToolbarFeature,
  InlineToolbarFeature,
  OrderedListFeature,
  UnorderedListFeature,
} from '@payloadcms/richtext-lexical'

export const HomeBlock: Block = {
  slug: 'homeBlock',
  interfaceName: 'HomeBlock',
  fields: [
    {
      name: 'whyToChoseUs',
      label: 'Защо да изберете нас',
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
                MediaConfig,
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
        MediaConfig,
      ],
    },
    {
      name: 'whatIsTheGame',
      label: 'Какво е играта',
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
                MediaConfig,
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
                MediaConfig,
              ],
              label: 'Базов компонент (заглавие, описание и медия)',
            },
          ],
        },
        MediaConfig,
      ],
    },
    {
      name: 'gameRules2',
      label: 'Правила Втора секция',
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
                MediaConfig,
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
        MediaConfig,
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
          name: 'mediaArray',
          type: 'array',
          label: 'Медии',
          fields: [MediaConfig],
        },
      ],
    },
    {
      name: 'histories',
      label: 'Истории',
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
                MediaConfig,
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
      label: 'Партньори - секция',
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
            MediaConfig,
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
                MediaConfig,
              ],
              label: 'Базов компонент (заглавие, описание и медия)',
            },
          ],
        },
      ],
    },
  ],
}
