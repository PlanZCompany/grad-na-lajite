import type { CollectionConfig } from 'payload'
import { normalizeCode } from './hooks/normalizeCode'
import { validateDateRange } from './hooks/validateDateRange'
import { validateDiscountValue } from './hooks/validateDiscountValue'

export const DiscountCode: CollectionConfig = {
  slug: 'discount-code',
  labels: {
    singular: 'Код за отстъпка',
    plural: 'Кодове за отстъпка',
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
      name: 'code',
      type: 'text',
      required: true,
      unique: true,
      label: 'Code',
      admin: {
        description: 'Напр. ISTINA10, LAJA50. Препоръчително UPPERCASE.',
      },
    },
    {
      name: 'description',
      type: 'text',
      label: 'Описание',
    },

    {
      name: 'discountType',
      type: 'select',
      required: true,
      defaultValue: 'percent',
      options: [
        { label: 'Percent', value: 'percent' },
        { label: 'Fixed', value: 'fixed' },
      ],
    },
    {
      name: 'discountValue',
      type: 'number',
      required: true,
      min: 0,
    },

    {
      name: 'isActive',
      type: 'checkbox',
      required: true,
      defaultValue: true,
      label: 'Активен',
    },

    {
      name: 'maxUsesTotal',
      type: 'number',
      min: 0,
      label: 'Max uses (total)',
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
      name: 'appliesToType',
      type: 'select',
      required: true,
      defaultValue: 'all',
      options: [
        { label: 'All', value: 'all' },
        { label: 'Product', value: 'product' },
        { label: 'Category', value: 'category' },
      ],
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

    {
      name: 'isPublic',
      type: 'checkbox',
      required: true,
      defaultValue: true,
      label: 'Публичен',
    },
    {
      name: 'channel',
      type: 'select',
      label: 'Канал',
      options: [
        { label: 'Site', value: 'site' },
        { label: 'Newsletter', value: 'newsletter' },
        { label: 'DM', value: 'dm' },
        { label: 'Instagram', value: 'instagram' },
        { label: 'TikTok', value: 'tiktok' },
        { label: 'Partner', value: 'partner' },
        { label: 'Internal', value: 'internal' },
      ],
    },

    // Ограничаване към клиенти (по изискванията: email или user id)
    {
      name: 'allowedCustomers',
      type: 'array',
      label: 'Allowed customer emails',
      fields: [
        {
          name: 'email',
          type: 'email',
          required: true,
        },
      ],
      admin: {
        description: 'Ако е попълнено, кодът важи само за тези имейли (особено за guest checkout).',
      },
    },
    {
      name: 'allowedUsers',
      type: 'relationship',
      relationTo: 'users',
      hasMany: true,
      label: 'Allowed users',
    },
  ],
  hooks: {
    beforeValidate: [normalizeCode, validateDateRange, validateDiscountValue],
  },
}
