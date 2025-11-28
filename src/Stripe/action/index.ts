'use server'

import { ExtendedProduct } from '@/store/features/checkout'
import { stripe } from '..'

function calculateTotalAmount(items: ExtendedProduct[], discount: number = 0): number {
  let total = 0

  for (const item of items) {
    if (item.orderQuantity <= 0) continue

    const unitPrice = item.price || 0

    total += unitPrice * item.orderQuantity
  }

  if (total <= 0) {
    return 0
  }

  if (discount > 0) {
    total *= discount
  }

  total = Math.round(total * 100)

  return total
}

export async function createPaymentIntentAction(products: ExtendedProduct[], discount: number = 0) {
  const amount = calculateTotalAmount(products, discount)

  const paymentIntent = await stripe.paymentIntents.create({
    amount,
    currency: 'BGN',
    automatic_payment_methods: {
      enabled: true,
    },
    metadata: {
      products: JSON.stringify(products.map(({ title, quantity }) => ({ title, quantity }))),
    },
  })

  return {
    clientSecret: paymentIntent.client_secret,
  }
}
