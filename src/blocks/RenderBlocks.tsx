import React, { Fragment } from 'react'
import type { FC } from 'react'

import type {
  AboutBlock,
  AboutHeroBlock,
  CTABlock,
  ContactBlock,
  ContentBlock as ContentBlockType,
  FaqBlock,
  HomeBlock,
  HomeGalleryPreviewBlock,
  HomeGameRules2Block,
  HomeHistoriesBlock,
  HomePartnersBlock,
  HomeShBlock,
  HomeSinglePreviewBlock,
  HomeTestimonialsBlock,
  HomeWhatIsTheGameBlock,
  HomeWhyToChoseUsBlock,
  HowToPlayBlock,
  InfoAndImageBlock,
  MediaBlock as MediaBlockType,
  MissionBlock,
  NestedBlocks,
  PDFBlock,
  ProductBlock,
  ProductBoxBlock,
  ProductHeroBlock,
  RegulatoryBlock,
  SimpleDividerBlock,
  SubscriptionForm,
  TableBlock,
  ValuesBlock,
} from '@/payload-types'

import { blockComponents } from '@/blocks/blockComponents'

type BaseRenderableBlock =
  | ContentBlockType
  | CTABlock
  | MediaBlockType
  | HomeBlock
  | HomeShBlock
  | HomeWhyToChoseUsBlock
  | HomeWhatIsTheGameBlock
  | HomeGameRules2Block
  | HomeSinglePreviewBlock
  | HomeGalleryPreviewBlock
  | HomeHistoriesBlock
  | HomePartnersBlock
  | HomeTestimonialsBlock
  | SubscriptionForm
  | ProductBlock
  | ProductHeroBlock
  | ProductBoxBlock
  | AboutBlock
  | AboutHeroBlock
  | ContactBlock
  | FaqBlock
  | HowToPlayBlock
  | MissionBlock
  | SimpleDividerBlock
  | RegulatoryBlock
  | InfoAndImageBlock
  | TableBlock
  | PDFBlock
  | ValuesBlock

type RenderableBlock = BaseRenderableBlock | NestedBlocks
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
