import { RichText } from '@/components/Custom'
import { ContentBlock as ContentBlockProps } from '@/payload-types'
import React from 'react'

export const ContentBlock: React.FC<ContentBlockProps> = (props) => {
  const { content } = props

  return (
    <section className="w-full flex flex-col mx-auto py-[40px] xl:py-[80px] md:px-6 xl:px-[unset] relative">
      <div className='fixed inset-0 red_background z-[-1]'></div>
      <RichText
        className="w-full blog_post_richtext relative z-[2]"
        data={content}
        enableGutter={false}
      />
    </section>
  )
}
