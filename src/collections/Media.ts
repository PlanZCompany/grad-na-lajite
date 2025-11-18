import { uploadToSuperhosting } from '@/lib/uploadToHost'
import type { CollectionConfig } from 'payload'
import path from 'path'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
  ],
  upload: {
    adminThumbnail: 'thumbnail',
    focalPoint: true,
  },
  hooks: {
    afterChange: [
      async ({ doc, operation }) => {
        if (operation !== 'create') return doc
        if (!doc?.filename) return doc

        // локалният път до файла, който Payload е записал
        const localPath = path.join(
          process.cwd(),
          'media', // ако staticDir е друга – смени и тук
          doc.filename as string,
        )

        try {
          await uploadToSuperhosting(localPath, doc.filename as string)
        } catch (err) {
          console.error('Error uploading to Superhosting:', err)
          return doc
        }
      },
    ],
    afterRead: [
      ({ doc }) => {
        if (doc?.filename && process.env.SH_MEDIA_BASE_URL) {
          // тук насилваме URL-а да сочи към SuperHosting
          doc.url = `${process.env.SH_MEDIA_PREFIX}${doc.filename}`
        }
        return doc
      },
    ],
  },
}
