import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'
import { Product } from '@/payload-types'

export const revalidateProduct: CollectionAfterChangeHook<Product> = ({
  doc,
  req: { context },
}) => {
  if (!context.disableRevalidate) {
    if (doc._status === 'published') {
      const path = `/`

      revalidatePath(path)
      revalidateTag('pages-sitemap')
    }
  }
  return doc
}

export const revalidateDeleteProduct: CollectionAfterDeleteHook<Product> = ({
  doc,
  req: { context },
}) => {
  if (!context.disableRevalidate) {
    const path = `/`

    revalidatePath(path)
    revalidateTag('pages-sitemap')
  }

  return doc
}
