'use client'

import { CloseCircle } from '@/assets/icons'
import React, { useEffect } from 'react'
import { GenericVideo } from '../Generic'

const FullVideo = ({
  isActive,
  setIsActive,
  src,
}: {
  isActive: boolean
  setIsActive: React.Dispatch<React.SetStateAction<boolean>>
  src: string
}) => {
  useEffect(() => {
    if (isActive) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }, [isActive])

  return (
    <div
      className={`fixed inset-0 z-[20] bg-black/50 backdrop-blur-sm
        transition-transform duration-500 ease-in-out flex p-6 md:p-10 xl:p-14 2xl:p-20
        ${isActive ? 'translate-x-0' : '-translate-x-full'}`}
    >
      <div className="absolute top-4 right-4 flex justify-center items-center">
        <button
          className="w-[32px] h-[32px] md:w-[48px] md:h-[48px]"
          onClick={() => {
            setIsActive(false)
          }}
          aria-label="Затвори видео"
          type="button"
        >
          <CloseCircle />
        </button>
      </div>
      <div className="w-full h-full">
        {isActive && (
          <GenericVideo
            src={src}
            wrapperClassName="w-full h-full"
            videoClassName="w-full h-full object-contain"
            muted={false}
          />
        )}
      </div>
    </div>
  )
}

export default FullVideo
