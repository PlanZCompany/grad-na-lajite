import type { CollectionConfig } from 'payload'

export const DiscountCodeAttempt: CollectionConfig = {
  slug: 'discount-code-attempt',
  admin: {
    defaultColumns: [
      'createdAt',
      'clientKey',
      'code',
      'success',
      'failReason',
      'usedEmail',
      'user',
      'order',
    ],
  },
  fields: [
    {
      name: 'clientKey',
      type: 'text',
      required: true,
      index: true,
      admin: { description: 'user_id/sessionId/IP – идентификатор за анти-спам прозореца.' },
    },
    {
      name: 'code',
      type: 'text',
      required: true,
      index: true,
      admin: { description: 'Кодът както е въведен (нормализиран до trim + uppercase).' },
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
      index: true,
      admin: {
        description: 'По желание – ако attempt е в контекст на конкретна поръчка/checkout.',
      },
    },
    {
      name: 'usedEmail',
      type: 'email',
      index: true,
      admin: { description: 'Email при guest / fallback.' },
    },
    {
      name: 'success',
      type: 'checkbox',
      required: true,
      defaultValue: false,
      index: true,
    },
    {
      name: 'failReason',
      type: 'text',
      index: true,
      admin: { description: 'Кратък код/причина (напр. CODE_NOT_FOUND, CODE_EXPIRED и т.н.).' },
    },
    {
      name: 'createdAt',
      type: 'date',
      required: true,
      defaultValue: () => new Date().toISOString(),
      index: true,
      admin: { date: { pickerAppearance: 'dayAndTime' } },
    },
  ],
}
