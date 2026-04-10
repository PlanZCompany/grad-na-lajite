import { GenericButton, GenericParagraph } from '@/components/Generic'
import { CTABlock } from '@/payload-types'
import { generateHref, LinkObject } from '@/utils/generateHref'
import Link from 'next/link'

export function CTABlockComponent(block: CTABlock) {
  const { links, content } = block
  return (
    <section className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between content_wrapper py-10 md:py-20">
      {content && (
        <div>
          <GenericParagraph>{content}</GenericParagraph>
        </div>
      )}

      {links && links.length && (
        <Link href={generateHref(links[0] as LinkObject)} className="inline-flex">
          <GenericButton>{links[0].link.label}</GenericButton>
        </Link>
      )}
    </section>
  )
}
