export const site = {
  url: `${process.env.NEXT_PUBLIC_SERVER_URL}/` || 'http://localhost:3000/',
  name: 'Обичайте се',
  logo: `${process.env.NEXT_PUBLIC_SERVER_URL}/public/logo.png`,
  // contact: {
  //   email: '',
  //   phone: '+359-87-775-7765',
  // },
  // categories: [
  //   { name: 'История', url: 'category/istoriya' },
  //   { name: 'Спорт', url: 'category/sport' },
  //   { name: 'Наука', url: 'category/nauka' },
  //   { name: 'Изкуство и култура', url: 'category/izkustvo-i-kultura' },
  // ],
} as const
