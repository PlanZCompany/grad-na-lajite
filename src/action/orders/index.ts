'use server'

import { getPayload } from 'payload'
import configPromise from '@/payload.config'
import { roundMoney } from '@/utils/roundMoney'

export type CreateOrderInput = {
  email: string
  firstName: string
  lastName: string
  phone: string

  termsAccepted: boolean
  termsIpAddress: string

  shippingAddressLine1: string
  shippingAddressLine2?: string
  shippingCity: string
  shippingPostcode: string
  shippingCountry?: string

  shippingMethod: string
  shippingProvider: 'econt' | 'speedy' | 'boxnow'

  currency: string

  subtotalAmount: number
  shippingFinalAmount: number
  totalAmount: number

  paymentMethod: 'card' | 'cash_on_delivery' | 'bank_transfer' | 'apple_pay' | 'google_pay'
  paymentStatus: 'pending' | 'paid'
  status: 'pending' | 'processing'

  items: Array<{ productId: number; quantity: number; price: number }>

  // optional
  userId: number | null
  discountCodeId: number | null
  discountAmount: number | null
}

export async function makeOrder(
  input: CreateOrderInput,
): Promise<{ status: 'success' | 'error'; orderNumber?: string }> {
  const payload = await getPayload({ config: configPromise })

  const now = new Date()
  const legalRetentionUntilDate = new Date(now)
  legalRetentionUntilDate.setFullYear(legalRetentionUntilDate.getFullYear() + 5)

  //order number
  const orderNumber = `ORD-${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}-${now.getHours()}-${now.getMinutes()}-${now.getSeconds()}`

  try {
    const order = await payload.create({
      collection: 'order',
      data: {
        // order number
        orderNumber,

        //user
        user: input.userId ?? null,

        //discount
        discountCode: input.discountCodeId ?? null,
        discountAmount: input.discountAmount ?? 0,
        currency: input.currency ?? 'EUR',
        subtotalAmount: input.subtotalAmount,
        shippingFinalAmount: input.shippingFinalAmount,
        totalAmount: input.totalAmount,

        // user info
        email: input.email,
        firstName: input.firstName,
        lastName: input.lastName,
        phone: input.phone,

        // terms
        termsAccepted: input.termsAccepted,
        termsAcceptedAt: input.termsAccepted ? now.toISOString() : null,
        termsVersion: 'v1',
        termsIpAddress: input.termsIpAddress ?? '',

        // shipping
        shippingAddressLine1: input.shippingAddressLine1,
        shippingAddressLine2: input.shippingAddressLine2 ?? '',
        shippingCity: input.shippingCity,
        shippingPostcode: input.shippingPostcode,
        shippingCountry: input.shippingCountry ?? 'Bulgaria',

        shippingMethod: input.shippingMethod,
        shippingProvider: input.shippingProvider,
        trackingNumber: '',

        // status + payment
        paymentMethod: input.paymentMethod,
        paymentStatus: input.paymentStatus,
        status: input.status,

        legalRetentionUntil: legalRetentionUntilDate.toISOString(),

        paidAt: null,
        shippedAt: null,
        deliveredAt: null,
        cancelledAt: null,

        emailShippedSentAt: null,
        emailPostDeliverySentAt: null,
        emailReviewSentAt: null,
        emailWinbackSentAt: null,
      },
    })

    // create Order-items (редове в поръчка)
    await Promise.all(
      input.items.map(async (item) => {
        const quantity = Math.max(1, Number(item.quantity || 1))
        const product = await payload.findByID({
          collection: 'product',
          id: item.productId,
        })

        const totalPrice = roundMoney(item.price * quantity)

        await payload.create({
          collection: 'order-item',
          data: {
            order: order.id,
            product: product.id,
            productName: product.title,
            sku: undefined, // по инструкции го има в колекцията
            quantity,
            unitPrice: roundMoney(item.price),
            totalPrice,
          },
        })
      }),
    )
    if (!!order) {
      return { status: 'success', orderNumber }
    } else {
      return { status: 'error' }
    }
  } catch (error) {
    console.error(error)
    return { status: 'error' }
  }
}
