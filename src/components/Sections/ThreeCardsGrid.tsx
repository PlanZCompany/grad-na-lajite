import { HomeBlock, Media } from '@/payload-types'
import { GenericImage } from '../Generic'
import HeadingPlusDescription from '../Generic/HeadingPlusDescription'
import { RichText } from '../Custom'

export default function ThreeCardsGrid({ data }: { data: HomeBlock['whatIsTheGame'] }) {
  const cardsContent = data?.cardsArray?.map((card) => {
    const media = card?.basicComponent?.media as Media

    return (
      <div
        key={card.id}
        className="relative h-[300px] overflow-hidden rounded-[12px] shadow-[0_4px_20px_rgba(0,0,0,0.6)]"
      >
        {/* background image */}
        <GenericImage
          src={media?.url || ''}
          alt={media?.alt || ''}
          wrapperClassName="absolute inset-0"
          imageClassName="object-cover w-full h-full"
          sizes="(max-width: 1024px) 100vw, 33vw"
          priority={false}
        />
        {/* dark overlay */}
        <div className="absolute inset-0 bg-black/55" />
        {/* content */}
        <div className="relative z-[1] flex h-full items-center justify-center p-4 text-center text-[#f8f6f2]">
          <div className="m-0 text-[1.5rem] font-semibold text-[#d4af37] drop-shadow">
            <RichText data={card?.basicComponent?.heading as any} />
          </div>
        </div>
      </div>
    )
  })

  return (
    <section className="w-full py-10 md:py-20 flex">
      <div className="w-full content_wrapper flex flex-col gap-10">
        <HeadingPlusDescription heading={data?.heading} />
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">{cardsContent}</div>
      </div>
    </section>
  )
}
