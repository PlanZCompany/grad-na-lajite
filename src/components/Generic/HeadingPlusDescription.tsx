import React from 'react'
import GenericHeading from './GenericHeading'
import { RichText } from '../Custom'
import GenericParagraph from './GenericParagraph'

export type HEADING_TYPE =
  | {
      [k: string]: unknown
      root: {
        type: string
        children: {
          [k: string]: unknown
          type: any
          version: number
        }[]
        direction: 'ltr' | 'rtl' | null
        format: '' | 'left' | 'start' | 'center' | 'right' | 'end' | 'justify'
        indent: number
        version: number
      }
    }
  | null
  | undefined

export type DESCRIPTION_TYPE =
  | {
      [k: string]: unknown
      root: {
        type: string
        children: {
          [k: string]: unknown
          type: any
          version: number
        }[]
        direction: 'ltr' | 'rtl' | null
        format: '' | 'left' | 'start' | 'center' | 'right' | 'end' | 'justify'
        indent: number
        version: number
      }
    }
  | null
  | undefined

const HeadingPlusDescription = ({
  heading,
  description = null,
  headingTextShadow = true,
}: {
  heading: HEADING_TYPE
  description?: DESCRIPTION_TYPE
  headingTextShadow?: boolean
}) => {
  return (
    <article className="flex justify-center items-center gap-s flex-col">
      {heading && (
        <GenericHeading
          textShadow={headingTextShadow}
          headingType="h2"
          align="text-center"
          extraClass="border-b-[1px] border-primaryYellow pb-3"
        >
          <RichText data={heading} />
        </GenericHeading>
      )}
      {description && (
        <GenericParagraph>
          <RichText data={description} />
        </GenericParagraph>
      )}
    </article>
  )
}

export default HeadingPlusDescription
