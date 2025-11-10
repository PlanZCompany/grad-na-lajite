import type { Metadata } from 'next'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'
import { generateMeta } from '@/utils/generateMeta'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { PayloadRedirects } from '@/components/PayloadRedirects'
import HeroCommon from '@/Hero/Common'
import { RenderBlocks } from '@/blocks/RenderBlocks'
import SetExtraComments from '@/components/Setters/SetExtraComments'

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const pages = await payload.find({
    collection: 'pages',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
    },
    where: {
      _status: {
        equals: 'published',
      },
    },
  })

  const params = pages.docs
    ?.filter((doc) => {
      return doc.slug !== 'home'
    })
    .map(({ slug }) => {
      return { slug }
    })

  return params
}

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export default async function Page({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug = 'home' } = await paramsPromise
  const url = '/' + slug

  const page = await queryPageBySlug({
    slug,
  })

  if (!page) {
    return <PayloadRedirects url={url} />
  }

  const payload = await getPayload({ config: configPromise })

  const itIsHome = slug === 'home'

  const hero = page?.commonHero
  const layout = page.layout

  let extraComments: {
    name: string
    comment: string
  }[] = []
  if (itIsHome) {
    const comments = await payload.find({
      collection: 'form-submissions',
      limit: 1000,
      select: {
        form: true,
        submissionData: true,
        createdAt: true,
      },
      where: {
        and: [
          {
            approved: {
              equals: true,
            },
          },
        ],
      },
    })

    extraComments = comments.docs
      ? comments.docs.map((doc) => {
          return {
            name: doc.submissionData?.[0]?.value || 'Потребител',
            comment: doc.submissionData?.[2]?.value || 'Мнение',
          }
        })
      : []
  }

  return (
    <>
      {/* //TODO? {slug === 'home' && (
        <>
          <OrganizationJsonLd />
          <HomePageJsonLd />
          <CategoriesItemList />
        </>
      )} */}
      <article className="w-full bg-[#200226] min-h-[100svh]">
        <PayloadRedirects disableNotFound url={url} />

        {draft && <LivePreviewListener />}
        {!!hero.heading && !page.regulatoryPage && <HeroCommon {...hero} />}

        {!!itIsHome && <SetExtraComments extraComments={extraComments} />}

        <div className="w-full">
          <RenderBlocks blocks={layout as any} />
        </div>
      </article>
    </>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = 'home' } = await paramsPromise
  const page = await queryPageBySlug({
    slug,
  })

  return generateMeta({ doc: page })
}

const queryPageBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'pages',
    draft,
    limit: 1,
    pagination: false,
    overrideAccess: draft,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})
