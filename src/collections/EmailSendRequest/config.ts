// src/collections/EmailSendRequests.ts
import { buildEmail } from '@/lib/email/buildEmail'
import type { CollectionConfig } from 'payload'

export const EmailSendRequests: CollectionConfig = {
  slug: 'email-send-requests',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'status', 'updatedAt'],
    group: 'Emails',
  },
  access: {
    read: ({ req }) => Boolean(req.user),
    create: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      defaultValue: 'Manual email send',
    },
    {
      name: 'template',
      type: 'relationship',
      relationTo: 'email-templates',
      required: true,
      filterOptions: () => ({
        and: [{ delivery: { equals: 'manual' } }],
      }),
    },
    {
      name: 'recipients',
      type: 'array',
      required: true,
      minRows: 1,
      fields: [{ name: 'email', type: 'email', required: true }],
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'draft',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Sent', value: 'sent' },
        { label: 'Error', value: 'error' },
      ],
      admin: { readOnly: true },
    },
    { name: 'sentAt', type: 'date', admin: { readOnly: true } },

    {
      name: 'sendNow',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Чекни и натисни Save, за да изпратиш имейла.',
      },
    },
  ],

  hooks: {
    afterChange: [
      async ({ doc, req }) => {
        if (req.context?.skipEmailSendHook) return
        if (!doc.sendNow) return

        try {
          // 1) Вземаме template (и basic guard)
          const template = await req.payload.findByID({
            collection: 'email-templates',
            id: doc.template,
            req,
          })

          if (template.delivery !== 'manual') {
            throw new Error('Този template не е manual.')
          }

          // 2) Build email (global settings + template)
          const { subject, html } = await buildEmail({
            req,
            templateId: template.id,
            data: doc.data ?? {},
          })

          for (const r of doc.recipients ?? []) {
            await req.payload.sendEmail({
              to: r.email,
              subject,
              html,
            })
          }

          await req.payload.update({
            collection: 'email-send-requests',
            id: doc.id,
            req,
            overrideAccess: true,
            context: { ...req.context, skipEmailSendHook: true },
            data: {
              sendNow: false,
              status: 'sent',
              sentAt: new Date().toISOString(),
            },
          })
        } catch (err: any) {
          await req.payload.update({
            collection: 'email-send-requests',
            id: doc.id,
            req,
            overrideAccess: true,
            context: { ...req.context, skipEmailSendHook: true },
            data: {
              sendNow: false,
              status: 'error',
            },
          })
        }
      },
    ],
  },
}
