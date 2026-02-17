import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidatePath } from 'next/cache'

export const revalidateHeaderBanner: CollectionAfterChangeHook = ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    if (doc._status === 'published') {
      const path = `/headerBanner/${doc.slug}`

      payload.logger.info(`Revalidating post at path: ${path}`)

      revalidatePath(path)
    }

    if (previousDoc._status === 'published' && doc._status !== 'published') {
      const oldPath = `/headerBanner/${previousDoc.slug}`

      payload.logger.info(`Revalidating old post at path: ${oldPath}`)

      revalidatePath(oldPath)
    }
  }
  return doc
}

export const revalidateDeleteHeaderBanner: CollectionAfterDeleteHook = ({
  doc,
  req: { context },
}) => {
  if (!context.disableRevalidate) {
    const path = `/headerBanner/${doc?.slug}`

    revalidatePath(path)
  }

  return doc
}
