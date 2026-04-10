import Link from 'next/link'

type PageRelation =
  | string
  | {
      slug?: string | null
    }
  | null
  | undefined

export type CTABlockProps = {
  id?: string | null
  blockType: 'cta'
  content: string
  buttonText: string
  buttonLink: PageRelation
}

function getHref(page: PageRelation): string | null {
  if (!page || typeof page === 'string') return null
  if (!page.slug) return null

  return page.slug === 'home' ? '/' : `/${page.slug}`
}

export function CTABlockComponent(block: CTABlockProps) {
  const href = getHref(block.buttonLink)

  if (!href) return null

  return (
    <section className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>{block.content}</div>

      <Link href={href} className="inline-flex">
        {block.buttonText}
      </Link>
    </section>
  )
}
