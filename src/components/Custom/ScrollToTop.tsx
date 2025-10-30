'use client'

import React, { useEffect, useState } from 'react'
import { ArrowIcon } from '@/assets/icons'

const clamp = (v: number, min = 0, max = 100) => Math.min(max, Math.max(min, v))

export default function ScrollToTop() {
  const [isActive, setIsActive] = useState(false)
  const [progress, setProgress] = useState(0) // 0–100 (%)

  useEffect(() => {
    const onScroll = () => {
      const root = document.scrollingElement || document.documentElement
      const total = root.scrollHeight
      const viewport = window.innerHeight
      const maxScroll = Math.max(total - viewport, 1)
      const y = window.scrollY || 0

      const pct = clamp((y / maxScroll) * 100)
      setProgress(pct)
      setIsActive(y > 100)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <div
      className={`fixed bottom-2 right-2 md:bottom-4 md:right-4 w-10 h-10 md:w-12 md:h-12 flex rounded-full overflow-hidden z-10
        transform transition-[transform,opacity] duration-500 ease-in-out
        ${
          isActive
            ? progress === 100
              ? 'md:translate-y-[-24px] opacity-100 pointer-events-auto'
              : 'translate-y-0 opacity-100 pointer-events-auto'
            : 'translate-y-5 md:translate-y-6 opacity-0 pointer-events-none'
        }`}
    >
      <div className="absolute inset-0 rounded-full bg-gray-400" />

      <div
        className="absolute inset-x-0 top-0 rounded-b-full bg-bordo"
        style={{ height: `${progress}%` }}
      />

      <button
        aria-label="Scroll to top"
        onClick={scrollToTop}
        className="relative z-10 m-auto w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center bg-pink"
        type="button"
      >
        <div className="w-full h-full rounded-full flex items-center justify-center">
          <div className="w-6 h-6 flex items-center justify-center -rotate-90">
            <ArrowIcon color="#574143" />
          </div>
        </div>
      </button>
    </div>
  )
}
