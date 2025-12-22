import type { CollectionBeforeValidateHook } from 'payload'

export const normalizeCode: CollectionBeforeValidateHook = async ({ data }) => {
  if (typeof data?.code === 'string') {
    data.code = data.code.trim().toUpperCase()
  }
  return data
}
