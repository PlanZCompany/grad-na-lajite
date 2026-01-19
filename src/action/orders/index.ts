'use server'

import { getPayload } from 'payload'
import configPromise from '@/payload.config'
import { roundMoney } from '@/utils/roundMoney'
import type { Where } from 'payload' // ✅ ADDED: needed for typed where clauses in usages checks

const MAX_GLOBAL_DISCOUNT_PERCENT = 50 // ✅ ADDED: per requirements (≤ 50%)

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

  // NOTE: We will ignore these client-provided money fields and compute server-side
  subtotalAmount: number
  shippingFinalAmount: number
  totalAmount: number

  paymentMethod: 'card' | 'cash_on_delivery' | 'bank_transfer' | 'apple_pay' | 'google_pay'
  paymentStatus: 'pending' | 'paid'
  status: 'pending' | 'processing'

  // NOTE: we will ignore item.price from client and compute server-side from Product collection
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
    //Build server-side item snapshots (prices come from DB, not client)
    const itemSnapshots = await Promise.all(
      input.items.map(async (item) => {
        const quantity = Math.max(1, Number(item.quantity || 1))

        const product = await payload.findByID({
          collection: 'product',
          id: item.productId,
        })

        const basePrice = Number(product.price ?? 0)
        const isOnSale = Boolean(product.isOnSale)
        const salePrice = Number(product.salePrice ?? 0)

        const unitPrice = isOnSale && salePrice > 0 ? salePrice : basePrice
        const totalPrice = roundMoney(unitPrice * quantity)

        return {
          productId: product.id,
          productTitle: product.title,
          isOnSale,
          quantity,
          unitPrice: roundMoney(unitPrice),
          totalPrice,
        }
      }),
    )

    //Compute subtotal from snapshots
    const computedSubtotalAmount = roundMoney(
      itemSnapshots.reduce((sum, item) => sum + item.totalPrice, 0),
    )

    //Compute discountAmount server-side based on discount-code rules
    let appliedDiscountCodeId: number | null = input.discountCodeId ?? null
    let computedDiscountAmount = 0

    if (appliedDiscountCodeId) {
      const discountCode = await payload.findByID({
        collection: 'discount-code',
        id: appliedDiscountCodeId,
      })

      //Re-validate isActive + date range at finalize time (race conditions)
      if (discountCode.isActive === false) {
        appliedDiscountCodeId = null
      } else {
        if (discountCode.startDate && now < new Date(discountCode.startDate)) {
          appliedDiscountCodeId = null
        }
        if (discountCode.endDate && now > new Date(discountCode.endDate)) {
          appliedDiscountCodeId = null
        }
      }

      //Validate allowed users/emails if populated
      if (appliedDiscountCodeId) {
        const hasAllowedUsers =
          Array.isArray(discountCode.allowedUsers) && discountCode.allowedUsers.length > 0
        const hasAllowedCustomers =
          Array.isArray(discountCode.allowedCustomers) && discountCode.allowedCustomers.length > 0

        if (hasAllowedUsers || hasAllowedCustomers) {
          const userAllowed =
            typeof input.userId === 'number' &&
            Array.isArray(discountCode.allowedUsers) &&
            discountCode.allowedUsers.some((u) =>
              typeof u === 'number' ? u === input.userId : u?.id === input.userId,
            )

          const normalizedOrderEmail = input.email?.trim().toLowerCase()
          const emailAllowed =
            Boolean(normalizedOrderEmail) &&
            Array.isArray(discountCode.allowedCustomers) &&
            discountCode.allowedCustomers.some(
              (c) => c?.email?.trim().toLowerCase() === normalizedOrderEmail,
            )

          if (!userAllowed && !emailAllowed) {
            appliedDiscountCodeId = null
          }
        }
      }

      //Usage limits (maxUsesTotal)
      if (appliedDiscountCodeId && typeof discountCode.maxUsesTotal === 'number') {
        const totalUses = await payload.find({
          collection: 'discount-code-usages',
          where: { discountCode: { equals: discountCode.id } },
          limit: 1,
          pagination: false,
        })

        if ((totalUses.totalDocs ?? 0) >= discountCode.maxUsesTotal) {
          appliedDiscountCodeId = null
        }
      }

      //Usage limits (maxUsesPerUser)
      if (appliedDiscountCodeId && typeof discountCode.maxUsesPerUser === 'number') {
        const hasAuthenticatedUser = typeof input.userId === 'number'
        const hasOrderEmail = Boolean(input.email)

        if (!hasAuthenticatedUser && !hasOrderEmail) {
          appliedDiscountCodeId = null
        } else {
          let perCustomerWhere: Where

          if (hasAuthenticatedUser) {
            perCustomerWhere = {
              and: [
                { discountCode: { equals: discountCode.id } },
                { user: { equals: input.userId as number } },
              ],
            }
          } else {
            perCustomerWhere = {
              and: [
                { discountCode: { equals: discountCode.id } },
                { usedEmail: { equals: input.email.trim().toLowerCase() } },
              ],
            }
          }

          const perCustomerUses = await payload.find({
            collection: 'discount-code-usages',
            where: perCustomerWhere,
            limit: 1,
            pagination: false,
          })

          if ((perCustomerUses.totalDocs ?? 0) >= discountCode.maxUsesPerUser) {
            appliedDiscountCodeId = null
          }
        }
      }

      //Calculate discountable subtotal (rule: promo code does NOT apply to already-on-sale items)
      if (appliedDiscountCodeId) {
        let discountableSubtotal = 0

        for (const item of itemSnapshots) {
          if (item.isOnSale) continue

          if (discountCode.appliesToType === 'all') {
            discountableSubtotal += item.totalPrice
          } else if (discountCode.appliesToType === 'product') {
            if (
              typeof discountCode.appliesToId === 'number' &&
              Number(item.productId) === discountCode.appliesToId
            ) {
              discountableSubtotal += item.totalPrice
            }
          } else if (discountCode.appliesToType === 'category') {
            // NOTE: Product collection currently has no category field; can't apply category logic yet.
          }
        }

        discountableSubtotal = roundMoney(discountableSubtotal)

        if (discountableSubtotal > 0) {
          if (discountCode.discountType === 'percent') {
            computedDiscountAmount = roundMoney(
              discountableSubtotal * (Number(discountCode.discountValue || 0) / 100),
            )
          } else {
            computedDiscountAmount = roundMoney(
              Math.min(Number(discountCode.discountValue || 0), discountableSubtotal),
            )
          }

          //Global cap ≤ 50% of subtotal
          if (computedSubtotalAmount > 0) {
            const effectivePercent = (computedDiscountAmount / computedSubtotalAmount) * 100
            if (effectivePercent > MAX_GLOBAL_DISCOUNT_PERCENT) {
              computedDiscountAmount = roundMoney(
                (computedSubtotalAmount * MAX_GLOBAL_DISCOUNT_PERCENT) / 100,
              )
            }
          }
        } else {
          computedDiscountAmount = 0
        }
      }
    }

    //Compute totals server-side
    const computedShippingFinalAmount = roundMoney(Number(input.shippingFinalAmount ?? 0))
    const computedTotalAmount = roundMoney(
      computedSubtotalAmount - computedDiscountAmount + computedShippingFinalAmount,
    )

    const orderDTO = {
      // order number
      orderNumber,

      //user
      user: input.userId ?? null,

      //discount (computed)
      discountCode: appliedDiscountCodeId ?? null,
      discountAmount: computedDiscountAmount,

      currency: input.currency ?? 'EUR',
      subtotalAmount: computedSubtotalAmount,
      shippingFinalAmount: computedShippingFinalAmount,
      totalAmount: computedTotalAmount,

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
      shippingAddressLine1: !!input.shippingAddressLine1
        ? input.shippingAddressLine1
        : 'Доставката е към офис/автомат',
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
    }

    //Order create now uses computed values (not client-provided)
    const order = await payload.create({
      collection: 'order',
      data: orderDTO,
    })

    //Create order-items from snapshots (no client price)
    await Promise.all(
      itemSnapshots.map(async (item) => {
        await payload.create({
          collection: 'order-item',
          data: {
            order: order.id,
            product: item.productId,
            productName: item.productTitle,
            sku: undefined, // по инструкции го има в колекцията
            quantity: item.quantity,
            unitPrice: item.unitPrice,
            totalPrice: item.totalPrice,
          },
        })
      }),
    )

    //Write usage record (COD: order is considered created successfully)
    if (appliedDiscountCodeId && computedDiscountAmount > 0) {
      await payload.create({
        collection: 'discount-code-usages',
        data: {
          discountCode: appliedDiscountCodeId,
          order: order.id,
          user: input.userId ?? undefined,
          usedEmail: input.userId ? undefined : input.email.trim().toLowerCase(),
          discountAmount: Number(computedDiscountAmount.toFixed(2)),
          usedAt: now.toISOString(),
        },
      })
    }

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
