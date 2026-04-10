import type { Block } from 'payload'

import { AboutBlock } from '@/blocks/AboutBlock/config'
import { ContactBlock } from '@/blocks/ContactBlock/config'
import { Content } from '@/blocks/Content/config'
import { CTABlock } from '@/blocks/CTA/config'
import { FaqBlock } from '@/blocks/FaqBlock/config'
import { FormBlock } from '@/blocks/Form/config'
import { HomeBlock } from '@/blocks/HomeBlock/config'
import { InfoAndImageBlock } from '@/blocks/InfoAndImageBlock/config'
import { MediaBlock } from '@/blocks/MediaBlock/config'
import { PDFBlock } from '@/blocks/PDFBlock/config'
import { ProductBlock } from '@/blocks/ProductBlock/config'
import { RegulatoryBlock } from '@/blocks/RegulatoryBlock/config'
import { SubscriptionForm } from '@/blocks/SubsciptionForm/config'
import { TableBlock } from '@/blocks/TableBlock/config'

export const availableLayoutBlocks: Block[] = [
  MediaBlock,
  Content,
  CTABlock,
  HomeBlock,
  SubscriptionForm,
  ProductBlock,
  AboutBlock,
  ContactBlock,
  FaqBlock,
  FormBlock,
  RegulatoryBlock,
  PDFBlock,
  InfoAndImageBlock,
  TableBlock,
]
