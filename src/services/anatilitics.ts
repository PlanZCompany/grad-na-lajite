const isBrowser = typeof window !== 'undefined'

import { Product } from '@/payload-types'

type EcommerceItem = {
  item_id: string
  item_name: string
  price: number
  quantity: number
}

const getTrackedPrice = (product: Product): number => {
  const rawPrice = product.isOnSale ? product.salePrice : product.price
  const price = Number(rawPrice)

  return Number.isFinite(price) && price >= 0 ? price : NaN
}

const toEcommerceItem = (product: Product, quantity: number): EcommerceItem | null => {
  if (!product?.id || !product?.title) return null

  const normalizedQuantity = Number(quantity)
  const price = getTrackedPrice(product)

  if (!Number.isFinite(price)) return null
  if (!Number.isFinite(normalizedQuantity) || normalizedQuantity <= 0) return null

  return {
    item_id: String(product.id),
    item_name: product.title,
    price,
    quantity: normalizedQuantity,
  }
}

const pushEcommerceEvent = (
  event: 'view_content' | 'add_to_cart' | 'initiate_checkout' | 'add_payment_info' | 'purchase',
  currency: string,
  product: Product,
  quantity: number,
  extraEcommerce?: Record<string, unknown>,
) => {
  if (!isBrowser || !currency) return

  const item = toEcommerceItem(product, quantity)
  if (!item) return

  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({
    event,
    ecommerce: {
      currency: currency.toUpperCase(),
      value: item.price * item.quantity,
      items: [item],
      ...extraEcommerce,
    },
  })
}

export const VIEW_CONTENT = (currency: string, product: Product, quantity = 1) => {
  pushEcommerceEvent('view_content', currency, product, quantity)
}

export const ADD_TO_CART = (currency: string, product: Product, quantity: number) => {
  pushEcommerceEvent('add_to_cart', currency, product, quantity)
}

export const INITIATE_CHECKOUT = (currency: string, product: Product, quantity: number) => {
  pushEcommerceEvent('initiate_checkout', currency, product, quantity)
}

export const ADD_PAYMENT_INFO = (currency: string, product: Product, quantity: number) => {
  pushEcommerceEvent('add_payment_info', currency, product, quantity)
}

export const PURCHASE = (currency: string, orderId: string, product: Product, quantity: number) => {
  if (!orderId) return

  pushEcommerceEvent('purchase', currency, product, quantity, {
    transaction_id: String(orderId),
  })
}
