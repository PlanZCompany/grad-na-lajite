'use client'

import { useEffect, useState } from 'react'
import { GenericButton, GenericImage } from '../Generic'
import Link from 'next/link'
import { getCookieConsent, setCookieConsent } from './CookieConsent'
import { initAnalyticsTools } from './Analytics'

interface CookieBannerProps {
  onAcceptAll?: () => void
  onAcceptNecessary?: () => void
}

const CookieBanner: React.FC<CookieBannerProps> = ({ onAcceptAll, onAcceptNecessary }) => {
  const [isOpen, setIsOpen] = useState(true)

  useEffect(() => {
    const existing = getCookieConsent()

    if (!existing) {
      setIsOpen(true)
    }
  }, [])

  if (!isOpen) return null

  const handleAcceptAll = () => {
    setCookieConsent('all')
    initAnalyticsTools()
    onAcceptAll?.()
    setIsOpen(false)
  }

  const handleAcceptNecessary = () => {
    setCookieConsent('necessary')
    onAcceptNecessary?.()
    setIsOpen(false)
  }

  return (
    <div className="fixed bottom-0 left-0 z-50 right-0">
      <div
        className="flex flex-col gap-3 bg-purpleLight 
      px-4 py-3 md:py-4 text-sm text-slate-50 shadow-2xl md:flex-row md:items-center md:justify-between md:gap-6"
      >
        <div className="md:pl-4">
          <div className="flex items-center mb-1">
            <GenericImage
              src="/static/cookie-image.png"
              alt="cookie"
              wrapperClassName="w-6 h-6 md:w-8 md:h-8 relative"
              imageClassName="w-full h-full object-contain"
              fill={true}
            ></GenericImage>
            <h2 className=" text-base font-semibold">Бисквитки</h2>
          </div>

          <p className="text-primaryYellow">
            В „Град на Лъжите“ използваме бисквитки, за да пазим тайните ти в безопасност и да
            направим преживяването по-добро. <br /> Някои са нужни, за да работи сайтът, а други
            помагат да разберем как го използваш.{' '}
            <Link href="/cookie-policy" className="w-full text-white text-center">
              <span className="font-georgia font-[400] text-white text-[14px] underline hover:opacity-80">
                Политика за бисквитки
              </span>
            </Link>
          </p>
        </div>

        <div className="flex flex-col items-center gap-2 justify-center">
          <GenericButton
            type="button"
            styleClass="!text-[12px] !px-2 !py-1"
            click={handleAcceptAll}
          >
            <p className="text-white">Приемам всички</p>
          </GenericButton>
          <button
            type="button"
            className="underline text-white hover:opacity-80"
            onClick={handleAcceptNecessary}
          >
            <p className="underline">Само нужните</p>
          </button>
        </div>
      </div>
    </div>
  )
}

export default CookieBanner
