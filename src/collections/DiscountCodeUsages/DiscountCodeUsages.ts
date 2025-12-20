import type { CollectionConfig } from 'payload'
import { normalizeUsedEmail } from './hooks/normalizeUsedEmail'
import { validateUsageIdentity } from './hooks/validateUsageIdentity'

export const DiscountCodeUsages: CollectionConfig = {
  slug: 'discount-code-usages',
  admin: {
    defaultColumns: ['discountCode', 'order', 'user', 'usedEmail', 'discountAmount', 'usedAt'],
  },
  hooks: {
    beforeValidate: [normalizeUsedEmail, validateUsageIdentity],
  },
  fields: [
    {
      name: 'discountCode',
      type: 'relationship',
      relationTo: 'discount-code',
      required: true,
      index: true,
    },
    {
      name: 'user',
      type: 'relationship',
      relationTo: 'users',
      index: true,
    },
    {
      name: 'order',
      type: 'relationship',
      relationTo: 'order',
      required: true,
      unique: true, // 1 usage record per order (защото 1 код на поръчка)
      index: true,
    },
    {
      name: 'usedEmail',
      type: 'email',
      index: true,
      admin: {
        description: 'Попълва се при guest поръчка (когато няма user).',
      },
    },
    {
      name: 'discountAmount',
      type: 'number',
      required: true,
      min: 0,
    },
    {
      name: 'usedAt',
      type: 'date',
      required: true,
      defaultValue: () => new Date().toISOString(),
      admin: { date: { pickerAppearance: 'dayAndTime' } },
      index: true,
    },
  ],
}
