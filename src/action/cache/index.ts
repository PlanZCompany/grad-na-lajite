'use server'
import { unstable_cache } from 'next/cache'
import { getPayload } from 'payload'
import configPromise from '@/payload.config'

export async function getPublishedBlogsCached() {
  const key = ['blogs:published', `limit=${50}`]

  const run = unstable_cache(
    async () => {
      const payload = await getPayload({ config: configPromise })
      const res = await payload.find({
        collection: 'blog',
        limit: 50,
        where: {
          _status: { equals: 'published' },
        },
        select: {
          title: true,
          heading: true,
          description: true,
          layout: true,
          id: true,
          slug: true,
          media: true,
        },
        pagination: false,
      })
      return res
    },
    key,
    {
      revalidate: 600,
      tags: ['blogs:published'],
    },
  )

  return run()
}
