'use client'

import {
  addProductToShoppingCart,
  ExtendedProduct,
  removeProductFromShoppingCart,
} from '@/store/features/checkout'
import { useAppDispatch, useAppSelector } from './redux-hooks'
import { setNotification } from '@/store/features/notifications'
import { addToCart, removeFromCart } from '@/action/products/shoppingCart'
import { Product } from '@/payload-types'

export function useCheckout() {
  const dispatch = useAppDispatch()
  const products = useAppSelector((state) => state.checkout.products)
  const userId = useAppSelector((state) => state.root.user?.id)
  const shoppingCartProducts = useAppSelector((state) => state.checkout.products)

  const calculateTotalPrice = () => {
    return products.reduce((total, product) => {
      if (!product.price) return total

      return total + product.price * product.orderQuantity
    }, 0)
  }

  const calculateRemainSum = () => {
    const BASE_SUM = 65

    const differences = BASE_SUM - calculateTotalPrice()

    return differences
  }

  const addProductToShoppingCartFullProcess = (product: Product) => {
    dispatch(addProductToShoppingCart({ ...product, orderQuantity: 1 }))
    dispatch(
      setNotification({
        showNotification: true,
        message: !!shoppingCartProducts.find((item) => item.id === product.id)
          ? `Kъм (${product?.title}) беше дованен 1 брой`
          : `(${product?.title}) беше добавен в количката`,
        type: 'success',
      }),
    )
    if (!!userId) {
      addToCart(product?.id, userId!)
    } else {
      const currentLocalStorageProducts = JSON.parse(localStorage.getItem('cartProducts') || '[]')

      if (currentLocalStorageProducts.length === 0) {
        localStorage.setItem('cartProducts', JSON.stringify([{ ...product, orderQuantity: 1 }]))
        return
      }

      const productExistsInLocalStorage = currentLocalStorageProducts.find(
        (x: ExtendedProduct) => x.id === product.id,
      )

      if (productExistsInLocalStorage) {
        productExistsInLocalStorage.orderQuantity++
        localStorage.setItem('cartProducts', JSON.stringify(currentLocalStorageProducts))
      } else {
        currentLocalStorageProducts.push({ ...product, orderQuantity: 1 })
        localStorage.setItem('cartProducts', JSON.stringify(currentLocalStorageProducts))
      }

      return
    }
  }

  const removeFromCartFullProcess = async (product: Product) => {
    dispatch(removeProductFromShoppingCart(product))
    dispatch(
      setNotification({
        showNotification: true,
        message: `(${product?.title}) беше премахнат от количката`,
        type: 'success',
      }),
    )
    if (!!userId) {
      removeFromCart(product.id, userId!)
    } else {
      const currentLocalStorageProducts = JSON.parse(localStorage.getItem('cartProducts') || '[]')

      const productExistsInLocalStorage = currentLocalStorageProducts.find(
        (x: ExtendedProduct) => x.id === product.id,
      )

      if (productExistsInLocalStorage.length > 0) {
        currentLocalStorageProducts.splice(
          currentLocalStorageProducts.indexOf(productExistsInLocalStorage),
          1,
        )
        localStorage.setItem('cartProducts', JSON.stringify(currentLocalStorageProducts))
      } else {
        localStorage.removeItem('cartProducts')
      }
    }
  }

  return {
    calculateTotalPrice,
    calculateRemainSum,
    addProductToShoppingCartFullProcess,
    removeFromCartFullProcess,
  }
}
