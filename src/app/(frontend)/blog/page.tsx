import { draftMode } from 'next/headers'
import configPromise from '@payload-config'
import type { Metadata } from 'next/types'
import { getPayload } from 'payload'

import React, { cache } from 'react'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { generateMeta } from '@/utils/generateMeta'
import GridBlog from '@/components/Sections/GridBlog'
import { Blog } from '@/payload-types'

export const dynamic = 'force-dynamic'

export default async function BlogPage() {
  const { isEnabled: draft } = await draftMode()
  const payload = await getPayload({ config: configPromise })

  const blogs = await payload.find({
    collection: 'blog',
    limit: 100,
    select: {
      slug: true,
      heading: true,
      description: true,
      media: true,
      title: true,
    },
    where: {
      and: [
        {
          _status: {
            equals: 'published',
          },
        },
      ],
    },
  })

  return (
    <>
      <article className="w-full bg-purpleBackground min-h-screen pt-[68px] md:pt-[130px]">
        {draft && <LivePreviewListener />}

        <GridBlog data={blogs.docs as Blog[]} />
      </article>
    </>
  )
}

export async function generateMetadata(): Promise<Metadata> {
  const page = await queryLocationBySlug({ slug: 'blogs' })

  return generateMeta({ doc: page })
}

const queryLocationBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'pages',
    draft,
    limit: 1,
    overrideAccess: draft,
    pagination: false,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})
