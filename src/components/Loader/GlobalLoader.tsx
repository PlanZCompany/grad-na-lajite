import React from 'react'
import Image from 'next/image'

const GlobalLoader = ({ color = '#FFF' }: { color: string }) => {
  return (
    <div className="w-full h-full flex relative overflow-hidden flex-col justify-center">
      <div className="w-fit mx-auto relative">
        <div className="absolute z-[10] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <Image
            src="/logo.png"
            alt="logo"
            width={66}
            height={101}
            className="w-full h-full object-contain"
          />
        </div>
        <svg
          width="250"
          height="250"
          viewBox="0 0 200 200"
          className="text-[{color}] animate-spin origin-center w-[250px] h-[250px]"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          color={color}
        >
          <defs>
            <linearGradient id="spinner-secondHalf">
              <stop offset="0%" stopOpacity="0" stopColor="currentColor" />
              <stop offset="100%" stopOpacity="0.5" stopColor="currentColor" />
            </linearGradient>
            <linearGradient id="spinner-firstHalf">
              <stop offset="0%" stopOpacity="1" stopColor="currentColor" />
              <stop offset="100%" stopOpacity="0.5" stopColor="currentColor" />
            </linearGradient>
          </defs>
          <g strokeWidth="8">
            <path stroke="url(#spinner-secondHalf)" d="M 4 100 A 96 96 0 0 1 196 100" />
            <path stroke="url(#spinner-firstHalf)" d="M 196 100 A 96 96 0 0 1 4 100" />
            <path stroke="currentColor" strokeLinecap="round" d="M 4 100 A 96 96 0 0 1 4 98" />
          </g>
        </svg>
      </div>
    </div>
  )
}

export default GlobalLoader