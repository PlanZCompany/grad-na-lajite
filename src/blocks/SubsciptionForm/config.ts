import type { Block } from 'payload'
import { DescriptionConfig, HeadingConfig, MediaConfig } from '../Reusable'

export const SubscriptionForm: Block = {
  slug: 'subscriptionForm',
  interfaceName: 'SubscriptionForm',
  fields: [HeadingConfig, DescriptionConfig, MediaConfig],
}
