import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Your Next.js config here
  webpack: (webpackConfig) => {
    webpackConfig.resolve.extensionAlias = {
      '.cjs': ['.cts', '.cjs'],
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.mjs': ['.mts', '.mjs'],
    }

    return webpackConfig
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'media.gradnalajite.anilevisoulwalks.com',
        pathname: '/media/**',
      },
      {
        protocol: 'https',
        hostname: 'media.gradnalajite.anilevisoulwalks.com',
        pathname: '/media/**',
      },
    ],
  },
  reactStrictMode: true,
  productionBrowserSourceMaps: false,
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
