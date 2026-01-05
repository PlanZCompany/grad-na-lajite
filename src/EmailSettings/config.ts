import type { GlobalConfig } from 'payload'

export const EmailSettings: GlobalConfig = {
  slug: 'email-settings',
  label: 'Email Settings',
  access: {
    read: () => true,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Header',
          fields: [
            { name: 'siteUrl', type: 'text', required: true },
            { name: 'logo', type: 'upload', relationTo: 'media', required: true },
            { name: 'logoAlt', type: 'text', defaultValue: 'Град на Лъжите' },
          ],
        },
        {
          label: 'Social / Community',
          fields: [
            {
              name: 'communityIntroText',
              type: 'text',
              defaultValue: 'Виж как играят другите в Града:',
            },
            {
              name: 'socialLinks',
              type: 'array',
              fields: [
                {
                  name: 'platform',
                  type: 'text',
                  required: true,
                },
                { name: 'url', type: 'text', required: true },
                { name: 'media', type: 'upload', relationTo: 'media' },
              ],
            },
            { name: 'ugcImage', type: 'upload', relationTo: 'media' },
            { name: 'ugcAlt', type: 'text', defaultValue: 'UGC - Град на Лъжите' },
          ],
        },
        {
          label: 'Footer',
          fields: [
            { name: 'contactEmail', type: 'email', required: true },
            { name: 'footerSiteUrl', type: 'text', required: true },
            { name: 'unsubscribeUrl', type: 'text', required: true },
            { name: 'termsUrl', type: 'text' },
            { name: 'privacyUrl', type: 'text' },
            {
              name: 'flavorText',
              type: 'text',
              defaultValue:
                'Не всички писма от Града стигат до получателя. Радваме се, че това стигна.',
            },
          ],
        },
      ],
    },
  ],
}
