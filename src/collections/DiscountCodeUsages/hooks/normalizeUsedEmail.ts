import type { CollectionBeforeValidateHook } from 'payload'

export const normalizeUsedEmail: CollectionBeforeValidateHook = async ({ data }) => {
  if (typeof data?.usedEmail === 'string') {
    data.usedEmail = data.usedEmail.trim().toLowerCase()
  }
  return data
}
