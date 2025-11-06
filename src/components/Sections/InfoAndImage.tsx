import { HomeBlock, Media } from '@/payload-types'
import { GenericHeading, GenericImage, GenericParagraph } from '../Generic'
import { RichText } from '../Custom'

export default function InfoAndImage({ data }: { data: HomeBlock['historySection'] }) {
  const heading = data?.heading
  const description = data?.description

  const media = data?.media as Media

  return (
    <section className="w-full py-10 md:py-20 flex">
      <div className="flex flex-col items-center gap-8 md:flex-row content_wrapper">
        <GenericImage
          src={media?.url || ''}
          alt={media?.alt || ''}
          wrapperClassName="relative block h-[400px] w-full rounded-[10px] md:flex-1"
          imageClassName="object-cover rounded-[10px]"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority={false}
          fill={true}
        />

        <div className="md:flex-1 text-[#f8f6f2]">
          <article className="flex flex-col">
            {heading && (
              <GenericHeading
                textShadow={true}
                headingType="h2"
                extraClass="border-b-[1px] border-primaryYellow pb-3 !text-center md:!text-left w-fit mb-4 md:mb-6"
              >
                <RichText data={heading} />
              </GenericHeading>
            )}
            {description && (
              <GenericParagraph>
                <RichText data={description} />
              </GenericParagraph>
            )}
          </article>
        </div>
      </div>
    </section>
  )
}
