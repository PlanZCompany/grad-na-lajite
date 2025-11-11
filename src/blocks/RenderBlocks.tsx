import React, { Fragment } from 'react'

import type {
  AboutBlock,
  ContentBlock as ContentBlockType,
  FaqBlock,
  HomeBlock,
  InfoAndImageBlock,
  MediaBlock as MediaBlockType,
  ProductBlock,
  RegulatoryBlock,
  SubscriptionForm,
} from '@/payload-types'

import { MediaBlock } from '@/blocks/MediaBlock/Component'
import { ContentBlock } from './Content/Component'
import { HomeBlockComponent } from './HomeBlock/HomeBlockComponent'
import { SubscriptionFormBlock } from './SubsciptionForm/Component'
import { AboutBlockComponent } from './AboutBlock/Compoment'
import { ContactBlockComponent } from './ContactBlock/Component'
import { FaqBlockComponent } from './FaqBlock/Component'
import { FormBlock } from './Form/Component'
import { RegulatoryBlockComponent } from './RegulatoryBlock/Component'
import ProductBlockComponent from './ProductBlock/Component'
import { InfoAndImageBlockComponent } from './InfoAndImageBlock/Component'

const blockComponents = {
  mediaBlock: MediaBlock,
  content: ContentBlock,
  homeBlock: HomeBlockComponent,
  subscriptionForm: SubscriptionFormBlock,
  productBlock: ProductBlockComponent,
  aboutBlock: AboutBlockComponent,
  contactBlock: ContactBlockComponent,
  faqBlock: FaqBlockComponent,
  formBlock: FormBlock,
  regulatoryBlock: RegulatoryBlockComponent,
  infoAndImageBlock: InfoAndImageBlockComponent,
}

export const RenderBlocks: React.FC<{
  blocks:
    | (
        | ContentBlockType
        | MediaBlockType
        | HomeBlock
        | SubscriptionForm
        | ProductBlock
        | AboutBlock
        | FaqBlock
        | RegulatoryBlock
        | InfoAndImageBlock
      )[]
    | null
    | undefined
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
