'use client'

import { useEffect, useState } from 'react'
import { GenericButton } from '../Generic'
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
    <div className="fixed bottom-4 left-1/2 z-50 w-[calc(100%-2rem)] max-w-3xl -translate-x-1/2">
      <div className="flex flex-col gap-3 rounded-xl bg-purpleLight px-4 py-3 md:py-4 text-sm text-slate-50 shadow-2xl md:flex-row md:items-center md:justify-between md:gap-6">
        <div>
          <h2 className="mb-1 text-base font-semibold">Бисквитки</h2>

          <p className="text-slate-200">
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

        <div className="flex flex-wrap items-center gap-2 justify-center">
          <button
            type="button"
            className="underline text-white hover:opacity-80"
            onClick={handleAcceptNecessary}
          >
            <p className="underline">Само нужните</p>
          </button>

          <GenericButton
            type="button"
            styleClass="!text-[12px] !px-2 !py-1"
            click={handleAcceptAll}
          >
            <p className="text-white">Приемам всички</p>
          </GenericButton>
        </div>
      </div>
    </div>
  )
}

export default CookieBanner
