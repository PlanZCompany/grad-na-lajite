import { RichText } from '@/components/Custom'
import { GenericButton, GenericHeading, GenericImage, GenericParagraph } from '@/components/Generic'
import { SectionWrapper } from '@/components/Wrappers'
import { Media, ProductBlock } from '@/payload-types'
import { generateHref, LinkObject } from '@/utils/generateHref'
import Link from 'next/link'

type ProductFaqBlockProps = NonNullable<ProductBlock['faq']> & {
  id?: string | null
}

export const ProductFaqBlockComponent = (props: ProductFaqBlockProps) => {
  const { heading, description, links, media, id } = props
  const faqMedia = media as Media

  return (
    <section
      className="w-full flex flex-col relative bg-purpleBackground"
      key={id || 'product-faq-block'}
    >
      <SectionWrapper>
        <div className="m-auto content_wrapper">
          <div className="flex flex-col-reverse gap-10 md:flex-row">
            <div className="flex-1 flex justify-center items-center">
              <article className={`flex gap-m flex-col`}>
                {heading && (
                  <GenericHeading
                    textShadow={true}
                    headingType="h2"
                    align="text-center md:text-left"
                    extraClass={`border-b-[1px] border-primaryYellow pb-3 w-full`}
                  >
                    <RichText data={heading} />
                  </GenericHeading>
                )}
                {description && (
                  <GenericParagraph extraClass="text-left">
                    <RichText data={description} />
                  </GenericParagraph>
                )}
                {!!links && !!links.length && (
                  <Link
                    aria-label={links[0].link.label}
                    href={generateHref(links[0] as LinkObject)}
                  >
                    <GenericButton styleClass="w-full md:w-fit">
                      {links[0].link.label}
                    </GenericButton>
                  </Link>
                )}
              </article>
            </div>
            <GenericImage
              src={faqMedia?.url || ''}
              alt={faqMedia?.alt || ''}
              wrapperClassName="w-full max-w-[350px] aspect-square relative rounded-[16px] overflow-hidden"
              fill={true}
              priority={true}
              focalX={faqMedia?.focalX || 50}
              focalY={faqMedia?.focalY || 50}
              imageClassName="w-full h-full object-contain rounded-[16px] overflow-hidden"
              sizes="100vw"
              updatedAt={faqMedia?.updatedAt || ''}
            />
          </div>
        </div>
      </SectionWrapper>
    </section>
  )
}
