import { buildEmailCustom } from '@/lib/email/buildEmailCustom'
import { getPayload, type CollectionConfig } from 'payload'
import configPromise from '@payload-config'

export const Subscriptions: CollectionConfig = {
  slug: 'subscriptions',
  labels: {
    singular: 'Абонат',
    plural: 'Абонати',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'email',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'user',
      type: 'relationship',
      relationTo: 'users',
      required: false,
      admin: {
        description: 'Абонаментът може да е свързан с потребител',
      },
    },
    {
      name: 'discountCode',
      label: 'Код за отстъпка',
      type: 'text',
    },
  ],
  hooks: {
    beforeValidate: [
      ({ data }) => {
        if (data?.email) data.email = String(data.email).trim().toLowerCase()
        return data
      },
    ],
    afterChange: [
      async (req) => {
        const { doc, operation } = req
        if (operation !== 'create') return doc
        if (!doc?.email) return doc

        try {
          const { subject, html } = await buildEmailCustom({
            templateSlug: 'welcome_istina10',
            userEmail: doc.email,
          })
          const payload = await getPayload({ config: configPromise })
          const { email } = doc
          await payload.sendEmail({
            to: email,
            subject,
            html,
            text: html,
            from: 'no-reply@gradnalajite.bg',
          })
        } catch (error) {
          console.error(error)
        }
      },
    ],
  },
}
