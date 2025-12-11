import type { Block } from 'payload'

export const PDFBlock: Block = {
  slug: 'pdfBlock',
  interfaceName: 'PDFBlock',
  fields: [
    {
      name: 'pdfFile',
      label: 'PDF file',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'button',
      label: 'Текст на бутон',
      type: 'text',
      required: true,
      defaultValue: 'ИЗТЕГЛИ ПЪЛНИТЕ ПРАВИЛА',
    },
    {
      name: 'showPDF',
      label: 'Показване на PDF',
      type: 'checkbox',
      defaultValue: false,
    },
  ],
}
