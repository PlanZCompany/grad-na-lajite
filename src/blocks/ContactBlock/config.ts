import type { Block } from 'payload'
import { DescriptionConfig, HeadingConfig } from '../Reusable'

export const ContactBlock: Block = {
  slug: 'contactBlock',
  interfaceName: 'ContactBlock',
  fields: [
    {
      name: 'hero',
      type: 'group',
      label: 'Oсновна секция',
      fields: [HeadingConfig, DescriptionConfig],
    },
    {
      name: 'contactForm',
      type: 'checkbox',
      label: 'Контакт форма',
      defaultValue: true,
    },
  ],
}
