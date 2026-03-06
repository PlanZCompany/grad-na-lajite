'use client'

import React, { useEffect, useMemo, useRef, useState } from 'react'
import { HeaderBanner, Media } from '@/payload-types'
import GenericImage from '@/components/Generic/GenericImage'
import Link from 'next/link'
import { generateHref, LinkObject } from '@/utils/generateHref'

const TICKER_MIN_DURATION_SECONDS = 22
const TICKER_MAX_REPEAT_COUNT = 20
const SCROLL_TOP_SHOW_THRESHOLD = 40
const SCROLL_DIRECTION_THRESHOLD = 6

const TICKER_SPEED_PX_PER_SECOND: Record<BannerMode, number> = {
  mobile: 44,
  desktop: 56,
}

type BannerMode = 'mobile' | 'desktop'

const getBannerContainerClass = (mode: BannerMode) =>
  mode === 'mobile'
    ? 'w-full py-[10px] flex gap-[10px] items-center justify-center md:hidden'
    : 'w-full hidden gap-[10px] py-[10px] items-center justify-center text-center md:flex'

const getBannerIconClass = (mode: BannerMode) =>
  mode === 'mobile' ? 'size-[20px] aspect-square' : 'size-[40px] aspect-square'

const getTickerViewportClass = (mode: BannerMode) =>
  mode === 'mobile' ? 'w-full overflow-hidden md:hidden' : 'hidden w-full overflow-hidden md:block'

const getTickerItemClass = (mode: BannerMode) =>
  mode === 'mobile'
    ? 'header-banner-ticker-item inline-flex min-h-[34px] shrink-0 items-center justify-center gap-[8px] whitespace-nowrap px-[10px] py-[6px]'
    : 'header-banner-ticker-item inline-flex min-h-[48px] shrink-0 items-center justify-center gap-[10px] whitespace-nowrap px-[12px] py-[8px]'

const buildBaseTickerBanners = (banners: HeaderBanner[]) => {
  if (!banners.length) return []
  if (banners.length === 1) return [banners[0], banners[0], banners[0], banners[0]]
  return banners
}

const getBannerIconData = (banner: HeaderBanner) => {
  if (!banner.icon || typeof banner.icon !== 'object') return null

  const icon = banner.icon as Media
  if (!icon.url) return null

  return {
    src: icon.url,
    alt: icon.alt || 'Banner icon',
  }
}

const renderBannerContent = (banner: HeaderBanner, mode: BannerMode) => {
  const hasLink = Boolean(
    banner.link && banner.link.label && (banner.link.url || banner.link.reference),
  )
  const iconData = getBannerIconData(banner)

  return (
    <>
      {iconData && (
        <div className={getBannerIconClass(mode)}>
          <GenericImage
            src={iconData.src}
            alt={iconData.alt}
            wrapperClassName="w-full h-full relative"
            imageClassName="object-contain w-full h-full"
            fill={true}
          />
        </div>
      )}

      <p className="text-[14px] md:text-base font-georgia font-[400] leading-[120%]">
        {banner.textContent}
      </p>

      {hasLink && (
        <Link
          href={generateHref(banner as unknown as LinkObject)}
          target={banner.link?.newTab ? '_blank' : '_self'}
          className="font-georgia font-[700] text-[12px] md:text-base underline underline-offset-[2px] opacity-90 hover:opacity-100 transition-opacity duration-300 ease-in-out"
          prefetch={false}
        >
          {banner.link?.label}
        </Link>
      )}
    </>
  )
}

const renderTickerItem = (
  banner: HeaderBanner,
  mode: BannerMode,
  key: string,
  options?: { measureOnly?: boolean },
) => {
  const hasLink = Boolean(
    banner.link && banner.link.label && (banner.link.url || banner.link.reference),
  )
  const iconData = getBannerIconData(banner)
  const isMeasureOnly = Boolean(options?.measureOnly)
  const paragraphClass =
    'font-georgia font-[400] whitespace-nowrap leading-[120%] text-[13px] md:text-[14px]'
  const linkClass =
    'font-georgia font-[700] whitespace-nowrap underline underline-offset-[2px] opacity-90'

  return (
    <div
      key={key}
      style={{
        backgroundColor: banner.backgroundColor,
        color: banner.textColor,
      }}
      className={getTickerItemClass(mode)}
    >
      {iconData && (
        <div className={getBannerIconClass(mode)}>
          {isMeasureOnly ? (
            <span className="block h-full w-full" />
          ) : (
            <img
              src={iconData.src}
              alt={iconData.alt}
              className="h-full w-full object-contain"
              loading="lazy"
              decoding="async"
            />
          )}
        </div>
      )}

      <p className={paragraphClass}>{banner.textContent}</p>

      {hasLink &&
        (isMeasureOnly ? (
          <span className={linkClass}>{banner.link?.label}</span>
        ) : (
          <Link
            href={generateHref(banner as unknown as LinkObject)}
            target={banner.link?.newTab ? '_blank' : '_self'}
            className={linkClass}
            prefetch={false}
          >
            {banner.link?.label}
          </Link>
        ))}
    </div>
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

const RotatingTicker = ({
  banners,
  mode,
}: {
  banners: HeaderBanner[] | undefined
  mode: BannerMode
}) => {
  const baseBanners = useMemo(() => buildBaseTickerBanners(banners || []), [banners])
  const containerRef = useRef<HTMLDivElement | null>(null)
  const measureRef = useRef<HTMLDivElement | null>(null)
  const [repeatCount, setRepeatCount] = useState(2)
  const [distancePx, setDistancePx] = useState(0)
  const [durationSec, setDurationSec] = useState(TICKER_MIN_DURATION_SECONDS)

  const baseSignature = useMemo(
    () => baseBanners.map((banner) => `${banner.id || ''}-${banner.textContent || ''}`).join('|'),
    [baseBanners],
  )

  useEffect(() => {
    if (!baseBanners.length || !containerRef.current || !measureRef.current) return

    const containerEl = containerRef.current
    const measureEl = measureRef.current

    const compute = () => {
      const containerW = Math.ceil(containerEl.getBoundingClientRect().width)
      const baseW = Math.ceil(measureEl.scrollWidth)

      if (!containerW || !baseW) return

      const repeatsNeeded = Math.max(2, Math.ceil((containerW * 2) / baseW))
      const repeatsSafe = Math.min(TICKER_MAX_REPEAT_COUNT, repeatsNeeded)
      const runDistance = baseW * repeatsSafe
      const nextDuration = Math.max(
        TICKER_MIN_DURATION_SECONDS,
        runDistance / TICKER_SPEED_PX_PER_SECOND[mode],
      )

      setRepeatCount((prev) => (prev === repeatsSafe ? prev : repeatsSafe))
      setDistancePx((prev) => (Math.abs(prev - runDistance) < 1 ? prev : runDistance))
      setDurationSec((prev) => (Math.abs(prev - nextDuration) < 0.1 ? prev : nextDuration))
    }

    compute()
    const resizeObserver =
      typeof ResizeObserver !== 'undefined' ? new ResizeObserver(compute) : null

    resizeObserver?.observe(containerEl)
    resizeObserver?.observe(measureEl)

    return () => {
      resizeObserver?.disconnect()
    }
  }, [baseBanners.length, baseSignature, mode])

  if (!baseBanners.length) return null

  const renderRun = (keyPrefix: string, measureOnly = false) => (
    <div className="header-banner-ticker-run" key={keyPrefix}>
      {Array.from({ length: measureOnly ? 1 : repeatCount }).map((_, repeatIndex) => (
        <React.Fragment key={`${keyPrefix}-repeat-${repeatIndex}`}>
          {baseBanners.map((banner, index) =>
            renderTickerItem(banner, mode, `${keyPrefix}-${repeatIndex}-${index}`, { measureOnly }),
          )}
        </React.Fragment>
      ))}
    </div>
  )

  const shouldAnimate = distancePx > 0 && durationSec > 0

  return (
    <div ref={containerRef} className={getTickerViewportClass(mode)}>
      <div className="header-banner-ticker-measure" aria-hidden={true}>
        <div ref={measureRef}>{renderRun('measure', true)}</div>
      </div>

      <div className="header-banner-ticker-wrapper">
        <div
          className={`header-banner-ticker-track ${shouldAnimate ? 'header-banner-ticker-animate' : ''}`}
          style={
            {
              ['--header-banner-distance' as string]: `${distancePx}px`,
              ['--header-banner-duration' as string]: `${durationSec}s`,
            } as React.CSSProperties
          }
          aria-live="off"
        >
          {renderRun('track-a')}
          {renderRun('track-b')}
        </div>
      </div>
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
  const [isBannerSectionVisible, setIsBannerSectionVisible] = useState(true)
  const lastScrollYRef = useRef(0)
  const scrollRafRef = useRef<number | null>(null)
  const isVisibleRef = useRef(true)

  useEffect(() => {
    if (typeof window === 'undefined') return

    lastScrollYRef.current = window.scrollY

    const updateVisibilityOnScroll = () => {
      scrollRafRef.current = null

      const currentScrollY = window.scrollY
      const scrollDelta = currentScrollY - lastScrollYRef.current
      const isNearTop = currentScrollY <= SCROLL_TOP_SHOW_THRESHOLD

      let nextVisible = isVisibleRef.current

      if (isNearTop || scrollDelta < -SCROLL_DIRECTION_THRESHOLD) {
        nextVisible = true
      } else if (scrollDelta > SCROLL_DIRECTION_THRESHOLD) {
        nextVisible = false
      }

      if (nextVisible !== isVisibleRef.current) {
        isVisibleRef.current = nextVisible
        setIsBannerSectionVisible(nextVisible)
      }

      lastScrollYRef.current = currentScrollY
    }

    const onScroll = () => {
      if (scrollRafRef.current !== null) return
      scrollRafRef.current = window.requestAnimationFrame(updateVisibilityOnScroll)
    }

    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', onScroll)
      if (scrollRafRef.current !== null) {
        window.cancelAnimationFrame(scrollRafRef.current)
      }
    }
  }, [])

  return (
    <div
      className={`relative w-[100vw] overflow-hidden transition-all duration-300 ease-out ${isBannerSectionVisible ? 'max-h-[220px] translate-y-0 opacity-100' : 'pointer-events-none max-h-0 -translate-y-2 opacity-0'}`}
    >
      {staticBannerMobile && renderBanner(staticBannerMobile, 'mobile')}
      {staticBannerDesktop && renderBanner(staticBannerDesktop, 'desktop')}

      <RotatingTicker banners={rotatingBannersMobile} mode="mobile" />
      <RotatingTicker banners={rotatingBannersDesktop} mode="desktop" />

      <style jsx global>{`
        .header-banner-ticker-wrapper {
          overflow: hidden;
          white-space: nowrap;
        }

        .header-banner-ticker-track {
          display: flex;
          align-items: stretch;
          flex-wrap: nowrap;
          white-space: nowrap;
          width: max-content;
          will-change: transform;
        }

        .header-banner-ticker-run {
          display: inline-flex;
          align-items: stretch;
          flex-wrap: nowrap;
          white-space: nowrap;
          width: max-content;
        }

        .header-banner-ticker-item {
          flex: 0 0 auto;
          white-space: nowrap;
        }

        .header-banner-ticker-animate {
          animation: header-banner-scroll var(--header-banner-duration) linear infinite;
        }

        .header-banner-ticker-wrapper:hover .header-banner-ticker-track,
        .header-banner-ticker-wrapper:focus-within .header-banner-ticker-track {
          animation-play-state: paused;
        }

        .header-banner-ticker-measure {
          position: absolute;
          pointer-events: none;
          opacity: 0;
          height: 0;
          overflow: hidden;
          white-space: nowrap;
        }

        @keyframes header-banner-scroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(calc(-1 * var(--header-banner-distance)));
          }
        }
      `}</style>
    </div>
  )
}

export default HeaderBannersClient
