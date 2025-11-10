'use client'

import { GenericButton, GenericHeading, GenericImage, GenericParagraph } from '@/components/Generic'
import { useCheckout } from '@/hooks/useCheckout'
import { Media, Product, ProductBlock } from '@/payload-types'
import { RichText } from '@payloadcms/richtext-lexical/react'
import React, { useState } from 'react'

const ProductHero = ({ hero, product }: { hero: ProductBlock['hero']; product: Product }) => {
  const { addProductToShoppingCartFullProcess } = useCheckout()

  const [currentMediaIndex, setCurrentMediaIndex] = useState(0)
  const productMedia = product?.mediaArray?.[currentMediaIndex]?.file as Media

  const mediaMenu = product?.mediaArray?.map((currentMedia, index) => {
    const image = currentMedia.file as Media
    return (
      <li className="w-full h-full" key={index}>
        <button
          className="w-full h-full flex items-center justify-center relative"
          aria-label="Избери снимка"
          onClick={() => {
            setCurrentMediaIndex(index)
          }}
        >
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
        </button>
      </li>
    )
  })

  return (
    <section className="w-full py-10 md:py-20 flex relative z-[2]">
      <div className="m-auto content_wrapper flex flex-col gap-10 md:flex-row">
        <div className="md:max-w-[40%] min-h-[300px] w-full">
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
                  addProductToShoppingCartFullProcess(product)
                }}
              >
                Купи сега
              </GenericButton>
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
  )
}

export default ProductHero
