import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidatePath } from 'next/cache'

const ROOT_LAYOUT_PATH = '/'

export const revalidateHeaderBanner: CollectionAfterChangeHook = ({
  doc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    payload.logger.info('Revalidating root layout after header banner change')
    revalidatePath(ROOT_LAYOUT_PATH, 'layout')
  }

  return doc
}

export const revalidateDeleteHeaderBanner: CollectionAfterDeleteHook = ({
  doc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    payload.logger.info('Revalidating root layout after header banner delete')
    revalidatePath(ROOT_LAYOUT_PATH, 'layout')
  }

  return doc
}
