import { uploadToSuperhosting } from '@/lib/uploadToHost'
import type { CollectionConfig } from 'payload'
import path from 'path'
import { unlink } from 'fs/promises'

const uploadStaticDir = process.env.NODE_ENV === 'production' ? '/tmp/media' : 'media'

const uploadLocalDir =
  process.env.NODE_ENV === 'production' ? '/tmp/media' : path.join(process.cwd(), 'media')

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
    staticDir: uploadStaticDir,
  },
  hooks: {
    afterChange: [
      async ({ doc, operation }) => {
        if (operation !== 'create') return doc
        if (!doc?.filename) return doc

        const localPath = path.join(uploadLocalDir, doc.filename as string)
        console.log('localPath (prod/dev):', localPath)

        try {
          await uploadToSuperhosting(localPath, doc.filename as string)

          await unlink(localPath).catch((err) => {
            console.error('Error deleting local file:', err)
          })

          return doc
        } catch (err) {
          console.error('Error uploading to Superhosting:', err)
          return doc
        }
      },
    ],
    afterRead: [
      ({ doc }) => {
        if (doc?.filename && process.env.SH_MEDIA_BASE_URL) {
          doc.url = `${process.env.SH_MEDIA_PREFIX}${doc.filename}`
        }
        return doc
      },
    ],
  },
}
