import deepMerge from '@/utils/deepMerge'
import type { Field, GroupField } from 'payload'

export type LinkAppearances = 'default' | 'outline'

export const appearanceOptions: Record<LinkAppearances, { label: string; value: string }> = {
  default: {
    label: 'Основен Вариант',
    value: 'default',
  },
  outline: {
    label: 'Вторичен вариант',
    value: 'outline',
  },
}

type LinkType = (options?: {
  appearances?: LinkAppearances[] | false
  disableLabel?: boolean
  required?: boolean
  overrides?: Partial<GroupField>
}) => Field

export const link: LinkType = ({
  appearances,
  disableLabel = false,
  required = true,
  overrides = {},
} = {}) => {
  const linkResult: GroupField = {
    label: 'Линк',
    name: 'link',
    type: 'group',
    admin: {
      hideGutter: true,
    },
    fields: [
      {
        type: 'row',
        fields: [
          {
            name: 'type',
            type: 'radio',
            admin: {
              layout: 'horizontal',
              width: '50%',
            },
            defaultValue: 'reference',
            options: [
              {
                label: 'Вътрешен Линк',
                value: 'reference',
              },
              {
                label: 'Външеш Линк',
                value: 'custom',
              },
              {
                label: 'Линк Котва на Секция',
                value: 'anchorSectionId',
              },
            ],
          },
          {
            name: 'newTab',
            type: 'checkbox',
            admin: {
              style: {
                alignSelf: 'flex-end',
              },
              width: '50%',
            },
            label: 'Отваряне в нов прозорец',
          },
        ],
      },
    ],
  }

  const linkTypes: Field[] = [
    {
      name: 'reference',
      type: 'relationship',
      admin: {
        condition: (_, siblingData) => siblingData?.type === 'reference',
      },
      label: 'Документа сочи към',
      maxDepth: 2,
      relationTo: ['pages'], //TODO Add support for other collections
      required,
    },
    {
      name: 'url',
      type: 'text',
      admin: {
        condition: (_, siblingData) => ['custom', 'anchorSectionId'].includes(siblingData?.type),
      },
      label: 'Външен Линк URL',
      required,
    },
  ]

  if (!disableLabel) {
    linkTypes.map((linkType) => ({
      ...linkType,
      admin: {
        ...linkType.admin,
        width: '50%',
      },
    }))

    linkResult.fields.push({
      type: 'row',
      fields: [
        ...linkTypes,
        {
          name: 'label',
          type: 'text',
          admin: {
            width: '50%',
          },
          label: 'Текст на Линк',
          required,
        },
        {
          name: 'searchParams',
          type: 'text',
          admin: {
            width: '50%',
            description:
              'Когато има сърч добавени сърч параметри полето (Документа сочи към) няма значение, винаги потребителя ще бъде насочен към чекаут с добавени сърч параметри. Важно!!! Пример за добявени на сърч параметри -> order-count=1 пример с повече от едно -> order-count=1&voucher-code=1234 и т.н. да няма въпрос (?) преди тях.',
          },
          label: 'Параметри в URL',
          required: false,
        },
      ],
    })
  } else {
    linkResult.fields = [...linkResult.fields, ...linkTypes]
  }

  if (appearances !== false) {
    let appearanceOptionsToUse = [appearanceOptions.default, appearanceOptions.outline]

    if (appearances) {
      appearanceOptionsToUse = appearances.map((appearance) => appearanceOptions[appearance])
    }

    linkResult.fields.push({
      name: 'appearance',
      type: 'select',
      admin: {
        description: 'Дизайн на линк',
      },
      defaultValue: 'default',
      options: appearanceOptionsToUse,
      label: 'Дизайн',
    })
  }

  return deepMerge(linkResult, overrides)
}
