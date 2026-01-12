'use server'

import { CheckoutInitialState, ExtendedProduct } from '@/store/features/checkout'
import { stripe } from '..'
import { roundMoney } from '@/utils/roundMoney'

function calculateTotalAmount(
  items: ExtendedProduct[],
  discount: CheckoutInitialState['checkoutFormData']['discountCode'] | null = null,
  shipping: number = 0,
): number {
  let total = 0

  for (const item of items) {
    if (item.orderQuantity <= 0) continue

    const unitPrice = item.price || 0

    total += unitPrice * item.orderQuantity
  }

  if (total <= 0) {
    return 0
  }

  let discountAmount = 0
  if (!!discount) {
    discountAmount = discount?.discountCodeId
      ? discount.discountType === 'percent'
        ? roundMoney((total * discount.discountValue) / 100)
        : discount.discountValue
      : 0
  }
  if (discountAmount > 0) {
    total = total - discountAmount
  }

  if (shipping > 0) {
    total += shipping
  }

  total = Math.round(total * 100)

  return total
}

export async function createPaymentIntentAction(
  products: ExtendedProduct[],
  discount: CheckoutInitialState['checkoutFormData']['discountCode'] | null = null,
  shipping: number = 0,
) {
  const amount = calculateTotalAmount(products, discount, shipping)

  const paymentIntent = await stripe.paymentIntents.create({
    amount,
    currency: 'eur',
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
