'use client'

import FullVideo from '@/components/Custom/FullVideo'
import {
  GenericButton,
  GenericHeading,
  GenericImage,
  GenericParagraph,
  GenericVideo,
} from '@/components/Generic'
import { useAppSelector } from '@/hooks/redux-hooks'
import { useCheckout } from '@/hooks/useCheckout'
import { Media, ProductBlock } from '@/payload-types'
import { RichText } from '@payloadcms/richtext-lexical/react'
import React, { useState } from 'react'

const ProductHero = ({ hero }: { hero: ProductBlock['hero'] }) => {
  const [isActive, setIsActive] = useState(false)
  const [videoSrc, setVideoSrc] = useState('')
  const mainProduct = useAppSelector((state) => state.root.mainProduct)
  const { addProductToShoppingCartFullProcess } = useCheckout()

  const [currentMediaIndex, setCurrentMediaIndex] = useState(0)
  const productMedia = mainProduct?.mediaArray?.[currentMediaIndex]?.file as Media

  const currentMediaType = productMedia?.mimeType?.includes('video') ? 'video' : 'image'

  const mediaMenu = mainProduct?.mediaArray?.map((currentMedia, index) => {
    const image = currentMedia.file as Media
    const mediaType = !!image && image?.mimeType?.includes('video') ? 'video' : 'image'

    const isActive = index === currentMediaIndex

    return (
      <li className="w-full h-full relative" key={index}>
        {isActive && (
          <div className="absolute bottom-0 left-2 right-2 h-[4px] bg-purpleLight z-[0] rounded-[4px]" />
        )}
        <button
          className="w-full h-full flex items-center justify-center relative hover:translate-y-[-2px] transition-transform duration-300 ease-in-out"
          aria-label="Избери снимка"
          onClick={() => {
            setCurrentMediaIndex(index)
          }}
        >
          {mediaType === 'video' || !!currentMedia.externalVideo ? (
            <GenericVideo
              src={!!currentMedia.externalVideo ? currentMedia.externalVideo : image?.url || ''}
              wrapperClassName="w-[60px] h-[60px] relative rounded-[16px] overflow-hidden"
            />
          ) : (
            <GenericImage
              src={image?.url || ''}
              alt={image?.alt || ''}
              wrapperClassName="w-full h-full relative rounded-[16px] overflow-hidden"
              fill={true}
              priority={true}
              focalX={image?.focalX || 50}
              focalY={image?.focalY || 50}
              imageClassName="w-full h-full object-contain rounded-[16px] overflow-hidden"
              sizes="100px"
              updatedAt={image?.updatedAt || ''}
            />
          )}
        </button>
      </li>
    )
  })

  const conditionsContent = hero?.conditions?.map((condition) => {
    const media = condition.icon as Media

    return (
      <li key={condition.id} className="flex flex-col items-center gap-2">
        <GenericImage
          src={media?.url || ''}
          alt={media?.alt || ''}
          wrapperClassName="w-[60px] aspect-square relative"
          imageClassName="w-full h-full"
          sizes="100px"
          focalX={media?.focalX || 50}
          focalY={media?.focalY || 50}
          updatedAt={media?.updatedAt || ''}
        />

        {condition.condition && (
          <GenericParagraph pType="small" extraClass="text-center">
            {condition.condition}
          </GenericParagraph>
        )}
      </li>
    )
  })

  return (
    <>
      <FullVideo isActive={isActive} setIsActive={setIsActive} src={videoSrc} />
      <section className="w-full py-10 md:py-20 flex relative z-[2]">
        <div className="m-auto content_wrapper flex flex-col gap-10 md:flex-row">
          <div className="md:max-w-[40%] min-h-[300px] w-full">
            {currentMediaType === 'video' ||
            !!mainProduct?.mediaArray?.[currentMediaIndex].externalVideo ? (
              <button
                className="w-full h-full min-h-[300px] radial_yellow md:max-h-[450px] border-[#D4AF37] border-[4px] relative rounded-[16px] overflow-hidden"
                onClick={() => {
                  const resource = mainProduct?.mediaArray?.[currentMediaIndex].externalVideo
                    ? mainProduct?.mediaArray?.[currentMediaIndex].externalVideo
                    : productMedia?.url
                  setIsActive(true)
                  setVideoSrc(resource || '')
                }}
              >
                <GenericVideo
                  src={
                    mainProduct?.mediaArray?.[currentMediaIndex].externalVideo
                      ? mainProduct?.mediaArray?.[currentMediaIndex].externalVideo
                      : productMedia?.url || ''
                  }
                  wrapperClassName="w-full h-full"
                />
              </button>
            ) : (
              <GenericImage
                src={productMedia?.url || ''}
                alt={productMedia?.alt || ''}
                wrapperClassName="w-full h-full min-h-[300px] radial_yellow md:max-h-[450px] border-[#D4AF37] border-[4px] relative rounded-[16px] overflow-hidden"
                fill={true}
                priority={true}
                focalX={productMedia?.focalX || 50}
                focalY={productMedia?.focalY || 50}
                imageClassName="w-full h-full object-contain rounded-[16px] overflow-hidden shadow-xl"
                sizes="100vw"
                fetchPriority="high"
                updatedAt={productMedia?.updatedAt || ''}
              />
            )}
            <ul className="mt-2 w-full grid grid-cols-5 gap-1 h-[80px] py-1 radial_yellow border-[#D4AF37] border-[4px] rounded-[16px] overflow-x-auto">
              {mediaMenu}
            </ul>
          </div>

          {!!hero && (
            <div className="flex-1 flex flex-col items-center justify-center">
              <article className={`flex gap-m flex-col`}>
                {hero.heading && (
                  <GenericHeading
                    textShadow={true}
                    headingType="h2"
                    extraClass={`self-center md:self-[unset] w-fit md:w-full border-b-[1px] border-primaryYellow pb-3 !text-center md:!text-left`}
                  >
                    <RichText data={hero.heading} />
                  </GenericHeading>
                )}
                {hero.description && (
                  <GenericParagraph extraClass="text-center md:text-left">
                    <RichText data={hero.description} />
                  </GenericParagraph>
                )}
                {hero.reviews && (
                  <GenericParagraph
                    extraClass="text-center md:text-left"
                    textColor="text-primaryYellow"
                  >
                    <p>{hero.reviews}</p>
                  </GenericParagraph>
                )}
                {hero.price && (
                  <GenericParagraph
                    pType="large"
                    extraClass="text-center md:text-left"
                    textColor="text-white"
                  >
                    <p>{hero.price}</p>
                  </GenericParagraph>
                )}
                <GenericButton
                  styleClass="w-full md:w-fit"
                  ariaLabel={'Добави в количка'}
                  click={() => {
                    if (!mainProduct) return
                    addProductToShoppingCartFullProcess(mainProduct)
                  }}
                >
                  {hero.links?.[0]?.link?.label || 'КУПИ СЕГА'}
                </GenericButton>
                {hero.conditions && (
                  <ul className="grid md:grid-cols-2 gap-4 xl:grid-cols-4">{conditionsContent}</ul>
                )}
                {hero.discountText && (
                  <GenericParagraph extraClass="text-center md:text-left" textColor="text-white">
                    <p>{hero.discountText}</p>
                  </GenericParagraph>
                )}
                {hero.extraDescription && (
                  <div className="mt-5 border-[1px] border-primaryYellow p-3 bg-primaryYellow/20 w-full md:w-fit rounded-[16px]">
                    <GenericParagraph extraClass="text-center md:text-left" textColor="text-white">
                      <RichText data={hero.extraDescription} />
                    </GenericParagraph>
                  </div>
                )}
              </article>
            </div>
          )}
        </div>
      </section>
    </>
  )
}

export default ProductHero
