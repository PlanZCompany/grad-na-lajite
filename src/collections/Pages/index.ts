import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'
import { revalidateDelete, revalidatePage } from './hooks/revalidatePage'
import { populatePublishedAt } from '@/hooks/populatePublishedAt'
import { slugField } from '@/fields/slug'
import { MediaBlock } from '@/blocks/MediaBlock/config'
import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'
import { generatePreviewPath } from '@/utils/generatePreviewPath'
import { Content } from '@/blocks/Content/config'
import { heroCommon } from '@/Hero/Common/config'
import { HomeBlock } from '@/blocks/HomeBlock/config'
import { SubscriptionForm } from '@/blocks/SubsciptionForm/config'
import { ProductBlock } from '@/blocks/ProductBlock/config'
import { AboutBlock } from '@/blocks/AboutBlock/config'
import { ContactBlock } from '@/blocks/ContactBlock/config'
import { FaqBlock } from '@/blocks/FaqBlock/config'
import { FormBlock } from '@/blocks/Form/config'
import { RegulatoryBlock } from '@/blocks/RegulatoryBlock/config'
import { PDFBlock } from '@/blocks/PDFBlock/config'

export const Pages: CollectionConfig<'pages'> = {
  slug: 'pages',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  defaultPopulate: {
    title: true,
    slug: true,
  },
  admin: {
    defaultColumns: ['title', 'slug', 'updatedAt'],
    livePreview: {
      url: ({ data, req }) => {
        const path = generatePreviewPath({
          slug: typeof data?.slug === 'string' ? data.slug : '',
          collection: 'pages',
          req,
        })

        return path
      },
    },
    preview: (data, { req }) =>
      generatePreviewPath({
        slug: typeof data?.slug === 'string' ? data.slug : '',
        collection: 'pages',
        req,
      }),
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Заглавие на страницата',
    },
    {
      type: 'tabs',
      tabs: [
        {
          fields: [heroCommon],
          label: 'Главна Секция',
          admin: {
            condition: (data) => data.slug === 'home',
          },
        },
        {
          fields: [
            {
              name: 'layout',
              type: 'blocks',
              blocks: [
                MediaBlock,
                Content,
                HomeBlock,
                SubscriptionForm,
                ProductBlock,
                AboutBlock,
                ContactBlock,
                FaqBlock,
                FormBlock,
                RegulatoryBlock,
                PDFBlock,
              ],
              defaultValue: [],
              required: false,
              admin: {
                initCollapsed: false,
              },
            },
          ],
          label: 'Съдържание',
        },
        {
          name: 'meta',
          label: 'SEO - Мета информация',
          fields: [
            OverviewField({
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
              imagePath: 'meta.image',
            }),
            MetaTitleField({
              hasGenerateFn: true,
            }),
            MetaImageField({
              relationTo: 'media',
            }),

            MetaDescriptionField({}),
            PreviewField({
              // if the `generateUrl` function is configured
              hasGenerateFn: true,

              // field paths to match the target field for data
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
            }),
          ],
        },
      ],
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
      },
      label: 'Дата на публикуване',
    },
    {
      name: 'regulatoryPage',
      type: 'checkbox',
      label: 'Регулаторна страница',
      defaultValue: false,
      admin: {
        position: 'sidebar',
      },
    },
    ...slugField(),
  ],
  hooks: {
    afterChange: [revalidatePage],
    beforeChange: [populatePublishedAt],
    afterDelete: [revalidateDelete],
    beforeValidate: [
      ({ data }) => {
        const blocks = data?.blocks ?? data?.content ?? null
        if (Array.isArray(blocks)) {
          for (const b of blocks) {
            if (b?.blockType === 'productBlock' /* your slug here */) {
              if (Array.isArray(b.mediaArray)) {
                b.mediaArray = b.mediaArray.filter((row: any) => !!row?.media)
              }
            }
          }
        }
        return data
      },
    ],
  },
  versions: {
    drafts: {
      autosave: {
        interval: 100, // We set this interval for optimal live preview
      },
      schedulePublish: true,
    },
    maxPerDoc: 20,
  },
}
