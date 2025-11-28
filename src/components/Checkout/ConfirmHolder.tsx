'use client'

import { useAppSelector } from '@/hooks/redux-hooks'
import React, { useEffect } from 'react'
import CheckoutConfirm from './CheckoutConfirm'

const ConfirmHolder = () => {
  const stage = useAppSelector((state) => state.checkout.stageCompleted)

  useEffect(() => {
    if (stage === 3) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }, [stage])

  return (
    <div
      className={`absolute w-full md:top-[130px] md:h-[calc(100vh-130px)] bg-black/90 backdrop-blur-sm z-[10] ${
        stage === 3 ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'
      } transition-[transform,opacity] duration-500 ease-in-out flex justify-center items-center`}
    >
      <div className="w-full content_wrapper">
        <CheckoutConfirm />
      </div>
    </div>
  )
}

export default ConfirmHolder
