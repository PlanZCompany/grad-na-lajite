import { Blog } from '@/payload-types'
import { containsQuery } from './translate'

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

    if (titleMatch || descriptionMatch) {
      results.push(blog)
    }
  })

  return results
}
