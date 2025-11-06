'use client'

import { HomeBlock, Media } from '@/payload-types'
import HeadingPlusDescription from '../Generic/HeadingPlusDescription'
import { GenericButton, GenericImage } from '../Generic'

export default function ProductPreview({ data }: { data: HomeBlock['singlePreview'] }) {
  const media = data?.media as Media

  return (
    <section className="w-full py-10 md:py-20 flex">
      <div className="w-full content_wrapper flex flex-col gap-10 md:gap-12">
        <HeadingPlusDescription heading={data?.heading} description={data?.description} />

        <article
          itemScope
          itemType="https://schema.org/Product"
          className="bg-[#d4af37] p-6 md:p-10 
          rounded-[24px] w-full md:w-[480px] 
          md:aspect-square aspect-[2/2.5] shadow-sm m-auto 
          flex flex-col items-center justify-center 
          overflow-hidden relative"
          aria-labelledby="game-box-title"
        >
          <div className="h-full w-full relative">
            <GenericImage
              src={media?.url || ''}
              alt={media?.alt || ''}
              wrapperClassName="absolute inset-[-80px]"
              imageClassName="object-contain w-full h-full"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority={false}
            />
          </div>
          <div className="mt-auto flex flex-col gap-s">
            <p className="text-[#1a0f2e] font-bold text-[24px]">
              Цена <span className="font-normal">{data?.price}</span>
            </p>

            <GenericButton
              type="button"
              ariaLabel={'Поръчай'}
              click={() => {
                //TODO
              }}
              variant="colored"
            >
              Поръчай
            </GenericButton>
          </div>
        </article>
      </div>
    </section>
  )
}
