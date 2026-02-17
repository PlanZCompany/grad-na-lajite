import type { CollectionConfig, TextFieldSingleValidation } from 'payload'
import { link } from '@/fields/link'
import {
  revalidateDeleteHeaderBanner,
  revalidateHeaderBanner,
} from './hooks/revalidateHeaderBanner'

const HEX3_OR_6 = /^#(?:[0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/

const validateHexColor: TextFieldSingleValidation = (value) => {
  if (value == null || value === '') return true
  if (typeof value !== 'string') return 'Color must be a string'
  return HEX3_OR_6.test(value) ? true : 'Enter a valid hex color like #FFF or #111111'
}

export const HeaderBanner: CollectionConfig = {
  slug: 'headerBanner',
  labels: {
    singular: 'Хедър банер',
    plural: 'Хедър банери',
  },
  admin: {
    defaultColumns: ['title', 'isActive', 'placement', 'order'],
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      unique: true,
      label: 'Entry label',
      admin: {
        description: 'Име на банера за административни цели. Няма да е видимо за потребителите.',
      },
    },

    {
      name: 'placement',
      type: 'select',
      required: true,
      defaultValue: 'header_static',
      options: [
        { label: 'Статичен (горна лента)', value: 'header_static' },
        { label: 'Въртящ се банер', value: 'header_rotating' },
      ],
    },
    {
      name: 'order',
      type: 'number',
      required: true,
      min: 1,
    },

    {
      name: 'textContent',
      type: 'textarea',
      required: true,
      label: 'Текстово съдържание',
    },

    {
      name: 'icon',
      type: 'upload',
      relationTo: 'media',
      required: false,
    },

    link({
      appearances: false,
    }),

    {
      name: 'textColor',
      type: 'text',
      required: true,
      label: 'Цвят на текста #111 / #111111',
      validate: validateHexColor,
    },

    {
      name: 'backgroundColor',
      type: 'text',
      label: 'Цвят на фона #111 / #111111',
      required: true,
      validate: validateHexColor,
    },
    {
      name: 'isActive',
      type: 'checkbox',
      label: 'Активен ли е банера?',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'showOnMobile',
      type: 'checkbox',
      label: 'Показване на мобилни устройства?',
      defaultValue: true,
      admin: {
        position: 'sidebar',
      },
    },

    {
      name: 'showOnDesktop',
      type: 'checkbox',
      label: 'Показване на десктоп?',
      defaultValue: true,
      admin: {
        position: 'sidebar',
      },
    },

    {
      name: 'startDate',
      type: 'date',
      label: 'Start date',
      admin: { date: { pickerAppearance: 'dayAndTime' }, position: 'sidebar' },
    },
    {
      name: 'endDate',
      type: 'date',
      label: 'End date',
      admin: { date: { pickerAppearance: 'dayAndTime' }, position: 'sidebar' },
    },
  ],
  hooks: {
    afterChange: [revalidateHeaderBanner],
    afterDelete: [revalidateDeleteHeaderBanner],
  },
}
