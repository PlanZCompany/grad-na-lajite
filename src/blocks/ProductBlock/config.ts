import type { Block } from 'payload'
import { MediaConfig, OrderButtonCheckField } from '../Reusable'
import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { linkGroup } from '@/fields/linkGroup'

export const ProductBlock: Block = {
  slug: 'productBlock',
  interfaceName: 'ProductBlock',
  fields: [
    {
      name: 'hero',
      label: 'Oсновна секция',
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
          name: 'reviews',
          type: 'text',
          required: true,
          admin: {
            description: 'Пример: (4.9/5 от 128 отзива)',
          },
        },
        {
          name: 'price',
          type: 'text',
          required: true,
          admin: {
            description: 'Пример: 49.99лв. | 25.12€.',
          },
        },
        {
          name: 'discountText',
          type: 'text',
          required: true,
          admin: {
            description: '* Абонирай се за новини и получи -10% код',
          },
        },
        {
          name: 'extraDescription',
          type: 'richText',
          editor: lexicalEditor({
            features: ({ rootFeatures }) => [
              ...rootFeatures,
              FixedToolbarFeature(),
              InlineToolbarFeature(),
            ],
          }),
          label: 'Екстра описание',
          admin: {
            description: 'Пример: 🚚 Доставка 2-3 дни със Спиди – 4.90 лв....',
          },
        },
      ],
    },
    {
      name: 'box',
      type: 'group',
      label: 'Какво има в кутията - секция',
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
        OrderButtonCheckField,
      ],
    },
    {
      name: 'play',
      type: 'group',
      label: 'Как се играе - секция',
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
        OrderButtonCheckField,
      ],
    },
    {
      name: 'roles',
      type: 'group',
      label: 'Роли - секция',
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
        OrderButtonCheckField,
      ],
    },
    {
      name: 'toWho',
      type: 'group',
      label: 'За кого е играта - секция',
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
      name: 'reviews',
      type: 'group',
      label: 'Отзиви - секция',
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
        OrderButtonCheckField,
      ],
    },
    {
      name: 'faq',
      type: 'group',
      label: 'FAQ - секция',
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
        linkGroup({
          overrides: {
            maxRows: 1,
          },
        }),
      ],
    },
  ],
}
