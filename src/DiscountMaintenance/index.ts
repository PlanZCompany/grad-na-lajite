// src/payload/globals/DiscountMaintenance.ts
import type { GlobalConfig } from 'payload'

export const DiscountMaintenance: GlobalConfig = {
  slug: 'discount-maintenance',
  label: 'Discount maintenance',
  fields: [
    {
      name: 'clearDiscountCodeAttempts',
      type: 'ui',
      admin: {
        components: {
          Field: {
            path: '@/admin/ClearDiscountUsagesButton#ClearDiscountUsagesButton',
          },
        },
      },
    },
  ],
}
