const isDev = process.env.NODE_ENV === 'development'

const SITE_URL = isDev ? 'http://localhost:3000' : 'https://gradnalajite.bg'

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: SITE_URL,
  generateRobotsTxt: true,
  exclude: [
    '/posts-sitemap.xml',
    '/pages-sitemap.xml',
    '/*',
    '/posts/*',
    '/admin/*',
    '/blog-sitemap.xml',
  ],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        disallow: '/admin/*',
      },
    ],
    additionalSitemaps: [`${SITE_URL}/pages-sitemap.xml`, `${SITE_URL}/blog-sitemap.xml`],
  },
}
