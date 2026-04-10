import { AboutBlockComponent } from '@/blocks/AboutBlock/Compoment'
import { ContactBlockComponent } from '@/blocks/ContactBlock/Component'
import { ContentBlock } from '@/blocks/Content/Component'
import { CTABlockComponent } from '@/blocks/CTA/Component'
import { FaqBlockComponent } from '@/blocks/FaqBlock/Component'
import { FormBlock } from '@/blocks/Form/Component'
import { HomeBlockComponent } from '@/blocks/HomeBlock/HomeBlockComponent'
import { InfoAndImageBlockComponent } from '@/blocks/InfoAndImageBlock/Component'
import { MediaBlock } from '@/blocks/MediaBlock/Component'
import { NestedBlocksComponent } from '@/blocks/NestedBlocks/Component'
import { PDFBlockComponent } from '@/blocks/PDFBlock/Component'
import ProductBlockComponent from '@/blocks/ProductBlock/Component'
import { RegulatoryBlockComponent } from '@/blocks/RegulatoryBlock/Component'
import { SubscriptionFormBlock } from '@/blocks/SubsciptionForm/Component'
import { TableBLockComponent } from '@/blocks/TableBlock/Component'

export const blockComponents = {
  mediaBlock: MediaBlock,
  content: ContentBlock,
  cta: CTABlockComponent,
  homeBlock: HomeBlockComponent,
  subscriptionForm: SubscriptionFormBlock,
  productBlock: ProductBlockComponent,
  aboutBlock: AboutBlockComponent,
  contactBlock: ContactBlockComponent,
  faqBlock: FaqBlockComponent,
  formBlock: FormBlock,
  regulatoryBlock: RegulatoryBlockComponent,
  infoAndImageBlock: InfoAndImageBlockComponent,
  tableBlock: TableBLockComponent,
  pdfBlock: PDFBlockComponent,
  nestedBlocks: NestedBlocksComponent,
}
