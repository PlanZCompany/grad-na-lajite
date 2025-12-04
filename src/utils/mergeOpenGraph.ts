import type { Metadata } from 'next'
import { getServerSideURL } from './getURL'

const defaultOpenGraph: Metadata['openGraph'] = {
  type: 'website',
  description: 'Град на Лъжите - Премиум настолна игра с карти за компании, стратегии и характери.',
  images: [
    {
      url: `${getServerSideURL()}/static/preview.png`,
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
