import type { CollectionConfig } from 'payload'

function formatOrderNumberFromId(id: unknown) {
  const n = typeof id === 'number' ? id : Number(id)
  // Expecting numeric IDs (e.g., Postgres serial/bigint)
  if (!Number.isFinite(n) || n < 0) return undefined
  return `ORD-${String(Math.trunc(n)).padStart(7, '0')}`
}

export const Order: CollectionConfig = {
  slug: 'order',
  admin: {
    useAsTitle: 'orderNumber',
    defaultColumns: ['orderNumber', 'email', 'totalAmount', 'status', 'paymentStatus', 'createdAt'],
  },
  timestamps: true,
  fields: [
    {
      name: 'orderNumber',
      type: 'text',
      unique: true,
      index: true,
      admin: { readOnly: true },
    },

    // Change relationTo if your users collection slug differs (often 'users')
    {
      name: 'user',
      type: 'relationship',
      relationTo: 'users',
      required: false,
      index: true,
    },

    { name: 'email', type: 'email', required: true, index: true },
    { name: 'firstName', type: 'text', required: true },
    { name: 'lastName', type: 'text', required: true },
    { name: 'phone', type: 'text', required: true },

    { name: 'termsAccepted', type: 'checkbox', required: true, defaultValue: false },
    { name: 'termsAcceptedAt', type: 'date' },
    { name: 'termsVersion', type: 'text' },
    { name: 'termsIpAddress', type: 'text' },

    { name: 'shippingAddressLine1', type: 'text', required: true },
    { name: 'shippingAddressLine2', type: 'text' },
    { name: 'shippingCity', type: 'text', required: true },
    { name: 'shippingPostcode', type: 'text', required: true },
    { name: 'shippingCountry', type: 'text', required: true, defaultValue: 'Bulgaria' },

    { name: 'shippingMethod', type: 'text', required: true },
    {
      name: 'shippingProvider',
      type: 'select',
      required: true,
      options: ['econt', 'speedy', 'boxnow'],
    },
    { name: 'trackingNumber', type: 'text' },

    {
      name: 'shippingPrice',
      type: 'number',
      required: true,
      defaultValue: 0,
      min: 0,
      admin: { step: 0.01 },
    },
    { name: 'currency', type: 'text', required: true, defaultValue: 'BGN' },

    // Defaults make order creation easier before items exist
    {
      name: 'subtotalAmount',
      type: 'number',
      required: true,
      defaultValue: 0,
      min: 0,
      admin: { step: 0.01 },
    },
    {
      name: 'shippingAmount',
      type: 'number',
      required: true,
      defaultValue: 0,
      min: 0,
      admin: { step: 0.01 },
    },
    {
      name: 'totalAmount',
      type: 'number',
      required: true,
      defaultValue: 0,
      min: 0,
      admin: { step: 0.01 },
    },

    {
      name: 'paymentMethod',
      type: 'select',
      required: true,
      options: ['card', 'cash_on_delivery', 'bank_transfer', 'apple_pay', 'google_pay'],
    },
    {
      name: 'paymentStatus',
      type: 'select',
      required: true,
      defaultValue: 'pending',
      options: ['pending', 'paid', 'refunded', 'failed'],
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'pending',
      options: ['pending', 'processing', 'shipped', 'delivered', 'cancelled', 'returned'],
    },

    { name: 'paidAt', type: 'date' },
    { name: 'shippedAt', type: 'date' },
    { name: 'deliveredAt', type: 'date' },
    { name: 'cancelledAt', type: 'date' },

    { name: 'emailShippedSentAt', type: 'date' },
    { name: 'emailPostDeliverySentAt', type: 'date' },
    { name: 'emailReviewSentAt', type: 'date' },
    { name: 'emailWinbackSentAt', type: 'date' },

    { name: 'legalRetentionUntil', type: 'date', required: true },

    // Reverse relation (virtual list of items)
    {
      name: 'items',
      type: 'join',
      collection: 'order-item',
      on: 'order',
      defaultLimit: 0,
      admin: {
        defaultColumns: ['productName', 'quantity', 'unitPrice', 'totalPrice'],
        allowCreate: true,
      },
    },
  ],

  hooks: {
    afterChange: [
      async ({ doc, req, operation }) => {
        // prevent recursion if we update the same order inside this hook
        if (req.context?.skipOrderNumberGen) return

        // only set if missing
        if (doc.orderNumber) return

        // create/update both can run, but this is mainly for create
        if (operation !== 'create' && operation !== 'update') return

        const orderNumber = formatOrderNumberFromId((doc as any).id)
        if (!orderNumber) return

        await req.payload.update({
          collection: 'order',
          id: (doc as any).id,
          context: { ...req.context, skipOrderNumberGen: true },
          data: { orderNumber },
        })
      },
    ],

    afterDelete: [
      async ({ doc, req }) => {
        // Clean up related order items so no orphans remain
        const orderId = (doc as any).id

        const items = await req.payload.find({
          collection: 'order-item',
          depth: 0,
          limit: 1000,
          where: { order: { equals: orderId } },
        })

        await Promise.all(
          items.docs.map((item: any) =>
            req.payload.delete({
              collection: 'order-item',
              id: item.id,
            }),
          ),
        )
      },
    ],
  },
}
