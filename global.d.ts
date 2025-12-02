// global.d.ts
export {}

declare global {
  interface Window {
    dataLayer: unknown[]
    gtag(...args: unknown[]): void
    fbq?(...args: unknown[]): void
  }
}
