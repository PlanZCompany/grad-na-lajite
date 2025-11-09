import type { Block } from 'payload'
import { DescriptionFullRichTextConfig, HeadingConfig } from '../Reusable'

export const FaqBlock: Block = {
  slug: 'faqBlock',
  interfaceName: 'FaqBlock',
  fields: [
    HeadingConfig,
    {
      name: 'cardsArray',
      type: 'array',
      label: 'Базов компонент (заглавие, описание и медия)',
      fields: [
        {
          name: 'basicComponentFull',
          type: 'group',
          fields: [HeadingConfig, DescriptionFullRichTextConfig],
          label: 'Базов компонент (заглавие, описание и медия)',
        },
      ],
    },
  ],
}
