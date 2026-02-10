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
      name: 'recipientsSync',
      type: 'ui',
      admin: {
        components: {
          Field: {
            path: '@/admin/RecipientsSyncButton#RecipientsSyncButton',
          },
        },
      },
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
      name: 'preview',
      type: 'ui',
      admin: {
        components: {
          Field: {
            path: '@/admin/EmailSendRequestPreview#EmailSendRequestPreview',
          },
        },
      },
    },
  ],
  endpoints: [
    // PREVIEW
    {
      path: '/:id/preview',
      method: 'get',
      handler: async (req) => {
        const id = req.routeParams?.id as string

        const sendReq: any = await req.payload.findByID({
          collection: 'email-send-requests',
          id,
          req,
          depth: 2,
        })

        const { html } = await buildEmail({
          req,
          templateId: sendReq.template.id,
          data: sendReq.data ?? {},
          userEmail: sendReq.recipients[0].email,
        })

        return new Response(html, {
          status: 200,
          headers: { 'content-type': 'text/html; charset=utf-8' },
        })
      },
    },

    {
      path: '/:id/send-stream',
      method: 'post',
      handler: async (req) => {
        const id = req.routeParams?.id as string

        const sendReq: any = await req.payload.findByID({
          collection: 'email-send-requests',
          id,
          req,
          depth: 0,
        })

        const total = (sendReq.recipients ?? []).length

        const encoder = new TextEncoder()

        const stream = new ReadableStream({
          start: async (controller) => {
            const write = (obj: any) => {
              controller.enqueue(encoder.encode(JSON.stringify(obj) + '\n'))
            }

            try {
              let sent = 0
              for (const r of sendReq.recipients ?? []) {
                const { subject, html } = await buildEmail({
                  req,
                  templateId: sendReq.template,
                  data: sendReq.data ?? {},
                  userEmail: r.email,
                })
                await req.payload.sendEmail({ to: r.email, subject, html })
                sent += 1
                write({ type: 'progress', sent, total, email: r.email })
              }

              await req.payload.update({
                collection: 'email-send-requests',
                id,
                req,
                data: { status: 'sent', sentAt: new Date().toISOString() },
              })

              write({ type: 'done', sent, total })
              controller.close()
            } catch (err: any) {
              await req.payload.update({
                collection: 'email-send-requests',
                id,
                req,
                data: {
                  status: 'error',
                },
              })

              write({
                type: 'error',
                message: err?.message ? String(err.message) : 'Unknown error',
              })
              controller.close()
            }
          },
        })

        return new Response(stream, {
          status: 200,
          headers: {
            'content-type': 'application/x-ndjson; charset=utf-8',
            'cache-control': 'no-cache',
          },
        })
      },
    },
    {
      path: '/:id/sync-recipients',
      method: 'post',
      handler: async (req) => {
        if (req.user?.role !== 'admin') {
          return Response.json({ error: 'Forbidden' }, { status: 403 })
        }

        const id = req.routeParams?.id as string

        const emails = new Set<string>()
        let page = 1
        const limit = 200

        while (true) {
          const res = await req.payload.find({
            collection: 'subscriptions',
            req,
            depth: 0,
            limit,
            page,
          })

          for (const doc of res.docs ?? []) {
            const email = String(doc.email ?? '')
              .trim()
              .toLowerCase()
            if (email) emails.add(email)
          }

          if (!res.hasNextPage) break
          page += 1
        }

        const recipients = Array.from(emails).map((email) => ({ email }))

        await req.payload.update({
          collection: 'email-send-requests',
          id,
          req,
          data: { recipients }, // OVERWRITE
        })

        return Response.json({ count: recipients.length }, { status: 200 })
      },
    },
  ],
}
