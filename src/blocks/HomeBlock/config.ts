import type { Block } from 'payload'
import {
  BasicComponentsArray,
  DescriptionConfig,
  DescriptionFullRichTextConfig,
  HeadingConfig,
  MediaConfig,
} from '../Reusable'

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
    {
      name: 'historySection',
      label: 'История',
      type: 'group',
      fields: [HeadingConfig, DescriptionConfig, MediaConfig],
    },
    {
      name: 'whatIsTheGame',
      label: 'Какво е играта',
      type: 'group',
      fields: [HeadingConfig, BasicComponentsArray],
    },
    {
      name: 'gameRules',
      label: 'Правила',
      type: 'group',
      fields: [HeadingConfig, DescriptionFullRichTextConfig, BasicComponentsArray, MediaConfig],
    },
    {
      name: 'gameRules2',
      label: 'Правила Втора секция',
      type: 'group',
      fields: [HeadingConfig, DescriptionFullRichTextConfig, BasicComponentsArray],
    },
    {
      name: 'singlePreview',
      label: 'Продукт - Preview',
      type: 'group',
      fields: [
        HeadingConfig,
        DescriptionConfig,
        MediaConfig,
        {
          name: 'price',
          label: 'Цена',
          type: 'text',
        },
      ],
    },
    {
      name: 'galleryPreview',
      label: 'Галерия - Preview',
      type: 'group',
      fields: [
        HeadingConfig,
        {
          name: 'mediaArray',
          type: 'array',
          label: 'Медии',
          fields: [MediaConfig],
        },
      ],
    },
    {
      name: 'histories',
      label: 'Истории',
      type: 'group',
      fields: [HeadingConfig, BasicComponentsArray],
    },
    {
      name: 'testimonials',
      label: 'Мнения на потребители',
      type: 'group',
      fields: [HeadingConfig, BasicComponentsArray],
    },
  ],
}
