import type { CollectionConfig } from 'payload'

export const HeaderBanner: CollectionConfig = {
  slug: 'banner',
  labels: {
    singular: 'Банер',
    plural: 'Банери',
  },
  admin: {
    useAsTitle: 'code',
    defaultColumns: [
      'code',
      'discountType',
      'discountValue',
      'isActive',
      'isPublic',
      'startDate',
      'endDate',
    ],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      unique: true,
      label: 'Entry label',
      admin: {
        description: 'Служебно име',
      },
    },
    {
      name: 'isActive',
      type: 'checkbox',
      label: 'Включен ли е банера?',
    },

    {
      name: 'placement',
      type: 'select',
      required: true,
      defaultValue: 'header_static',
      options: [
        { label: 'Статичен (горна лента)', value: 'header_static' },
        { label: 'Въртящ се банер', value: 'header_rotating' },
      ],
    },
    {
      name: 'order',
      type: 'number',
      required: true,
      min: 1,
    },

    {
      name: 'textContent',
      type: 'textarea',
      required: true,
      label: 'Съдържание',
    },

    {
      name: 'maxUsesPerUser',
      type: 'number',
      min: 0,
      label: 'Max uses per customer',
    },

    {
      name: 'startDate',
      type: 'date',
      label: 'Start date',
      admin: { date: { pickerAppearance: 'dayAndTime' } },
    },
    {
      name: 'endDate',
      type: 'date',
      label: 'End date',
      admin: { date: { pickerAppearance: 'dayAndTime' } },
    },

    {
      name: 'appliesToId',
      type: 'number',
      min: 0,
      admin: {
        condition: (_unused, siblingData) =>
          siblingData?.appliesToType === 'product' || siblingData?.appliesToType === 'category',
        description:
          'ID на продукт/категория (според appliesToType). NULL/празно при appliesToType=all.',
      },
    },
  ],
  hooks: {},
}
