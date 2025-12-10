import { Blog, ContentBlock } from '@/payload-types'
import { containsQuery } from './translate'
import { extractTextFromRichText } from './richtextForSearch'

export const recursiveSearchBlogs = (blogs: Blog[], query: string): Blog[] => {
  const results: Blog[] = []

  blogs.forEach((blog) => {
    const titleMatch = containsQuery(blog.title, query)
    // const descriptionMatch = blog.description?.root?.children?.forEach((child) => {
    //   if (child.type === 'paragraph') {
    //     if ('children' in child) {
    //       ;(child.children as any).forEach((paragraphChild: any) => {
    //         if (paragraphChild.type === 'text') {
    //           return containsQuery(paragraphChild.text, query)
    //         }
    //         return false
    //       })
    //     }
    //   }
    // })

    const descriptions = blog.description?.root?.children
    const descriptionMatch = descriptions?.some((child) => {
      if (child.type === 'paragraph') {
        if ('children' in child) {
          const paragraphChildren = child.children as any
          return paragraphChildren.some((paragraphChild: any) => {
            if (paragraphChild.type === 'text') {
              return containsQuery(paragraphChild.text, query)
            }
            return false
          })
        }
      }
      return false
    })

    const fullText = extractTextFromRichText(blog.layout as ContentBlock[]).toLowerCase()

    const contentMatch = fullText.includes(query.toLowerCase())

    if (titleMatch || descriptionMatch || contentMatch) {
      results.push(blog)
    }
  })

  return results
}
