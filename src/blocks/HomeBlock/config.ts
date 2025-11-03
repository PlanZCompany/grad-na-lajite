import type { Block } from 'payload'
import { BasicComponentsArray, DescriptionConfig, HeadingConfig } from '../Reusable'

export const HomeBlock: Block = {
  slug: 'homeBlock',
  interfaceName: 'HomeBlock',
  fields: [
    {
      name: 'whyToChoseUs',
      label: 'Защо да изберете нас',
      type: 'group',
      fields: [HeadingConfig, DescriptionConfig, BasicComponentsArray],
    },
  ],
}
