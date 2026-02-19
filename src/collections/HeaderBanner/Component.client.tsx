'use client'

import React, { useEffect, useMemo, useState } from 'react'
import { HeaderBanner, Media } from '@/payload-types'
import GenericImage from '@/components/Generic/GenericImage'
import Link from 'next/link'
import { generateHref, LinkObject } from '@/utils/generateHref'

const ROTATION_INTERVAL_MS = 3000
const ROTATION_TRANSITION_MS = 450

type BannerMode = 'mobile' | 'desktop'

const getBannerContainerClass = (mode: BannerMode) =>
  mode === 'mobile'
    ? 'w-full py-[10px] flex gap-[10px] items-center justify-center md:hidden'
    : 'w-full hidden gap-[10px] py-[10px] items-center justify-center text-center md:flex'

const getBannerIconClass = (mode: BannerMode) =>
  mode === 'mobile' ? 'size-[20px] aspect-square' : 'size-[40px] aspect-square'

const renderBannerContent = (banner: HeaderBanner, mode: BannerMode) => {
  const hasLink = Boolean(
    banner.link && banner.link.label && (banner.link.url || banner.link.reference),
  )

  return (
    <>
      {banner.icon && (
        <div className={getBannerIconClass(mode)}>
          <GenericImage
            src={(banner.icon as Media).url || ''}
            alt={(banner.icon as Media).alt || ''}
            wrapperClassName="w-full h-full relative"
            imageClassName="object-contain w-full h-full"
            fill={true}
          />
        </div>
      )}

      <p className="font-georgia font-400">{banner.textContent}</p>

      {hasLink && (
        <Link
          href={generateHref(banner as unknown as LinkObject)}
          target={banner.link?.newTab ? '_blank' : '_self'}
        >
          {banner.link?.label}
        </Link>
      )}
    </>
  )
}

const renderBanner = (banner: HeaderBanner, mode: BannerMode) => {
  return (
    <div
      style={{
        backgroundColor: banner.backgroundColor,
        color: banner.textColor,
      }}
      className={getBannerContainerClass(mode)}
    >
      {renderBannerContent(banner, mode)}
    </div>
  )
}

const HeaderBannersClient = ({
  staticBannerMobile,
  staticBannerDesktop,
  rotatingBannersMobile,
  rotatingBannersDesktop,
}: {
  staticBannerMobile?: HeaderBanner
  staticBannerDesktop?: HeaderBanner
  rotatingBannersMobile?: HeaderBanner[]
  rotatingBannersDesktop?: HeaderBanner[]
}) => {
  const [mobileRotatingIndex, setMobileRotatingIndex] = useState(0)
  const [desktopRotatingIndex, setDesktopRotatingIndex] = useState(0)
  const [mobileCanAnimate, setMobileCanAnimate] = useState(true)
  const [desktopCanAnimate, setDesktopCanAnimate] = useState(true)

  const mobileRotatingCount = rotatingBannersMobile?.length || 0
  const desktopRotatingCount = rotatingBannersDesktop?.length || 0

  const mobileSlides = useMemo(() => {
    if (!rotatingBannersMobile?.length) return []
    if (rotatingBannersMobile.length === 1) return rotatingBannersMobile
    return [...rotatingBannersMobile, rotatingBannersMobile[0]]
  }, [rotatingBannersMobile])

  const desktopSlides = useMemo(() => {
    if (!rotatingBannersDesktop?.length) return []
    if (rotatingBannersDesktop.length === 1) return rotatingBannersDesktop
    return [...rotatingBannersDesktop, rotatingBannersDesktop[0]]
  }, [rotatingBannersDesktop])

  useEffect(() => {
    setMobileRotatingIndex(0)
    setMobileCanAnimate(true)
  }, [mobileRotatingCount])

  useEffect(() => {
    if (mobileRotatingCount < 2) return

    const intervalId = window.setInterval(() => {
      setMobileRotatingIndex((prev) => prev + 1)
    }, ROTATION_INTERVAL_MS)

    return () => {
      window.clearInterval(intervalId)
    }
  }, [mobileRotatingCount])

  useEffect(() => {
    setDesktopRotatingIndex(0)
    setDesktopCanAnimate(true)
  }, [desktopRotatingCount])

  useEffect(() => {
    if (desktopRotatingCount < 2) return

    const intervalId = window.setInterval(() => {
      setDesktopRotatingIndex((prev) => prev + 1)
    }, ROTATION_INTERVAL_MS)

    return () => {
      window.clearInterval(intervalId)
    }
  }, [desktopRotatingCount])

  const onMobileTransitionEnd = () => {
    if (mobileRotatingCount < 2) return
    if (mobileRotatingIndex < mobileRotatingCount) return

    setMobileCanAnimate(false)
    setMobileRotatingIndex(0)

    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        setMobileCanAnimate(true)
      })
    })
  }

  const onDesktopTransitionEnd = () => {
    if (desktopRotatingCount < 2) return
    if (desktopRotatingIndex < desktopRotatingCount) return

    setDesktopCanAnimate(false)
    setDesktopRotatingIndex(0)

    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        setDesktopCanAnimate(true)
      })
    })
  }

  return (
    <div className="relative w-[100vw]">
      {/* static */}
      {/* mobile */}
      {staticBannerMobile && renderBanner(staticBannerMobile, 'mobile')}
      {/* desktop */}
      {staticBannerDesktop && renderBanner(staticBannerDesktop, 'desktop')}

      {/* rotating */}
      <div>
        {!!mobileSlides.length && (
          <div className="w-full overflow-hidden md:hidden">
            <div
              className="flex w-full"
              style={{
                transform: `translate3d(-${mobileRotatingIndex * 100}%, 0, 0)`,
                transition: mobileCanAnimate
                  ? `transform ${ROTATION_TRANSITION_MS}ms ease-in-out`
                  : 'none',
              }}
              onTransitionEnd={onMobileTransitionEnd}
            >
              {mobileSlides.map((banner, index) => (
                <div
                  key={`${banner.id}-${index}`}
                  style={{
                    backgroundColor: banner.backgroundColor,
                    color: banner.textColor,
                  }}
                  className="w-full shrink-0 py-[10px] flex gap-[10px] items-center justify-center"
                >
                  {renderBannerContent(banner, 'mobile')}
                </div>
              ))}
            </div>
          </div>
        )}

        {!!desktopSlides.length && (
          <div className="hidden w-full overflow-hidden md:block">
            <div
              className="flex w-full"
              style={{
                transform: `translate3d(-${desktopRotatingIndex * 100}%, 0, 0)`,
                transition: desktopCanAnimate
                  ? `transform ${ROTATION_TRANSITION_MS}ms ease-in-out`
                  : 'none',
              }}
              onTransitionEnd={onDesktopTransitionEnd}
            >
              {desktopSlides.map((banner, index) => (
                <div
                  key={`${banner.id}-${index}`}
                  style={{
                    backgroundColor: banner.backgroundColor,
                    color: banner.textColor,
                  }}
                  className="w-full shrink-0 py-[10px] flex gap-[10px] items-center justify-center text-center"
                >
                  {renderBannerContent(banner, 'desktop')}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default HeaderBannersClient
