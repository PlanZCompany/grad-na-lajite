export const site = {
  url: `${process.env.NEXT_PUBLIC_APP_URL}/` || 'http://localhost:3000/',
  name: 'Град на Лъжите',
  logo: `${process.env.NEXT_PUBLIC_APP_URL}/public/static/preview.png` || '',
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
