import React from 'react'

import type { Footer, Media } from '@/payload-types'

import { getCachedGlobal } from '@/utils/getGlobals'
import { GenericImage, GenericParagraph } from '@/components/Generic'
import Link from 'next/link'
import { generateHref, LinkObject } from '@/utils/generateHref'

export async function Footer() {
  const footerData: Footer = (await getCachedGlobal('footer', 1)()) as Footer

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

            <Link
              href={`tel:+359877757765`}
              className="font-georgia font-[400] text-[16px] leading-[120%] text-primaryYellow flex items-center gap-2"
            >
              <p>Executed by: </p>
              <div className="flex justify-center items-center">
                <svg
                  width="97.2"
                  height="30.5"
                  viewBox="0 0 175 55"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    y="3"
                    width="175"
                    height="52"
                    rx="26"
                    fill="url(#paint0_linear_131_8)"
                  ></rect>
                  <rect x="2" y="5" width="171" height="48" rx="24" fill="white"></rect>
                  <path
                    d="M30.5741 45H23.3741V12.84H40.1741C43.9501 12.84 46.9261 13.864 49.1021 15.912C51.3101 17.96 52.4141 20.808 52.4141 24.456C52.4141 28.104 51.3101 30.968 49.1021 33.048C46.8941 35.096 43.9181 36.12 40.1741 36.12H30.5741V45ZM39.4061 19.32H30.5741V29.64H39.4061C41.4861 29.64 42.9741 29.272 43.8701 28.536C44.7981 27.768 45.2621 26.408 45.2621 24.456C45.2621 22.536 44.7981 21.208 43.8701 20.472C42.9421 19.704 41.4541 19.32 39.4061 19.32ZM62.1679 45H54.9679V12.84H62.1679V45ZM73.3286 45.48C70.7366 45.48 68.7046 44.92 67.2326 43.8C65.7606 42.648 65.0246 41.064 65.0246 39.048C65.0246 35.4 67.6166 33.304 72.8006 32.76L83.1206 31.704V30.792C83.1206 29.256 82.7366 28.216 81.9686 27.672C81.2006 27.096 79.8406 26.808 77.8886 26.808C76.0326 26.808 74.7046 27.096 73.9046 27.672C73.1366 28.216 72.7526 29.16 72.7526 30.504V30.696H65.5046V30.552C65.5046 27.544 66.6726 25.112 69.0086 23.256C71.3446 21.4 74.4806 20.472 78.4166 20.472C82.3206 20.472 85.2646 21.4 87.2486 23.256C89.2326 25.112 90.2246 27.656 90.2246 30.888V45H83.5046V39.48H83.1206C82.5446 41.368 81.4246 42.84 79.7606 43.896C78.0966 44.952 75.9526 45.48 73.3286 45.48ZM72.2726 38.568C72.2726 39.784 73.3126 40.392 75.3926 40.392C77.9206 40.392 79.8086 40.056 81.0566 39.384C82.3366 38.68 83.0246 37.496 83.1206 35.832L74.7686 36.792C73.1046 36.92 72.2726 37.512 72.2726 38.568ZM101.074 45H93.8741V20.952H100.546V28.344H100.978C101.33 26.104 102.306 24.232 103.906 22.728C105.538 21.224 107.826 20.472 110.77 20.472C113.938 20.472 116.338 21.368 117.97 23.16C119.634 24.92 120.466 27.208 120.466 30.024V45H113.266V32.424C113.266 30.472 112.802 29.08 111.874 28.248C110.978 27.384 109.442 26.952 107.266 26.952C105.026 26.952 103.426 27.416 102.466 28.344C101.538 29.272 101.074 30.776 101.074 32.856V45Z"
                    fill="#082B49"
                  ></path>
                  <path
                    d="M153.724 45H123.58V38.52L142.492 19.848V19.32H124.012V12.84H153.34V19.32L133.804 37.992V38.52H153.724V45Z"
                    fill="#0E98E9"
                  ></path>
                  <defs>
                    <linearGradient
                      id="paint0_linear_131_8"
                      x1="108.387"
                      y1="55"
                      x2="73.1128"
                      y2="-0.418608"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#082B49"></stop>
                      <stop offset="0.497135" stopColor="#0E98E9"></stop>
                      <stop offset="1" stopColor="#082B49"></stop>
                    </linearGradient>
                  </defs>
                </svg>
              </div>{' '}
            </Link>
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
