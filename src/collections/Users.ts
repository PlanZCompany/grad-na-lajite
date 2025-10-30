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
      <h1>Добре дошли, ${email ? `, ${email}` : ''}!</h1>
      <p>Потвърдете своя Имейл адрес, за да активирате аккаунта си.</p>
      <p><a href="${url}" style="display:inline-block;padding:10px 16px;text-decoration:none;border:1px solid #ddd;border-radius:8px">Потвърди</a></p>
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
      name: 'dateOfBirth',
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
  ],
}
