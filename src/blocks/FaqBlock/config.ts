import type { Block } from 'payload'
import { BasicComponentsArray, HeadingConfig } from '../Reusable'

export const FaqBlock: Block = {
  slug: 'faqBlock',
  interfaceName: 'FaqBlock',
  fields: [HeadingConfig, BasicComponentsArray],
}
