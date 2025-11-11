import type { Block } from 'payload'
import { DescriptionFullRichTextConfig, HeadingConfig, MediaConfig } from '../Reusable'

export const InfoAndImageBlock: Block = {
  slug: 'infoAndImageBlock',
  interfaceName: 'InfoAndImageBlock',
  fields: [
    HeadingConfig,
    DescriptionFullRichTextConfig,
    MediaConfig,
    {
      name: 'reverse',
      type: 'checkbox',
      defaultValue: false,
      label: 'Разменяне на местата на снимата и текста',
    },
  ],
}
