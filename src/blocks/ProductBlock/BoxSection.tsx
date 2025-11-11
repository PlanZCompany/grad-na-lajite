'use client'

import { GenericButton, GenericHeading, GenericImage } from '@/components/Generic'
import { SectionWrapper } from '@/components/Wrappers'
import { useAppSelector } from '@/hooks/redux-hooks'
import { useCheckout } from '@/hooks/useCheckout'
import { Media, ProductBlock } from '@/payload-types'
import { RichText } from '@payloadcms/richtext-lexical/react'
import React from 'react'

const BoxSection = ({ box }: { box: ProductBlock['box'] }) => {
  const mainProduct = useAppSelector((state) => state.root.mainProduct)
  const { addProductToShoppingCartFullProcess } = useCheckout()

  if (!box) return null
  return (
    <SectionWrapper>
      <div className="m-auto content_wrapper flex flex-col gap-6 md:gap-12">
        {!!box.heading && (
          <GenericHeading
            textShadow={true}
            headingType="h2"
            align="text-center"
            extraClass={`w-full`}
          >
            <RichText data={box.heading} />
          </GenericHeading>
        )}

        <ul className="w-full grid md:grid-cols-3 gap-8">
          {box.cardsArray?.map((card) => {
            const media = card?.basicComponent?.media as Media
            return (
              <li key={card.id} className="flex flex-col items-center gap-4">
                <GenericImage
                  src={media?.url || ''}
                  alt={media?.alt || ''}
                  wrapperClassName="w-full p-4 shadow-2xl max-w-[150px] xl:max-w-[150px] aspect-square relative rounded-[16px] overflow-hidden"
                  fill={true}
                  focalX={media?.focalX || 50}
                  focalY={media?.focalY || 50}
                  imageClassName="w-full h-full object-contain rounded-[16px] overflow-hidden"
                  sizes="100vw"
                  fetchPriority="high"
                  updatedAt={media?.updatedAt || ''}
                />

                {!!card?.basicComponent?.heading && (
                  <GenericHeading
                    textShadow={false}
                    headingType="h3"
                    align="text-center"
                    extraClass={`w-full text-[18px] leading-[150%]`}
                    customStyles={true}
                    textColor="text-white"
                  >
                    <RichText data={card?.basicComponent?.heading as any} />
                  </GenericHeading>
                )}
              </li>
            )
          })}
        </ul>
        {!!box.orderButton && (
          <GenericButton
            styleClass="w-full md:w-fit mx-auto mt-10 md:mt-[unset]"
            click={() => {
              if (mainProduct) {
                addProductToShoppingCartFullProcess(mainProduct)
              }
            }}
          >
            Купи сега
          </GenericButton>
        )}
      </div>
    </SectionWrapper>
  )
}

export default BoxSection
