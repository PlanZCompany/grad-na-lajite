// app/lib/analytics.ts
let analyticsInitialized = false

export function initAnalyticsTools() {
  if (typeof window === 'undefined') return
  if (analyticsInitialized) return
  analyticsInitialized = true

  const GA_ID = 'G-XXXXXXX' // TODO: replace
  const ADS_ID = 'AW-XXXXXXX' // TODO: replace
  const META_PIXEL_ID = 'XXXXXXXX' // TODO: replace

  initGtagBase()
  if (GA_ID) {
    window.gtag?.('config', GA_ID)
  }
  if (ADS_ID) {
    window.gtag?.('config', ADS_ID)
  }
  if (META_PIXEL_ID) {
    initMetaPixel(META_PIXEL_ID)
  }
}

function initGtagBase() {
  const w = window as any

  if (w.gtag) return // already set

  w.dataLayer = w.dataLayer || []
  function gtag(...args: any[]) {
    w.dataLayer.push(args)
  }
  w.gtag = gtag

  const scriptId = 'gtag-base'
  if (!document.getElementById(scriptId)) {
    const s = document.createElement('script')
    s.id = scriptId
    s.async = true
    s.src = 'https://www.googletagmanager.com/gtag/js?id=G-XXXXXXX' //TODO
    document.head.appendChild(s)
  }

  gtag('js', new Date())
}

function initMetaPixel(pixelId: string) {
  const w = window as any
  if (w.fbq) return

  const fbq: any = function (...args: any[]) {
    fbq.callMethod ? fbq.callMethod.apply(fbq, args) : fbq.queue.push(args)
  }
  fbq.push = fbq
  fbq.loaded = true
  fbq.version = '2.0'
  fbq.queue = []

  w.fbq = fbq

  const s = document.createElement('script')
  s.async = true
  s.src = 'https://connect.facebook.net/en_US/fbevents.js' //TODO
  document.head.appendChild(s)

  w.fbq('init', pixelId)
  w.fbq('track', 'PageView')
}
