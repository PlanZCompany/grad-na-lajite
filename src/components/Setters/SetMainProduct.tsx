'use client'

import { useAppDispatch } from '@/hooks/redux-hooks'
import { Product } from '@/payload-types'
import { setMainProduct } from '@/store/features/root'
import React, { useEffect } from 'react'

const SetMainProduct = ({ product }: { product: Product }) => {
  const dispatch = useAppDispatch()
  useEffect(() => {
    if (!product) return

    dispatch(setMainProduct(product))
  }, [dispatch, product])

  return <></>
}

export default SetMainProduct
