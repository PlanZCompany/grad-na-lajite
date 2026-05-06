import type { Block } from 'payload'

import { AboutBlock } from '@/blocks/AboutBlock/config'
import { AboutHeroBlock } from '@/blocks/AboutHeroBlock/config'
import { ContactBlock } from '@/blocks/ContactBlock/config'
import { Content } from '@/blocks/Content/config'
import { CTABlock } from '@/blocks/CTA/config'
import { FaqBlock } from '@/blocks/FaqBlock/config'
import { FormBlock } from '@/blocks/Form/config'
import { HomeBlock } from '@/blocks/HomeBlock/config'
import { HomeGalleryPreviewBlock } from '@/blocks/HomeGalleryPreviewBlock/config'
import { HomeGameRules2Block } from '@/blocks/HomeGameRules2Block/config'
import { HomeHistoriesBlock } from '@/blocks/HomeHistoriesBlock/config'
import { HomePartnersBlock } from '@/blocks/HomePartnersBlock/config'
import { HomeShBlock } from '@/blocks/HomeShBlock/config'
import { HomeSinglePreviewBlock } from '@/blocks/HomeSinglePreviewBlock/config'
import { HomeTestimonialsBlock } from '@/blocks/HomeTestimonialsBlock/config'
import { HomeWhatIsTheGameBlock } from '@/blocks/HomeWhatIsTheGameBlock/config'
import { HomeWhyToChoseUsBlock } from '@/blocks/HomeWhyToChoseUsBlock/config'
import { HowToPlayBlock } from '@/blocks/HowToPlayBlock/config'
import { InfoAndImageBlock } from '@/blocks/InfoAndImageBlock/config'
import { MediaBlock } from '@/blocks/MediaBlock/config'
import { MissionBlock } from '@/blocks/MissionBlock/config'
import { PDFBlock } from '@/blocks/PDFBlock/config'
import { ProductBlock } from '@/blocks/ProductBlock/config'
import { ProductBoxBlock } from '@/blocks/ProductBoxBlock/config'
import { ProductFaqBlock } from '@/blocks/ProductFaqBlock/config'
import { ProductHeroBlock } from '@/blocks/ProductHeroBlock/config'
import { ProductReviewsBlock } from '@/blocks/ProductReviewsBlock/config'
import { RegulatoryBlock } from '@/blocks/RegulatoryBlock/config'
import { SimpleDividerBlock } from '@/blocks/SimpleDividerBlock/config'
import { SubscriptionForm } from '@/blocks/SubsciptionForm/config'
import { TableBlock } from '@/blocks/TableBlock/config'
import { ValuesBlock } from '@/blocks/ValuesBlock/config'

export const availableLayoutBlocks: Block[] = [
  MediaBlock,
  Content,
  CTABlock,
  HomeBlock,
  HomeShBlock,
  HomeWhyToChoseUsBlock,
  HomeWhatIsTheGameBlock,
  HomeGameRules2Block,
  HomeSinglePreviewBlock,
  HomeGalleryPreviewBlock,
  HomeHistoriesBlock,
  HomePartnersBlock,
  HomeTestimonialsBlock,
  SubscriptionForm,
  ProductBlock,
  ProductHeroBlock,
  ProductBoxBlock,
  ProductFaqBlock,
  ProductReviewsBlock,
  AboutBlock,
  AboutHeroBlock,
  ContactBlock,
  FaqBlock,
  FormBlock,
  HowToPlayBlock,
  MissionBlock,
  SimpleDividerBlock,
  RegulatoryBlock,
  PDFBlock,
  InfoAndImageBlock,
  TableBlock,
  ValuesBlock,
]
