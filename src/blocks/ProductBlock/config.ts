import type { Block } from 'payload'
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
        {
          name: 'media',
          type: 'upload',
          relationTo: 'media',
          required: false,
          maxDepth: 2,
        },
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
        linkGroup({
          overrides: {
            maxRows: 1,
          },
        }),
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
        {
          name: 'conditions',
          type: 'array',
          fields: [
            {
              name: 'condition',
              type: 'text',
              required: true,
            },
            {
              name: 'icon',
              type: 'upload',
              relationTo: 'media',
              required: true,
            },
          ],
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
        linkGroup({
          overrides: {
            maxRows: 1,
          },
        }),
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
        {
          name: 'media',
          type: 'upload',
          relationTo: 'media',
          required: false,
          maxDepth: 2,
        },
        linkGroup({
          overrides: {
            maxRows: 1,
          },
        }),
      ],
    },
  ],
}
