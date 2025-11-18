import React from 'react'

import type { Footer, Media } from '@/payload-types'

import { getCachedGlobal } from '@/utils/getGlobals'
import { GenericImage, GenericParagraph } from '@/components/Generic'
import Link from 'next/link'
import { generateHref, LinkObject } from '@/utils/generateHref'

export async function Footer() {
  const footerData: Footer = await getCachedGlobal('footer', 1)()

  const media = footerData.logo as Media

  const socialLinks = footerData.socialLinks?.map((link) => {
    const media = link.media as Media

    return (
      <li
        key={link.id}
        className="
      hover:scale-105 transition-transform duration-300 ease-in-out"
      >
        <a
          href={link.link.url || '#'}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${link.link.label} link`}
          className="block"
        >
          <span className="relative block h-[75px] w-[75px]">
            <GenericImage
              src={media?.url || ''}
              alt={media?.alt || ''}
              wrapperClassName="absolute inset-0"
              imageClassName="object-contain"
              sizes="715px"
              fill={true}
            />
          </span>
        </a>
      </li>
    )
  })

  const securityContent = footerData.securityLinks?.map((link) => {
    const media = link.media as Media

    return (
      <li key={link.id} className="relative h-[75px] w-[75px] badge">
        <GenericImage
          src={media.url || ''}
          alt={media.alt || ''}
          wrapperClassName="absolute inset-0"
          imageClassName="object-contain"
          sizes="112px"
          fill={true}
        />
      </li>
    )
  })

  const paymentLinks = footerData.paymentLinks?.map((link) => {
    const media = link.media as Media

    return (
      <li key={link.id} className="relative w-[50px] aspect-video">
        <GenericImage
          src={media.url || ''}
          alt={media.alt || ''}
          wrapperClassName="absolute inset-0"
          imageClassName="object-contain"
          sizes="250px"
          fill={true}
        />
      </li>
    )
  })

  const navigationContent = footerData.navItems?.map((navItem) => {
    return (
      <li key={navItem.id} className="w-full flex justify-center md:justify-end">
        <Link href={generateHref(navItem as LinkObject)} aria-label={navItem.link.label}>
          <span className="text-primaryYellow hover:text-white transition-colors duration-300 ease-in-out">
            {navItem.link.label}
          </span>
        </Link>
      </li>
    )
  })

  return (
    <footer className="bg-[rgba(20,10,40,0.85)] w-full relative py-10 md:py-20">
      <GenericImage
        src="/Footer.jpg"
        alt="Footer background"
        wrapperClassName="w-full h-full absolute top-0 left-0 z-[0]"
        imageClassName="w-full h-full object-cover"
        fill={true}
        sizes="100vw"
      />
      <div className="content_wrapper px-4 py-10 footer-overlay">
        <div className="grid gap-10 xl:grid-cols-3">
          {/* Left */}
          <section
            aria-labelledby="footer-brand"
            className="w-full flex flex-col justify-center items-center"
          >
            <h2 id="footer-brand" className="sr-only">
              Бранд и авторски права
            </h2>
            <div className="relative w-[150px] h-[150px]">
              <GenericImage
                src={media?.url || ''}
                alt={media?.alt || ''}
                wrapperClassName="absolute inset-0"
                imageClassName="object-contain"
                sizes="160px"
                fill={true}
              />
            </div>
            {footerData.contacts && (
              <div className="w-full flex justify-center items-center">
                <GenericParagraph
                  pType="small"
                  textColor="text-primaryYellow"
                  extraClass="text-center"
                >
                  © {new Date().getFullYear()} Град на Лъжите. Всички права запазени. Създадено с
                  ❤️ от anilevi.soulwalks™ game
                </GenericParagraph>
              </div>
            )}
          </section>

          {/* Center */}
          <section
            aria-labelledby="footer-social"
            className="flex flex-col gap-10 justify-center items-center"
          >
            <h2 id="footer-social" className="sr-only">
              Социални мрежи и доверие
            </h2>

            {/* Social */}
            <ul className="flex items-center gap-4" aria-label="Социални мрежи">
              {socialLinks}
            </ul>

            {/* Trust badges */}
            <ul
              className="flex flex-wrap items-center justify-center gap-4"
              aria-label="Знаци за доверие"
            >
              {securityContent}
            </ul>
          </section>

          {/* Right */}
          <section
            aria-labelledby="footer-links"
            className="flex flex-col justify-center items-center gap-m"
          >
            <h2 id="footer-links" className="sr-only">
              Плащания и връзки
            </h2>

            <ul
              className="flex flex-wrap items-center justify-center gap-4"
              aria-label="Поддържани плащания и доставки"
            >
              {paymentLinks}
            </ul>

            <nav aria-label="Правни документи">
              <ul className="flex flex-col justify-center items-center gap-2">
                {navigationContent}
              </ul>
            </nav>
          </section>
        </div>
      </div>
    </footer>
  )
}
