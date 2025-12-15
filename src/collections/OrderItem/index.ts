import type { CollectionConfig } from 'payload'

async function recalculateOrderTotals(args: { req: any; orderId: string | number }) {
  const { req, orderId } = args
  if (req.context?.skipOrderTotalsRecalc) return

  const order = await req.payload.findByID({
    collection: 'order',
    id: orderId,
    depth: 0,
  })

  // Sum items
  const itemsRes = await req.payload.find({
    collection: 'order-item',
    depth: 0,
    limit: 1000,
    where: { order: { equals: orderId } },
  })

  const subtotal = itemsRes.docs.reduce(
    (sum: number, item: any) => sum + (Number(item.totalPrice) || 0),
    0,
  )

  // Prefer shippingAmount; fallback to shippingPrice
  const shippingAmount =
    typeof order.shippingAmount === 'number'
      ? order.shippingAmount
      : Number((order as any).shippingPrice ?? 0)

  const roundedSubtotal = Math.round(subtotal * 100) / 100
  const roundedTotal = Math.round((roundedSubtotal + shippingAmount) * 100) / 100

  await req.payload.update({
    collection: 'order',
    id: orderId,
    context: { ...req.context, skipOrderTotalsRecalc: true },
    data: {
      subtotalAmount: roundedSubtotal,
      totalAmount: roundedTotal,
    },
  })
}

export const OrderItem: CollectionConfig = {
  slug: 'order-item',
  admin: {
    useAsTitle: 'productName',
    defaultColumns: ['productName', 'quantity', 'unitPrice', 'totalPrice', 'order'],
  },
  timestamps: true,
  fields: [
    {
      name: 'order',
      type: 'relationship',
      relationTo: 'order',
      required: true,
      index: true,
    },

    // Change relationTo if your product collection slug differs
    {
      name: 'product',
      type: 'relationship',
      relationTo: 'product',
      required: false,
    },

    { name: 'productName', type: 'text', required: true },
    { name: 'sku', type: 'text' },

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

  hooks: {
    // Keep totalPrice always correct
    beforeValidate: [
      ({ data }) => {
        const quantity = Number(data?.quantity ?? 1)
        const unitPrice = Number(data?.unitPrice ?? 0)
        const total = Math.round(quantity * unitPrice * 100) / 100
        return { ...data, totalPrice: total }
      },
    ],

    // After create/update -> update parent order totals
    afterChange: [
      async ({ doc, req }) => {
        const orderId =
          typeof (doc as any).order === 'object' && (doc as any).order !== null
            ? (doc as any).order.id
            : (doc as any).order

        if (orderId) await recalculateOrderTotals({ req, orderId })
      },
    ],

    // After delete -> update parent order totals
    afterDelete: [
      async ({ doc, req }) => {
        const orderId =
          typeof (doc as any).order === 'object' && (doc as any).order !== null
            ? (doc as any).order.id
            : (doc as any).order

        if (orderId) await recalculateOrderTotals({ req, orderId })
      },
    ],
  },
}

export default OrderItem
