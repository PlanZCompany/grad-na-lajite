import type { CollectionBeforeValidateHook } from 'payload'

export const validateDateRange: CollectionBeforeValidateHook = async ({ data }) => {
  const start = data?.startDate ? new Date(data.startDate).getTime() : null
  const end = data?.endDate ? new Date(data.endDate).getTime() : null

  if (start !== null && end !== null && end < start) {
    throw new Error('endDate не може да е преди startDate.')
  }

  return data
}
