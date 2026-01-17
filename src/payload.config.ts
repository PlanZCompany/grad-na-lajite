// storage-adapter-import-placeholder
import { nodemailerAdapter } from '@payloadcms/email-nodemailer'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { plugins } from './plugins'
import { getServerSideURL } from './utils/getServerSideUrl'
import { Header } from './Header/config'
import { Footer } from './Footer/config'
import { Subscriptions } from './collections/Subscriptions'
import { Aside } from './Aside/config'
import { SubscriptionModal } from './SubsciptionModal/config'
import { Product } from './collections/Product/Product'
import { Blog } from './collections/Blog'
import { FooterCheckout } from './FooterCheckout/config'
import { Shipping } from './Shipping/config'
import { Order } from './collections/Order'
import { OrderItem } from './collections/OrderItem'
import { DiscountCode } from './collections/DiscountCode/DiscountCode'
import { DiscountCodeUsages } from './collections/DiscountCodeUsages/DiscountCodeUsages'
import { DiscountCodeAttempt } from './collections/DiscountCodeAttempt/DiscountCodeAttempt'
import { EmailTemplates } from './collections/EmailTemplates/config'
import { EmailSettings } from './EmailSettings/config'
import { EmailSendRequests } from './collections/EmailSendRequest/config'
import { DiscountMaintenance } from './DiscountMaintenance'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  defaultDepth: 3,
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    livePreview: {
      breakpoints: [
        {
          label: 'Mobile',
          name: 'mobile',
          width: 360,
          height: 640,
        },
        {
          label: 'Tablet',
          name: 'tablet',
          width: 768,
          height: 1024,
        },
        {
          label: 'Desktop',
          name: 'desktop',
          width: 1440,
          height: 900,
        },
      ],
    },
  },
  collections: [
    Users,
    Media,
    Pages,
    Subscriptions,
    Product,
    Blog,
    Order,
    OrderItem,
    DiscountCode,
    DiscountCodeUsages,
    DiscountCodeAttempt,
    EmailTemplates,
    EmailSendRequests,
  ],
  globals: [
    Header,
    Footer,
    Aside,
    SubscriptionModal,
    FooterCheckout,
    Shipping,
    EmailSettings,
    DiscountMaintenance,
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  cors: [getServerSideURL()].filter(Boolean),
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
    push: true,
  }),
  sharp,
  plugins: [payloadCloudPlugin(), ...plugins],
  email: nodemailerAdapter({
    defaultFromAddress: 'no-reply@gradnalajite.bg',
    defaultFromName: 'Град на Лъжите',
    transportOptions: {
      host: 'radon.superhosting.bg',
      port: 465,
      secure: true,
      auth: {
        user: 'no-reply@gradnalajite.bg',
        pass: process.env.SMTP_PASS,
      },
    },
  }),
})
