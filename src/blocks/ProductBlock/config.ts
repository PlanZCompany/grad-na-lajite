import type { Block } from 'payload'
import {
  BasicComponentsArray,
  DescriptionConfig,
  HeadingConfig,
  MediaConfig,
  OrderButtonCheckField,
} from '../Reusable'
import {
  FixedToolbarFeature,
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
        HeadingConfig,
        DescriptionConfig,
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
      fields: [HeadingConfig, DescriptionConfig, BasicComponentsArray, OrderButtonCheckField],
    },
    {
      name: 'play',
      type: 'group',
      label: 'Как се играе - секция',
      fields: [HeadingConfig, DescriptionConfig, BasicComponentsArray, OrderButtonCheckField],
    },
    {
      name: 'roles',
      type: 'group',
      label: 'Роли - секция',
      fields: [HeadingConfig, DescriptionConfig, BasicComponentsArray, OrderButtonCheckField],
    },
    {
      name: 'toWho',
      type: 'group',
      label: 'За кого е играта - секция',
      fields: [HeadingConfig, DescriptionConfig, MediaConfig],
    },
    {
      name: 'reviews',
      type: 'group',
      label: 'Отзиви - секция',
      fields: [HeadingConfig, BasicComponentsArray, OrderButtonCheckField],
    },
    {
      name: 'faq',
      type: 'group',
      label: 'FAQ - секция',
      fields: [
        HeadingConfig,
        DescriptionConfig,
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
