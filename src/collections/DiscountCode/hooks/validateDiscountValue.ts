import type { CollectionBeforeValidateHook } from 'payload'

export const validateDiscountValue: CollectionBeforeValidateHook = async ({ data }) => {
  if (data?.discountType === 'percent') {
    const v = Number(data?.discountValue)
    if (!Number.isFinite(v) || v <= 0) throw new Error('discountValue трябва да е > 0.')
    if (v > 50)
      throw new Error('discountValue не може да е над 50% (MAX_GLOBAL_DISCOUNT_PERCENT = 50).')
  }
  return data
}
