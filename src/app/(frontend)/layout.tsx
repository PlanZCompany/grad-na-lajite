import React from 'react'
import { StoreProvider } from '@/store/StoreProvider'
import '../../assets/styles/general.scss'
import '../../assets/styles/blog.scss'
import { Header } from '@/Header/Component'
import './global.css'
import { kolka, sansation } from '@/app/fonts'
import { Footer } from '@/Footer/Component'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import ScreenOverlay from '@/components/Custom/ScreenOverlay'
import ScrollToTop from '@/components/Custom/ScrollToTop'
import { Metadata } from 'next'
import GenericNotification from '@/components/Generic/GenericNotification'
import { AsideComponent } from '@/Aside/Component'
import { SubscriptionModalComponent } from '@/SubsciptionModal/Component'
import SetCurrentUser from '@/components/Setters/SetCurrentUser'
import SubscriptionModalActivator from '@/components/Setters/SubscriptionModalActivator'
import { ShoppingCardAside } from '@/components/Checkout'
import ShoppingCartManager from '@/components/Setters/ShoppingCartManager'
import BuyNowButton from '@/components/Custom/BuyNowButton'
import SetMainProduct from '@/components/Setters/SetMainProduct'
import { getPublishedBlogsCached } from '@/action/cache'
import { Blog } from '@/payload-types'
import Search from '@/components/Search/Search'
import CookieBanner from '@/components/CookieContent/CookieBanner'
// import { AnalyticsManager } from '@/components/CookieContent/AnalyticsManager'

const SITE_NAME = 'Град на Лъжите'

export const metadata: Metadata = {
  metadataBase: new URL('https://grad-na-lajite.vercel.app/'),
  applicationName: SITE_NAME,
  title: {
    default: SITE_NAME,
    template: `%s`,
  },
  description: 'Град на Лъжите - Премиум настолна игра с карти за компании, стратегии и характери.',
  keywords: ['подарък', 'игра', 'настолна игра', 'карти', 'лъжа', 'истина'],
  authors: [{ name: 'Simeon Rudashki' }, { name: 'PlanZ' }, { name: 'Anatoli Vachev' }],
  creator: 'PlanZ',
  publisher: 'PlanZ',
  referrer: 'origin-when-cross-origin',

  alternates: {
    canonical: '/',
    languages: {
      bg: '/',
    },
  },

  openGraph: {
    type: 'website',
    siteName: SITE_NAME,
    title: SITE_NAME,
    description:
      'Град на Лъжите - Премиум настолна игра с карти за компании, стратегии и характери.',
    url: '/',
    locale: 'bg_BG',
    images: [
      {
        url: `/mobile-hero.jpg`,
        width: 1200,
        height: 630,
        alt: SITE_NAME,
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: SITE_NAME,
    description:
      'Град на Лъжите - Премиум настолна игра с карти за компании, стратегии и характери.',
    images: [
      {
        url: `/mobile-hero.jpg`,
        width: 1200,
        height: 630,
        alt: SITE_NAME,
      },
    ],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-32x32.png', type: 'image/png', sizes: '32x32' },
      { url: '/android-chrome-192x192.png', type: 'image/png', sizes: '192x192' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
    shortcut: ['/favicon.ico'],
  },
  // manifest: '/manifest.json',

  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },

  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: SITE_NAME,
  },
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props
  const payload = await getPayload({ config: configPromise })

  const product = await payload.find({
    collection: 'product',
    limit: 1,
    where: {
      _status: {
        equals: 'published',
      },
    },
  })

  const currentProduct = product?.docs?.[0]
  //need to make function with cache about to 5 minutes to get blogs to avoid flickering
  const blogsForSearch = await getPublishedBlogsCached()

  return (
    <StoreProvider>
      <html lang="bg" className={`${kolka.variable} ${sansation.variable}`}>
        <head>
          <link href="/favicon.ico" rel="icon" sizes="32x32" />
          <link href="/favicon.svg" rel="icon" type="image/svg+xml" />

          {/* TODO prefetch to domain */}
          <link rel="preconnect prefetch" href="https://grad-na-lajite.vercel.app/" />
        </head>
        <body>
          <main id="content" className="min-h-[100svh] overflow-x-clip">
            <a href="#content" className="sr-only focus:not-sr-only">
              Към съдържанието
            </a>
            <Search blogs={blogsForSearch.docs as Blog[]} />
            <AsideComponent />
            <ScrollToTop />
            <SubscriptionModalComponent />
            <Header />
            {children}
            <Footer />
            <ShoppingCardAside />
            <BuyNowButton product={currentProduct} />

            <ScreenOverlay />

            <GenericNotification />
            <SetCurrentUser />
            <SubscriptionModalActivator />
            <ShoppingCartManager />
            <SetMainProduct product={currentProduct} />
            <CookieBanner />
            {/* <AnalyticsManager /> */}
          </main>
        </body>
      </html>
    </StoreProvider>
  )
}
