import { RichText } from '@/components/Custom'
import { GenericHeading, GenericParagraph } from '@/components/Generic'
import { SectionWrapper } from '@/components/Wrappers'
import type { ProductBlock } from '@/payload-types'

type ProductReviewsBlockProps = NonNullable<ProductBlock['reviews']> & {
  id?: string | null
}

export const ProductReviewsBlockComponent = (props: ProductReviewsBlockProps) => {
  const { heading, cardsArray, id } = props

  return (
    <section
      className="w-full flex flex-col relative bg-purpleBackground"
      key={id || 'product-reviews-block'}
    >
      <SectionWrapper>
        <div className="m-auto content_wrapper flex flex-col gap-6 md:gap-12">
          {!!heading && (
            <GenericHeading
              textShadow={true}
              headingType="h2"
              align="text-center"
              extraClass={`w-full`}
            >
              <RichText data={heading} />
            </GenericHeading>
          )}

          <ul className="w-full max-w-[710px] flex flex-col gap-m mx-auto">
            {cardsArray?.map((card) => {
              return (
                <li
                  key={card.id}
                  className="w-full bg-purpleDark flex flex-col items-center justify-center gap-4 glass shadow-2xl p-5 rounded-[16px] overflow-hidden"
                >
                  {card?.basicComponent?.description && (
                    <GenericParagraph
                      pType="custom"
                      extraClass="text-[16px] leading-[150%] text-center"
                    >
                      <RichText data={card?.basicComponent?.description} />
                    </GenericParagraph>
                  )}
                  {card?.basicComponent?.heading && (
                    <GenericHeading textShadow={false} headingType="h5" align="text-center">
                      <RichText data={card?.basicComponent?.heading} />
                    </GenericHeading>
                  )}
                </li>
              )
            })}
          </ul>
        </div>
      </SectionWrapper>
    </section>
  )
}
