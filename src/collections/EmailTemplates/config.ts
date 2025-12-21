import type { CollectionConfig } from 'payload'

export const EmailTemplates: CollectionConfig = {
  slug: 'email-templates',
  labels: { singular: 'Email Template', plural: 'Email Templates' },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'slug', 'updatedAt'],
  },
  access: {
    read: () => true,
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true },

    // Meta
    { name: 'subject', type: 'text', required: true },
    { name: 'preheader', type: 'text' },

    // 2) HERO
    {
      name: 'hero',
      type: 'group',
      fields: [
        { name: 'image', type: 'upload', relationTo: 'media' },
        { name: 'imageAlt', type: 'text' },
        { name: 'title', type: 'text', required: true },
        { name: 'text', type: 'textarea', required: true },
        {
          name: 'primaryCta',
          type: 'group',
          fields: [
            { name: 'label', type: 'text', required: true },
            { name: 'url', type: 'text', required: true },
          ],
        },
      ],
    },

    // 3) INFO BLOCKS (1-3)
    {
      name: 'infoBlocks',
      type: 'array',
      minRows: 1,
      maxRows: 3,
      fields: [
        { name: 'icon', type: 'upload', relationTo: 'media' },
        { name: 'iconAlt', type: 'text' },
        { name: 'title', type: 'text', required: true },
        { name: 'text', type: 'textarea', required: true },
        {
          name: 'link',
          type: 'group',
          fields: [
            { name: 'label', type: 'text' }, // "Виж повече" / "FAQ"
            { name: 'url', type: 'text' },
          ],
        },
      ],
    },

    // 4) PROMO CODE (optional)
    {
      name: 'promo',
      type: 'group',
      fields: [
        { name: 'enabled', type: 'checkbox', defaultValue: false },
        { name: 'icon', type: 'upload', relationTo: 'media' },
        { name: 'iconAlt', type: 'text' },
        { name: 'codeName', type: 'text' }, // ISTINA10 / TAINA15
        { name: 'discountText', type: 'text' }, // "-10% за твоята поръчка"
        {
          name: 'instructionText',
          type: 'text',
          defaultValue: 'Въведи кода в количката преди плащане.',
        },
      ],
    },

    // 5) SECONDARY CTA (optional)
    {
      name: 'secondaryCta',
      type: 'group',
      fields: [
        { name: 'enabled', type: 'checkbox', defaultValue: false },
        { name: 'introText', type: 'text' }, // "Искаш да видиш повече преди да решиш?"
        {
          name: 'button',
          type: 'group',
          fields: [
            { name: 'label', type: 'text' }, // "Виж как се играе"
            { name: 'url', type: 'text' },
          ],
        },
      ],
    },
  ],
}
