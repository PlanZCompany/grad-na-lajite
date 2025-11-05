import type { GlobalConfig } from 'payload'

import { DescriptionConfig, HeadingConfig, MediaConfig } from '@/blocks/Reusable'
import { revalidateSubscriptionModal } from './hooks/revalidateSubscriptionModal'

export const SubscriptionModal: GlobalConfig = {
  slug: 'subscriptionModal',
  access: {
    read: () => true,
  },
  fields: [HeadingConfig, DescriptionConfig, MediaConfig],
  hooks: {
    afterChange: [revalidateSubscriptionModal],
  },
}
