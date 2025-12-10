// src/payload/globals/Shipping.ts
import type { GlobalConfig } from 'payload'
import { revalidateShipping } from './hooks/revalidateShipping'

export const Shipping: GlobalConfig = {
  slug: 'shipping',
  label: 'Куриерски услуги',
  fields: [
    {
      name: 'courierOptions',
      label: 'Courier shipping options',
      type: 'array',
      labels: {
        singular: 'Shipping option',
        plural: 'Shipping options',
      },
      fields: [
        {
          name: 'courier_name',
          label: 'Courier name',
          type: 'text',
          required: true,
          admin: {
            description: 'e.g. Econt, Speedy, BoxNow',
          },
        },
        {
          name: 'courier_code',
          label: 'Courier code',
          type: 'select',
          required: true,
          options: [
            { label: 'Econt', value: 'econt' },
            { label: 'Speedy', value: 'speedy' },
            { label: 'BoxNow', value: 'boxnow' },
          ],
        },
        {
          name: 'method',
          label: 'Method',
          type: 'select',
          required: true,
          options: [
            { label: 'Office / Locker', value: 'office' }, // до офис / автомат
            { label: 'Address', value: 'address' }, // до адрес
            { label: 'Locker (BoxNow)', value: 'locker' }, // шкафче
          ],
        },
        {
          name: 'base_fee',
          label: 'Base fee',
          type: 'number',
          required: true,
          min: 0,
          admin: {
            step: 0.01,
            description: 'Standard fee, e.g. 6.90',
          },
        },
        {
          name: 'free_shipping',
          label: 'Always free shipping',
          type: 'checkbox',
          defaultValue: false,
        },
        {
          name: 'free_over_amount',
          label: 'Free over amount',
          type: 'number',
          min: 0,
          admin: {
            step: 0.01,
            description: 'Free shipping above this total (leave empty for no threshold)',
          },
        },
        {
          name: 'is_active',
          label: 'Active',
          type: 'checkbox',
          defaultValue: true,
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateShipping],
  },
}
