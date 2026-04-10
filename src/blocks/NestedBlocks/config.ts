import type { Block } from 'payload'

import { availableLayoutBlocks } from '@/blocks/sharedBlocks'

export const NestedBlocks: Block = {
  slug: 'nestedBlocks',
  interfaceName: 'NestedBlocks',
  labels: {
    singular: 'Секция с вложени блокове',
    plural: 'Секции с вложени блокове',
  },
  fields: [
    {
      name: 'items',
      type: 'blocks',
      label: 'Блокове в секцията',
      blocks: availableLayoutBlocks,
      defaultValue: [],
      admin: {
        initCollapsed: false,
      },
    },
  ],
}
