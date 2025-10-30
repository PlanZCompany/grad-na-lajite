import React, { Fragment } from 'react'

import type {
  ContentBlock as ContentBlockType,
  MediaBlock as MediaBlockType,
} from '@/payload-types'

import { MediaBlock } from '@/blocks/MediaBlock/Component'
import { ContentBlock } from './Content/Component'

const blockComponents = {
  mediaBlock: MediaBlock,
  content: ContentBlock,
}

export const RenderBlocks: React.FC<{
  blocks: (ContentBlockType | MediaBlockType)[] | null | undefined
  observe?: boolean
}> = (props) => {
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
