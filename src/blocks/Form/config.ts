import type { Block } from 'payload'

export const FormBlock: Block = {
  slug: 'formBlock',
  interfaceName: 'FormBlock',
  fields: [
    {
      name: 'typeOfForm',
      type: 'select',
      options: [
        {
          label: 'Контактна Форма',
          value: 'contactForm',
        },
      ],
      defaultValue: 'contactForm',
      required: true,
      label: 'Тип на формата',
    },
    {
      name: 'form',
      type: 'relationship',
      maxDepth: 2,
      relationTo: 'forms',
      required: true,
    },
    {
      name: 'enableIntro',
      type: 'checkbox',
      label: 'Позволи въвеждащо изречение',
    },
  ],
  graphQL: {
    singularName: 'FormBlock',
  },
  labels: {
    plural: 'Форма за попълване',
    singular: 'Форма за попълване',
  },
}
