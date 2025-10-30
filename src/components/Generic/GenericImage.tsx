'use client'
import React from 'react'

import Image from 'next/image'

type ImageProps = {
  src: string
  alt: string
  wrapperClassName: string
  imageClassName?: string
  fill?: boolean
  sizes?: string
  priority?: boolean
  placeholderImage?: boolean
  unoptimized?: boolean
  observe?: boolean
  focalX?: number
  focalY?: number
  mobileUrl?: string | undefined | null
  fetchPriority?: 'auto' | 'low' | 'high'
  updatedAt?: string
}
const clampPct = (n: number | undefined, fallback = 50) => Math.min(100, Math.max(0, n ?? fallback))

const GenericImage = ({
  src,
  alt,
  wrapperClassName,
  imageClassName,
  fill = true,
  sizes = '(max-width: 768px) 100vw',
  priority = false,
  placeholderImage = true,
  unoptimized = false,
  focalX = 50,
  focalY = 50,
  mobileUrl,
  fetchPriority = 'auto',
  updatedAt = '',
}: ImageProps) => {
  const [loaded, setLoaded] = React.useState(false)

  const objPos = `${clampPct(focalX)}% ${clampPct(focalY)}%`

  const mobileUrlScr = updatedAt ? `${mobileUrl}?v=${updatedAt}` : mobileUrl
  const desktopUrlSrc = updatedAt ? `${src}?v=${updatedAt}` : src

  //TODO! correct images .../api/media/file

  return (
    <div className={`${wrapperClassName} overflow-x-clip`}>
      {!loaded && placeholderImage && (
        <div className="absolute z-[10] inset-0 flex">{/* <PlaceholderImage /> */}</div>
      )}

      <picture>
        {!!mobileUrl && <source media="(max-width: 768px)" srcSet={mobileUrlScr!.replace('/api/media/file', '')} />}
        <Image
          src={desktopUrlSrc!.replace('/api/media/file', '')}
          alt={alt || 'Content'}
          fill={fill}
          sizes={sizes}
          className={imageClassName || ''}
          priority={priority}
          onLoad={() => {
            setLoaded(true)
          }}
          unoptimized={unoptimized}
          style={{ objectPosition: objPos }}
          fetchPriority={fetchPriority}
          aria-hidden={unoptimized ? true : false}
        />
      </picture>
    </div>
  )
}

export default GenericImage
