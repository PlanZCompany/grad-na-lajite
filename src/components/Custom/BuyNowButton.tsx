'use client'

import { BuyNowIcon, CloseCircle } from '@/assets/icons'
import { useCheckout } from '@/hooks/useCheckout'
import { Product } from '@/payload-types'
import React, { useState } from 'react'
const BuyNowButton = ({ product }: { product: Product }) => {
  const [activeButton, setActiveButton] = useState(false)
  const { addProductToShoppingCartFullProcess } = useCheckout()

  return (
    <div className="fixed bottom-4 md:bottom-4 right-[12px] md:right-[16px] z-[10]">
      <div
        className={`absolute z-[10] right-12 bottom-0 transition-[transform,opacity] duration-500 ease-in-out ${
          activeButton
            ? 'translate-x-0 opacity-100 pointer-events-auto'
            : 'translate-x-[50%] opacity-0 pointer-events-none'
        }`}
      >
        <div className="bg-gradient-to-br from-[#d4af37] to-[#b7952b] absolute top-[50%] translate-y-[-50%] w-4 h-4 right-0 translate-x-[50%] rotate-45"></div>

        <button
          className="bg-gradient-to-br from-[#d4af37] to-[#b7952b] text-[#200226]
            transition-all duration-300 ease-in-out
            shadow-[0_0_15px_rgba(212,175,55,0.4)]
            hover:from-[#e8c85c] hover:to-[#d4af37]
            hover:shadow-[0_0_25px_rgba(212,175,55,0.7)] text-[16px] h-[40px] px-2 min-w-[180px] rounded-lg flex justify-center items-center"
          аria-label="Добави в количка"
          onClick={() => {
            setActiveButton(false)
            addProductToShoppingCartFullProcess(product)
          }}
        >
          <span>Добави в количка</span>
        </button>
      </div>
      <button
        className="flex justify-center items-center w-[40px] h-[40px] md:w-[46px] md:h-[46px]"
        aria-label="Активирай бутон"
        onClick={() => setActiveButton(!activeButton)}
      >
        <BuyNowIcon />
      </button>
    </div>
  )
}

export default BuyNowButton
