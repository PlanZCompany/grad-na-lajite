'use server'

import { CheckoutInitialState, ExtendedProduct } from '@/store/features/checkout'
import { stripe } from '..'
import { roundMoney } from '@/utils/roundMoney'

const STRIPE_EUR_MINIMUM_CENTS = 50

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
    throw new Error('Количката е празна или съдържа невалидни продукти.')
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
    total = Math.max(0, total - discountAmount)
  }

  if (shipping > 0) {
    total += shipping
  }

  total = Math.round(total * 100)

  if (total < STRIPE_EUR_MINIMUM_CENTS) {
    throw new Error(
      `Минималната сума за плащане с карта е €${(STRIPE_EUR_MINIMUM_CENTS / 100).toFixed(2)}.`,
    )
  }

  return total
}

export async function createPaymentIntentAction(
  products: ExtendedProduct[],
  discount: CheckoutInitialState['checkoutFormData']['discountCode'] | null = null,
  shipping: number = 0,
): Promise<{ clientSecret: string | null; error: string | null }> {
  let amount: number
  try {
    amount = calculateTotalAmount(products, discount, shipping)
  } catch (err) {
    return {
      clientSecret: null,
      error: err instanceof Error ? err.message : 'Грешка при изчисляване на сумата.',
    }
  }

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
    error: null,
  }
}
