import type { Metadata } from 'next'
import { getServerSideURL } from './getURL'

const defaultOpenGraph: Metadata['openGraph'] = {
  type: 'website',
  description: 'Уебсайт генериран от Симеон Рудашки',
  images: [
    {
      url: `${getServerSideURL()}/Logo.png`,
    },
  ],
  siteName: 'Град на лъжите',
  title: 'Град на лъжите',
}

export const mergeOpenGraph = (og?: Metadata['openGraph']): Metadata['openGraph'] => {
  return {
    ...defaultOpenGraph,
    ...og,
    images: og?.images ? og.images : defaultOpenGraph.images,
  }
}
