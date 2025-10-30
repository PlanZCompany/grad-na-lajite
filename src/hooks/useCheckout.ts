'use client'

import { useAppSelector } from './redux-hooks'

export function useCheckout() {
  const products = useAppSelector((state) => state.checkout.products)

  const calculateTotalPrice = () => {
    return products.reduce((total, product) => {
      if (!product.price) return total
      if (product?.promoPrice) {
        return total + product.promoPrice * product.orderQuantity
      }

      return total + product.price * product.orderQuantity
    }, 0)
  }

  const calculateRemainSum = () => {
    const BASE_SUM = 100 //todo

    const differences = BASE_SUM - calculateTotalPrice()

    return differences
  }

  return { calculateTotalPrice, calculateRemainSum }
}
