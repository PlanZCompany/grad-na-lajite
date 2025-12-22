import type { CollectionBeforeValidateHook } from 'payload'

export const validateUsageIdentity: CollectionBeforeValidateHook = async ({ data }) => {
  const hasUser = Boolean(data?.user)
  const hasEmail = Boolean(data?.usedEmail)

  if (!hasUser && !hasEmail) {
    throw new Error('Когато няма user, usedEmail е задължителен (guest checkout).')
  }

  return data
}
