import { RichText } from '@/components/Custom'
import { ContentBlock as ContentBlockProps } from '@/payload-types'
import React from 'react'

export const ContentBlock: React.FC<ContentBlockProps> = (props) => {
  const { content } = props

  return (
    <section className="w-full flex flex-col mx-auto py-6 md:py-[40px] md:px-6 xl:px-[unset] relative">
      <RichText
        className="w-full relative z-[2] blog_post_richtext"
        data={content}
        enableGutter={false}
      />
    </section>
  )
}
