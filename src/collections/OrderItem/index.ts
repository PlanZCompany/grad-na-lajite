import type { CollectionConfig } from 'payload'

export const OrderItem: CollectionConfig = {
  slug: 'order-item',
  labels: {
    singular: 'Ред в поръчка',
    plural: 'Редове в поръчка',
  },
  admin: {
    useAsTitle: 'productName',
    defaultColumns: ['order', 'quantity', 'unitPrice', 'totalPrice', 'productName'],
  },

  timestamps: true,

  fields: [
    // order_id
    {
      name: 'order',
      type: 'relationship',
      relationTo: 'order',
      required: true,
      index: true,
    },

    // product_id
    {
      name: 'product',
      type: 'relationship',
      relationTo: 'product',
      required: true,
      index: true,
    },

    // Snapshot product info
    { name: 'productName', type: 'text', required: true },
    { name: 'sku', type: 'text' },

    // Quantities and sums
    {
      name: 'quantity',
      type: 'number',
      required: true,
      defaultValue: 1,
      min: 1,
      admin: { step: 1 },
    },
    {
      name: 'unitPrice',
      type: 'number',
      required: true,
      min: 0,
      admin: { step: 0.01 },
    },
    {
      name: 'totalPrice',
      type: 'number',
      required: true,
      min: 0,
      admin: { readOnly: true, step: 0.01 },
    },
  ],
}
