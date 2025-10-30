import type { Field, GlobalConfig } from 'payload'
import { link } from '@/fields/link'
import { revalidateFooter } from './hooks/revalidateFooter'
import {
  lexicalEditor,
  HeadingFeature,
  FixedToolbarFeature,
  InlineToolbarFeature,
} from '@payloadcms/richtext-lexical'

export const Footer: GlobalConfig = {
  slug: 'footer',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'navItems',
      type: 'array',
      label: 'Навигация',
      fields: [
        link({
          appearances: false,
        }),
      ],
      maxRows: 15,
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '@/Footer/RowLabel#RowLabel',
        },
      },
    },
    {
      name: 'socialLinks',
      type: 'array',
      label: 'Социални мрежи',
      fields: [
        link({
          appearances: false,
        }),
        {
          name: 'media',
          type: 'upload',
          label: 'Media',
          maxDepth: 2,
          relationTo: 'media',
          required: false,
        } as Field,
      ],
      maxRows: 10,
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '@/Footer/RowLabel#RowLabel',
        },
      },
    },
    {
      name: 'regulatoryLinks',
      type: 'array',
      label: 'Линкове с регулатори',
      fields: [
        link({
          appearances: false,
        }),
      ],
      maxRows: 10,
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '@/Footer/RowLabel#RowLabel',
        },
      },
    },
    {
      name: 'contacts',
      type: 'richText',
      label: 'Контакти',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h3', 'h4', 'h5', 'h6'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ]
        },
      }),
    },
    {
      name: 'logo',
      label: 'ЛОГО',
      type: 'upload',
      maxDepth: 2,
      relationTo: 'media',
      required: false,
    } as Field,
  ],
  hooks: {
    afterChange: [revalidateFooter],
  },
}
