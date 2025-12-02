import type { Field, GlobalConfig } from 'payload'
import { link } from '@/fields/link'

export const FooterCheckout: GlobalConfig = {
  slug: 'footer-checkout',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'paymentLinks',
      type: 'array',
      label: 'Плащания и доставки',
      fields: [
        {
          name: 'media',
          type: 'upload',
          label: 'Media',
          maxDepth: 2,
          relationTo: 'media',
          required: false,
        } as Field,
      ],
      maxRows: 10,
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '@/Footer/RowLabel#RowLabel',
        },
      },
    },
  ],
}
