import { buildEmailCustom } from '@/lib/email/buildEmailCustom'
import { getPayload, type CollectionConfig } from 'payload'
import configPromise from '@payload-config'

export const Order: CollectionConfig = {
  slug: 'order',
  labels: {
    singular: 'Поръчка',
    plural: 'Поръчки',
  },
  admin: {
    useAsTitle: 'orderNumber',
    defaultColumns: ['orderNumber', 'email', 'totalAmount', 'status', 'paymentStatus', 'createdAt'],
  },

  timestamps: true,

  fields: [
    // Generated later from Payload id (ORD-0000123)
    {
      name: 'orderNumber',
      type: 'text',
      unique: true,
      index: true,
      admin: { readOnly: true, position: 'sidebar' },
    },

    // user_id (optional)
    {
      name: 'user',
      type: 'relationship',
      relationTo: 'users',
      required: false,
      index: true,
    },

    // Discount code (optional)
    {
      name: 'discountCode',
      type: 'relationship',
      relationTo: 'discount-code',
      required: false,
      index: true,
      admin: { position: 'sidebar' },
    },

    // Discount amount snapshot (BGN)
    {
      name: 'discountAmount',
      type: 'number',
      required: true,
      defaultValue: 0,
      min: 0,
      admin: { step: 0.01, position: 'sidebar' },
    },

    // Customer

    { name: 'email', type: 'email', required: true, index: true },
    { name: 'firstName', type: 'text', required: true },
    { name: 'lastName', type: 'text', required: true },
    { name: 'phone', type: 'text', required: true },

    // Terms
    { name: 'termsAccepted', type: 'checkbox', required: true, defaultValue: false },
    { name: 'termsAcceptedAt', type: 'date' },
    { name: 'termsVersion', type: 'text' },
    { name: 'termsIpAddress', type: 'text' },

    // Shipping address
    { name: 'shippingAddressLine1', type: 'text', required: true },
    { name: 'shippingAddressLine2', type: 'text' },
    { name: 'shippingCity', type: 'text', required: true },
    { name: 'shippingPostcode', type: 'text', required: true },
    { name: 'shippingCountry', type: 'text', required: true, defaultValue: 'Bulgaria' },

    // Courier / tracking
    { name: 'shippingMethod', type: 'text', required: true },
    {
      name: 'shippingProvider',
      type: 'select',
      required: true,
      options: ['econt', 'speedy', 'boxnow'],
    },
    { name: 'trackingNumber', type: 'text' },

    // Money
    { name: 'currency', type: 'text', required: true, defaultValue: 'BGN' },

    {
      name: 'subtotalAmount',
      type: 'number',
      required: true,
      defaultValue: 0,
      min: 0,
      admin: { step: 0.01 },
    },
    {
      name: 'shippingFinalAmount',
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

    // Payment + status
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

    // Lifecycle timestamps
    { name: 'paidAt', type: 'date' },
    { name: 'shippedAt', type: 'date' },
    { name: 'deliveredAt', type: 'date' },
    { name: 'cancelledAt', type: 'date' },

    // Email timestamps
    { name: 'emailShippedSentAt', type: 'date' },
    { name: 'emailPostDeliverySentAt', type: 'date' },
    { name: 'emailReviewSentAt', type: 'date' },
    { name: 'emailWinbackSentAt', type: 'date' },

    // Legal (will be auto-calculated to +5 years later, but editable)
    { name: 'legalRetentionUntil', type: 'date', required: true },

    // Optional: show items on the order (virtual list)
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
  // Email confirmation after order is created
  hooks: {
    afterChange: [
      async (req) => {
        const { doc, operation } = req

        if (operation !== 'create') return doc

        try {
          const { subject, html } = await buildEmailCustom({
            templateSlug: 'order_confirmation',
          })
          const payload = await getPayload({ config: configPromise })
          const { email } = doc
          await payload.sendEmail({
            to: email,
            subject,
            html,
            text: html,
            from: 'no-reply@gradnalajite.bg',
          })
        } catch (error) {
          console.error(error)
        }

        return doc
      },
    ],
  },
}
