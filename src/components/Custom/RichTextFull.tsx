import { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import React from 'react'
import RichText from './RichText'

const RichTextFull = ({
  description,
  className,
}: {
  description: SerializedEditorState
  className?: string
}) => {
  return (
    <RichText
      data={description as any}
      className={`${className} leading-[130%] text-primaryWhite
      px-0 py-4 [&>ul]:!mt-4 [&>ul_ul]:!mt-4 [&>ul]:!mb-8 [&>ul_ul]:!mb-8 [&>ul]:!list-disc [&>ul_ul]:!list-disc
      [&>ul]:!list-inside [&>ul_ul]:!list-inside  [&>ul]:!marker:text-primaryWhite
      [&>li]:!list-disc [&>li]:!list-inside [&>ul_ul>li]:!list-inside
      [&>li]:!marker:text-primaryWhite [&>ul_ul>li]:!list-decimal [&>ul_ul>li]:!pl-3 [&>ul_ul>li]:!pt-2 font-montserrat-regular
      [&_a]:!text-primaryWhite [&_a]:!underline hover:[&_a]:!text-primaryWhiteAccent`}
    />
  )
}

export default RichTextFull
