'use client'

import { getCartProductsByUserId } from '@/action/products/shoppingCart'
import { useAppDispatch, useAppSelector } from '@/hooks/redux-hooks'
import { setProducts } from '@/store/features/checkout'
import React, { useEffect } from 'react'

const ShoppingCartManager = () => {
  const dispatch = useAppDispatch()
  const userId = useAppSelector((state) => state.root.user?.id)

  const dispatchCurrentProductsToState = async () => {
    if (!userId) {
      const localStorageProducts =
        JSON.parse(localStorage.getItem('cartProductsGradNaLajite') as string) || []

      if (localStorageProducts.length > 0) {
        dispatch(setProducts(localStorageProducts))
        return
      }

      dispatch(setProducts([]))

      return
    }

    const currentUserProducts = await getCartProductsByUserId(userId as number)

    dispatch(setProducts(currentUserProducts.map((x) => ({ ...x, orderQuantity: 1 }))))
  }

  useEffect(() => {
    dispatchCurrentProductsToState()
  }, [userId])

  return <></>
}

export default ShoppingCartManager
