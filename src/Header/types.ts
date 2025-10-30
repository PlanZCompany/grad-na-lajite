import { Category, Media } from '@/payload-types'

export type BlogForSearchProps = {
  id: string
  title: string
  media: string | Media
  slug?: string | null | undefined
  type: 'blog'
}[]

export type CategoriesForSearch = {
  id: string
  title: string
  media: string | Media
  slug?: string | null | undefined
  type: 'category'
}[]

export type SubCategoriesForSearch = {
  id: string
  title: string
  icon: string | Media
  slug?: string | null | undefined
  parentCategory: Category | string
  type: 'subCategory'
}[]
