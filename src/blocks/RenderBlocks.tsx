import React, { Fragment } from 'react'
import type { FC } from 'react'

import type {
  AboutBlock,
  ContactBlock,
  ContentBlock as ContentBlockType,
  FaqBlock,
  HomeBlock,
  InfoAndImageBlock,
  MediaBlock as MediaBlockType,
  PDFBlock,
  ProductBlock,
  RegulatoryBlock,
  SubscriptionForm,
  TableBlock,
} from '@/payload-types'

import { blockComponents } from '@/blocks/blockComponents'

type CTABlockType = {
  id?: string | null
  blockType: 'cta'
  content: string
  buttonText: string
  buttonLink?:
    | string
    | {
        slug?: string | null
      }
    | null
}

type BaseRenderableBlock =
  | ContentBlockType
  | CTABlockType
  | MediaBlockType
  | HomeBlock
  | SubscriptionForm
  | ProductBlock
  | AboutBlock
  | ContactBlock
  | FaqBlock
  | RegulatoryBlock
  | InfoAndImageBlock
  | TableBlock
  | PDFBlock

type NestedBlocksBlock = {
  id?: string | null
  blockType: 'nestedBlocks'
  items?: RenderableBlocks
}

type RenderableBlock = BaseRenderableBlock | NestedBlocksBlock
type RenderableBlocks = RenderableBlock[] | null | undefined

type RenderBlocksProps = {
  blocks: RenderableBlocks
  observe?: boolean
}

export const RenderBlocks: FC<RenderBlocksProps> = (props) => {
  const { blocks } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockType } = block

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType as keyof typeof blockComponents]

            if (Block) {
              return (
                <div className={`w-full`} key={`${blockType}-${index}`} id={block?.id as string}>
                  <Block {...(block as any)} />
                </div>
              )
            }
          }
          return null
        })}
      </Fragment>
    )
  }

  return null
}
