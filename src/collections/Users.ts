import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  auth: {
    verify: {
      generateEmailSubject: (_args?: { token?: string; user?: { email?: string } }) =>
        `Верификация на Имейл`,
      generateEmailHTML: ({ token, user }: { token?: string; user?: { email?: string } }) => {
        const t = encodeURIComponent(token ?? '')
        const url = `${process.env.NEXT_PUBLIC_APP_URL}auth/verify?token=${t}`
        const email = user?.email ?? ''
        return `<!doctype html><html><body style="font-family:system-ui,Segoe UI,Roboto">
      <h1>Добре дошли ${email ? `, ${email}` : ''}!</h1>
      <p>Потвърдете своя Имейл адрес, за да активирате аккаунта си.</p>
      <button><a href="${url}" style="cursor:pointer; display:inline-block;padding:10px 16px;text-decoration:none;border:1px solid #ddd;border-radius:8px">Потвърди</a>
      </button>
      <p>Или копирай линка в браузъра:<br>${url}</p>
    </body></html>`
      },
    },
    forgotPassword: {
      generateEmailSubject: () => `Обновяване на паролата`,
      generateEmailHTML: (args) => {
        const t = encodeURIComponent(args?.token ?? '')
        const url = `${process.env.NEXT_PUBLIC_APP_URL}auth/reset-password?token=${t}`
        const email = args?.user?.email ?? ''
        return `<!doctype html><html><body style="font-family:system-ui,Segoe UI,Roboto">
        <h1>Обновяване на паролата</h1>
        <p>Получихме заявка за обновяване на паролата ${email}.</p>
        <p><a href="${url}" style="display:inline-block;padding:10px 16px;text-decoration:none;border:1px solid #ddd;border-radius:8px">Обнови</a></p>
        <p>Ако не е предназчено за вас, моля игнорирайте.</p>
        <p>Link: ${url}</p>
      </body></html>`
      },
    },
  },
  access: {
    admin: ({ req }) => req.user?.role === 'admin',

    read: ({ req, id }) => {
      if (!req.user) return false
      if (req.user.role === 'admin') return true
      return id ? id === req.user.id : { id: { equals: req.user.id } }
    },
    update: ({ req, id }) => {
      if (!req.user) return false
      if (req.user.role === 'admin') return true
      return id ? id === req.user.id : { id: { equals: req.user.id } }
    },
    delete: ({ req }) => req.user?.role === 'admin',
    create: () => true,
  },
  fields: [
    // Email added by default
    // Add more fields as needed
    {
      name: 'role',
      type: 'select',
      defaultValue: 'admin',
      access: {
        read: ({ req }) => !!req.user, // logged-in users can see roles
        create: ({ req }) => req.user?.role === 'admin',
        update: ({ req }) => req.user?.role === 'admin',
      },
      options: [
        {
          label: 'Admin',
          value: 'admin',
        },
        {
          label: 'User',
          value: 'user',
        },
      ],
    },
    {
      name: 'firstName',
      type: 'text',
      access: {
        read: () => true,
        update: () => false,
        create: () => false,
      },
      admin: {
        readOnly: true,
        condition: (data) => data.role === 'user',
      },
    },
    {
      name: 'lastName',
      type: 'text',
      access: {
        read: () => true,
        update: () => false,
        create: () => false,
      },
      admin: {
        readOnly: true,
        condition: (data) => data.role === 'user',
      },
    },
    {
      name: 'phoneNumber',
      type: 'text',
      access: {
        read: () => true,
        update: () => false,
        create: () => false,
      },
      admin: {
        readOnly: true,
        condition: (data) => data.role === 'user',
      },
    },
    {
      name: 'subscribed',
      label: 'Subscribed',
      type: 'checkbox',
      admin: {
        readOnly: true,
        condition: (data) => data.role === 'user',
      },
    },
    {
      name: 'tags',
      label: 'Tags',
      type: 'array',
      fields: [
        {
          name: 'tag',
          label: 'Tag',
          type: 'text',
        },
      ],
    },
    {
      name: 'marketing_consent',
      label: 'Marketing consent',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'marketing_consent_source',
      label: 'Marketing consent source',
      type: 'select',
      options: [
        { label: 'Popup', value: 'popup' },
        { label: 'Checkout', value: 'checkout' },
        { label: 'Other', value: 'other' },
      ],
      admin: { placeholder: 'Select source' },
    },
    {
      name: 'marketing_consent_date',
      label: 'Marketing consent date',
      type: 'date',
      admin: {
        date: { pickerAppearance: 'dayAndTime' },
      },
    },
    {
      name: 'newsletter_status',
      label: 'Newsletter status',
      type: 'select',
      required: true,
      defaultValue: 'subscribed',
      options: [
        { label: 'Subscribed', value: 'subscribed' },
        { label: 'Unsubscribed', value: 'unsubscribed' },
      ],
    },
    {
      name: 'newsletter_unsubscribed_at',
      label: 'Newsletter unsubscribed at',
      type: 'date',
      admin: { date: { pickerAppearance: 'dayAndTime' } },
    },
    {
      name: 'last_marketing_email_sent_at',
      label: 'Last marketing email sent at',
      type: 'date',
      admin: { date: { pickerAppearance: 'dayAndTime' } },
    },
    {
      name: 'last_newsletter_sent_at',
      label: 'Last newsletter sent at',
      type: 'date',
      admin: { date: { pickerAppearance: 'dayAndTime' } },
    },
    {
      name: 'last_campaign_key',
      label: 'Last campaign key',
      type: 'text',
    },
    {
      name: 'last_login_at',
      label: 'Last login at',
      type: 'date',
      admin: { date: { pickerAppearance: 'dayAndTime' } },
    },
    {
      name: 'gdpr_deleted_at',
      label: 'GDPR deleted at',
      type: 'date',
      admin: { date: { pickerAppearance: 'dayAndTime' } },
    },
    {
      name: 'discountCode',
      label: 'Код за отстъпка',
      type: 'text',
      admin: {
        readOnly: true,
        condition: (data) => data.role === 'user',
      },
    },
    {
      name: 'shoppingCartProducts',
      type: 'relationship',
      relationTo: 'product',
      hasMany: true,
      access: {
        read: () => true,
        update: () => false,
        create: () => false,
      },
      admin: {
        readOnly: true,
        condition: (data) => data.role === 'user',
      },
    },
  ],
}
