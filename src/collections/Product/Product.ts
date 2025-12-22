import type { CollectionConfig, Field, NumberFieldSingleValidation } from 'payload'

import { anyone } from '../../access/anyone'
import { authenticated } from '../../access/authenticated'
import { revalidateDeleteProduct, revalidateProduct } from './hooks/revalidateProduct'

export const Product: CollectionConfig = {
  slug: 'product',
  labels: {
    singular: 'Продукт',
    plural: 'Продукти',
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  defaultPopulate: {
    title: true,
    slug: true,
    id: true,
    shortDescription: true,
    mediaArray: true,
  },
  admin: {
    defaultColumns: ['title', 'price'],
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'mediaArray',
      type: 'array',
      label: 'Снимки',
      minRows: 1,
      maxRows: 5,
      fields: [
        {
          name: 'file',
          type: 'upload',
          label: 'Снимка',
          relationTo: 'media',
          required: false,
        } as Field,
        {
          name: 'externalVideo',
          type: 'text',
          required: false,
          label: 'Връзка към вънщен източник',
        },
      ],
    },
    {
      name: 'price',
      type: 'number',
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'isOnSale',
      label: 'Промоция',
      type: 'checkbox',
      defaultValue: false,
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'salePrice',
      type: 'number',
      label: 'Промоционална цена',
      defaultValue: 0,
      hasMany: false as const,
      admin: {
        position: 'sidebar',
        condition: (_unusedData, siblingFields) =>
          Boolean((siblingFields as { isOnSale?: boolean } | undefined)?.isOnSale),
      },
      validate: ((enteredSalePrice, validateOptions) => {
        const siblingFields = validateOptions?.siblingData as { isOnSale?: boolean } | undefined
        const isProductOnSale = Boolean(siblingFields?.isOnSale)

        if (!isProductOnSale) return true

        if (enteredSalePrice == null || enteredSalePrice <= 0) {
          return 'Трябва да въведете промоционална цена'
        }

        return true
      }) as NumberFieldSingleValidation,
    },

    {
      name: 'quantity',
      type: 'number',
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
      },
    },
  ],
  hooks: {
    afterChange: [revalidateProduct],
    afterDelete: [revalidateDeleteProduct],
  },
  versions: {
    drafts: {
      autosave: {
        interval: 800,
      },
      schedulePublish: true,
    },
    maxPerDoc: 50,
  },
}
