import { Page } from '@/payload-types'

export type LinkObject = {
  link: {
    type?: 'reference' | 'custom' | 'anchorSectionId' | null | undefined
    newTab?: boolean | null | undefined
    reference?:
      | {
          relationTo: 'pages'
          value: string | Page
        }
      | {
          relationTo: 'blog'
          value: string | Page
        }
      | {
          relationTo: 'category'
          value: string | Page
        }
      | {
          relationTo: 'sub-category'
          value: string | Page
        }
      | null
      | undefined
    url?: string | null
    label: string
  }
  id?: string | null
}

export const generateHref = (linkObject: LinkObject) => {
  const linkValue = linkObject?.link?.reference?.value as Page
  if (!linkObject || linkValue?.slug === 'home') {
    return '/'
  }

  if (linkValue?.slug === 'products') {
    return `/produkt`
  }

  if (linkValue?.slug === 'category') {
    return `/kategorii`
  }
  //internal
  if (linkObject?.link?.type === 'reference') {
    if (linkObject?.link?.reference?.relationTo === 'pages') {
      return `/${linkValue?.slug}`
    } else {
      return `/${linkObject?.link?.reference?.relationTo}/${linkValue?.slug}`
    }
    //external
  } else if (linkObject?.link.type === 'custom') {
    return linkObject?.link?.url || '/'
  } else {
    return '/'
  }
}
