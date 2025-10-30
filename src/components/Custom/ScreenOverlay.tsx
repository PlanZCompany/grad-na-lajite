'use client'

import { useAppSelector } from '@/hooks/redux-hooks'
import React, { useEffect } from 'react'

const ScreenOverlay = () => {
  const shoppingCartOpen = useAppSelector((state) => state.checkout.shoppingCardOpen)

  useEffect(() => {
    if (shoppingCartOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }, [shoppingCartOpen])

  return (
    <div
      className={`fixed inset-0 z-[10] bg-black/50 backdrop-blur-sm
        transition-transform duration-500 ease-in-out
        ${shoppingCartOpen ? 'translate-x-0' : '-translate-x-full'}`}
    ></div>
  )
}

export default ScreenOverlay
