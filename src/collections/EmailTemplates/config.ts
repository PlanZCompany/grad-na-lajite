import type { CollectionConfig } from 'payload'

const VARIANTS = [
  { label: 'Welcome / Abonament', value: 'welcome_istina10' },
  { label: 'Reminder ISTINA10', value: 'welcome_reminder' },
  { label: 'Потвърждение на поръчка', value: 'order_confirmation' },
  { label: 'Играта тръгна към теб', value: 'order_shipped' },
  { label: 'Първа нощ в Града', value: 'post_delivery' },
  { label: 'Разпит след първата игра', value: 'review_request' },
  { label: 'Благодарим + TAINA15', value: 'ugc_thanks' },
  { label: 'UGC follow-up', value: 'ugc_followup' },
  { label: 'Градът не те е забравил', value: 'winback' },
  { label: 'Оставени карти – напомняне', value: 'abandoned_cart_1' },
  { label: 'Оставени карти – стимул', value: 'abandoned_cart_2' },
  { label: 'Истории от Града', value: 'newsletter_story' },
  { label: 'Специални дни / кампании', value: 'campaign_special' },
  { label: 'Регистрация на акаунт', value: 'account_created' },
  { label: 'Потвърждение на имейл', value: 'email_verification' },
  { label: 'Смяна на парола', value: 'password_reset' },
  { label: 'Паролата е сменена', value: 'password_changed' },
  { label: 'Отмяна на поръчка', value: 'order_cancelled' },
] as const

export const EmailTemplates: CollectionConfig = {
  slug: 'email-templates',
  labels: { singular: 'Email Template', plural: 'Email Templates' },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'slug', 'updatedAt'],
  },
  access: {
    read: () => true,
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    {
      name: 'slug',
      type: 'select',
      required: true,
      unique: true,
      options: VARIANTS as unknown as { label: string; value: string }[],
    },

    // Класификация (много полезна за код + админ филтри)
    {
      name: 'category',
      type: 'select',
      required: true,
      options: [
        { label: 'Marketing', value: 'marketing' },
        { label: 'Transactional', value: 'transactional' },
      ],
    },
    {
      name: 'delivery',
      type: 'select',
      required: true,
      options: [
        { label: 'Auto', value: 'auto' },
        { label: 'Manual', value: 'manual' },
      ],
    },

    { name: 'isActive', type: 'checkbox', defaultValue: true },
    { name: 'description', type: 'textarea' },

    // Meta
    { name: 'subject', type: 'text', required: true },
    { name: 'preheader', type: 'text' },

    // 2) HERO
    {
      name: 'hero',
      type: 'group',
      fields: [
        { name: 'image', type: 'upload', relationTo: 'media' },
        { name: 'imageAlt', type: 'text' },
        { name: 'title', type: 'text' },
        { name: 'text', type: 'textarea' },
        {
          name: 'primaryCta',
          type: 'group',
          fields: [
            { name: 'label', type: 'text' },
            { name: 'url', type: 'text' },
          ],
        },
      ],
    },

    // 3) INFO BLOCKS (1-3)
    {
      name: 'infoBlocks',
      type: 'array',
      minRows: 1,
      maxRows: 3,
      fields: [
        { name: 'icon', type: 'upload', relationTo: 'media' },
        { name: 'iconAlt', type: 'text' },
        { name: 'title', type: 'text', required: true },
        { name: 'text', type: 'textarea', required: true },
        {
          name: 'link',
          type: 'group',
          fields: [
            { name: 'label', type: 'text' }, // "Виж повече" / "FAQ"
            { name: 'url', type: 'text' },
          ],
        },
      ],
    },

    // 4) PROMO CODE (optional)
    {
      name: 'promo',
      type: 'group',
      fields: [
        { name: 'enabled', type: 'checkbox', defaultValue: false },
        { name: 'icon', type: 'upload', relationTo: 'media' },
        { name: 'iconAlt', type: 'text' },
        { name: 'codeName', type: 'text' }, // ISTINA10 / TAINA15
        { name: 'discountText', type: 'text' }, // "-10% за твоята поръчка"
        {
          name: 'instructionText',
          type: 'text',
          defaultValue: 'Въведи кода в количката преди плащане.',
        },
      ],
    },

    // VERIFY (optional)
    {
      name: 'verify',
      label: 'Verify/Reset Password Block',
      type: 'group',
      fields: [
        { name: 'title', type: 'text' },
        { name: 'text', type: 'textarea' },
        {
          name: 'button',
          type: 'group',
          fields: [
            { name: 'label', type: 'text' },
            { name: 'url', type: 'text' },
          ],
        },
        { name: 'extraText', type: 'text' },
        { name: 'extraUrl', type: 'text' },
      ],
    },

    // EXTRA IMAGE
    {
      name: 'extraImage',
      label: 'Extra Image',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Снимка която се появява преди Фоотера',
      },
    },

    // 5) SECONDARY CTA (optional)
    {
      name: 'secondaryCta',
      type: 'group',
      fields: [
        { name: 'enabled', type: 'checkbox', defaultValue: false },
        { name: 'introText', type: 'text' }, // "Искаш да видиш повече преди да решиш?"
        {
          name: 'button',
          type: 'group',
          fields: [
            { name: 'label', type: 'text' }, // "Виж как се играе"
            { name: 'url', type: 'text' },
          ],
        },
      ],
    },
  ],
}
