import { redirectsPlugin } from '@payloadcms/plugin-redirects'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { Plugin } from 'payload'
import { revalidateRedirects } from '@/hooks/revalidateRedirects'
import { GenerateTitle, GenerateURL } from '@payloadcms/plugin-seo/types'
import { formBuilderPlugin } from '@payloadcms/plugin-form-builder'

import { getServerSideURL } from '@/utils/getServerSideUrl'
import { lexicalEditor, FixedToolbarFeature } from '@payloadcms/richtext-lexical'
import { Page } from '@/payload-types'

const generateTitle: GenerateTitle<Page> = ({ doc }) => {
  return doc?.title ? `${doc.title} | Обичайте се` : 'Обичайте се'
}

const generateURL: GenerateURL<Page> = ({ doc }) => {
  const url = getServerSideURL()

  return doc?.slug ? `${url}/${doc.slug}` : url
}

export const plugins: Plugin[] = [
  redirectsPlugin({
    collections: ['pages'],
    overrides: {
      // @ts-expect-error - This is a valid override, mapped fields don't resolve to the same type
      fields: ({ defaultFields }) => {
        return defaultFields.map((field) => {
          if ('name' in field && field.name === 'from') {
            return {
              ...field,
              admin: {
                description: 'You will need to rebuild the website when changing this field.',
              },
            }
          }
          return field
        })
      },
      hooks: {
        afterChange: [revalidateRedirects],
      },
    },
  }),
  seoPlugin({
    generateTitle,
    generateURL,
  }),
  formBuilderPlugin({
    fields: {
      payment: false,
      checkbox: false,
      country: false,
      date: false,
      email: true,
      message: false,
      number: false,
      select: false,
      state: false,
      text: true,
      textarea: true,
    },
    formOverrides: {
      fields: ({ defaultFields }) => {
        return [
          ...defaultFields.map((field) => {
            // Example: customize confirmationMessage rich text editor
            if ('name' in field && field.name === 'confirmationMessage') {
              return {
                ...field,
                editor: lexicalEditor({
                  features: ({ rootFeatures }) => [...rootFeatures, FixedToolbarFeature()],
                }),
              }
            }

            return field
          }),
        ]
      },
    },
    formSubmissionOverrides: {
      fields: ({ defaultFields }) => [
        ...defaultFields,
        {
          name: 'approved',
          type: 'checkbox',
          label: 'Удобрено',
          defaultValue: false,
          admin: {
            position: 'sidebar',
            description:
              'Ако бъде удобрен коментара, ще бъде публикуван в блога на съответната личност',
          },
        },
        {
          name: 'blogId',
          type: 'text',
          admin: {
            position: 'sidebar',
            description: 'id към съответния blog (само за Коментарна форма)',
          },
          readOnly: false,
        },
      ],
      access: {
        read: () => true,
        create: () => true,
        update: () => true,
        delete: () => true,
      },
    },
  }),
]
