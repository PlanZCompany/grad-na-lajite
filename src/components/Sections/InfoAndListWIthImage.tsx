import { HomeBlock, Media } from '@/payload-types'
import { RichText, RichTextFull } from '../Custom'
import { GenericHeading, GenericImage } from '../Generic'

export default function InfoAndListWithImage({ data }: { data: HomeBlock['gameRules'] }) {
  const { heading, description, cardsArray } = data
  const media = data?.media as Media

  const cardsContent = cardsArray?.map((card) => {
    const media = card?.basicComponent.media as Media

    return (
      <div key={card.id} className="flex-1 min-w-[90px] text-center">
        <div className="relative mx-auto mb-2 h-20 w-20">
          <GenericImage
            src={media?.url || ''}
            alt={media?.alt || ''}
            wrapperClassName="absolute inset-0"
            imageClassName="object-contain"
            sizes="80px"
            priority={false}
            fill={true}
          />
        </div>
        <div className="m-0 font-bold text-[#d4af37]">
          <RichText data={card?.basicComponent?.heading as any} />
        </div>
      </div>
    )
  })

  return (
    <section className="w-full py-10 md:py-20 flex">
      <div className="flex flex-col items-center gap-8 md:flex-row content_wrapper">
        <article className="flex flex-col">
          {heading && (
            <GenericHeading
              textShadow={true}
              headingType="h2"
              extraClass="border-b-[1px] border-primaryYellow pb-3 w-fit mb-4 md:mb-6 !text-center md:!text-left"
            >
              <RichText data={heading} />
            </GenericHeading>
          )}
          {description && (
            <div>
              <RichTextFull description={description} />
            </div>
          )}

          <div className="mt-6 flex gap-8">{cardsContent}</div>
        </article>
        {/* RIGHT: image */}
        <div className="relative min-h-[400px] flex-1 overflow-hidden rounded-[10px] w-full md:min-w-[45%]">
          <GenericImage
            src={media?.url || ''}
            alt={media?.alt || ''}
            wrapperClassName="absolute inset-0"
            imageClassName="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority={false}
            fill={true}
          />
        </div>
      </div>
    </section>
  )
}
