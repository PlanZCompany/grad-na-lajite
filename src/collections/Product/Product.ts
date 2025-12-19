import type { CollectionConfig, Field } from 'payload'

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
      admin: {
        position: 'sidebar',
        condition: (siblingData) => siblingData.isOnSale,
      },
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
