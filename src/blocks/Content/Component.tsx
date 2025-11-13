import { RichText } from '@/components/Custom'
import { ContentBlock as ContentBlockProps } from '@/payload-types'
import React from 'react'

export const ContentBlock: React.FC<ContentBlockProps> = (props) => {
  const { content } = props

  return (
    <section className="w-full flex flex-col mx-auto py-6 md:py-[40px] md:px-6 xl:px-[unset] relative">
      <RichText
        className="w-full relative z-[2] blog_post_richtext
       [&_ul]:pl-3
       [&>ul]:!mt-4 [&>ul_ul]:!mt-4 [&>ul]:!mb-8 [&>ul_ul]:!mb-8 [&>ul]:!list-disc [&>ul_ul]:!list-disc
      [&>ul]:!list-inside [&>ul_ul]:!list-inside  [&>ul]:!marker:text-white
      [&>li]:!list-disc [&>li]:!list-inside [&>ul_ul>li]:!list-inside
      [&>li]:!marker:text-white [&>ul_ul>li]:!list-decimal [&>ul_ul>li]:!pl-3 [&>ul_ul>li]:!pt-2 font-georgia
      [&_a]:!text-purpleBackground [&_a]:!underline hover:[&_a]:!text-purpleBackground`
        "
        data={content}
        enableGutter={false}
      />
    </section>
  )
}
