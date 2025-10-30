import type { Metadata } from 'next'

import type { Media, Page, Config } from '../payload-types'

import { mergeOpenGraph } from './mergeOpenGraph'
import { getServerSideURL } from './getURL'
import type { ExtraMediaProps } from '../components/Generic/Media'
export const getImageURL = (
  image?: (Media & ExtraMediaProps) | Config['db']['defaultIDType'] | null,
) => {
  const serverUrl = getServerSideURL()

  let url = serverUrl + '/website-template-OG.webp'

  if (image && typeof image === 'object' && 'url' in image) {
    const ogUrl =
      image?.sizes &&
      'og' in image?.sizes &&
      'url' in (image?.sizes?.og as unknown as { url: string })
        ? (image.sizes?.og as unknown as { url: string }).url
        : ''

    url = ogUrl ? serverUrl + ogUrl : serverUrl + image.url
  }

  return url
}

export const generateMeta = async (args: { doc: Partial<Page> | null }): Promise<Metadata> => {
  const { doc } = args

  const ogImage = getImageURL(doc?.meta?.image as any) || 'logo.png' //TODO ANY

  const title = doc?.meta?.title ? `${doc?.meta?.title} | Обичайте се` : 'Обичайте се'

  return {
    description: doc?.meta?.description,
    openGraph: mergeOpenGraph({
      description: doc?.meta?.description || '',
      images: ogImage
        ? [
            {
              url: ogImage,
            },
          ]
        : undefined,
      title,
      url: Array.isArray(doc?.slug) ? doc?.slug.join('/') : '/',
    }),
    title,
  }
}
