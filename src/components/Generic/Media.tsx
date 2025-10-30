import { Media as MediaProps } from '@/payload-types'
import React from 'react'
import GenericImage from './GenericImage'
import { BackgroundOverlay } from '../Custom'
import GenericVideo from './GenericVideo'

export type ExtraMediaProps = {
  wrapperClassName: string
  backgroundOverlay?: boolean
  videoClassName?: string
  imageClassName?: string
  style?: React.CSSProperties
  fill?: boolean
  observe?: boolean
  priority?: boolean
  imageSizes?: string
  unoptimized?: boolean
  mobileImage?: boolean
  fetchPriority?: 'auto' | 'low' | 'high'
  sizes?: { small?: { url: string } }
}

export const GenericMedia = (props: MediaProps & ExtraMediaProps) => {
  const isVideo = typeof props === 'object' && props?.mimeType?.includes('video')

  const haveBackgroundOverlay = props?.backgroundOverlay

  let mobileUrl = props.sizes?.small?.url
  if (props?.updatedAt) mobileUrl = mobileUrl + `?v=${props?.updatedAt}`
  const desktopUrl = props?.updatedAt ? props?.url + `?v=${props?.updatedAt}` : props?.url

  return (
    <>
      {isVideo ? (
        <>
          {haveBackgroundOverlay && <BackgroundOverlay />}
          <GenericVideo
            src={props?.url as string}
            wrapperClassName={props.wrapperClassName}
            style={props.style ? props.style : {}}
            videoClassName={props.videoClassName}
          />
        </>
      ) : (
        <>
          {haveBackgroundOverlay && <BackgroundOverlay />}
          <GenericImage
            src={desktopUrl as string}
            wrapperClassName={props.wrapperClassName}
            alt={props?.alt}
            imageClassName={props.imageClassName}
            fill={props.fill ? props.fill : false}
            observe={props?.observe ? props?.observe : false}
            priority={props?.priority ? props?.priority : false}
            sizes={props?.imageSizes ? props?.imageSizes : '(max-width: 768px) 100vw'}
            unoptimized={props?.unoptimized ? props?.unoptimized : false}
            focalX={props?.focalX ? props?.focalX : 50}
            focalY={props?.focalY ? props?.focalY : 50}
            mobileUrl={props.mobileImage ? mobileUrl : undefined}
            fetchPriority={props?.fetchPriority}
            updatedAt={props?.updatedAt}
          />
        </>
      )}
    </>
  )
}

export default GenericMedia
