/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    screens: {
      '360x': '359px',
      xxs: '361px',
      xs: '375px',
      '390x': '389px',
      '425x': '425px',
      landscape500: { raw: '(max-height: 500px) and (orientation: landscape)' },
      sm: '539px',
      md: '767px',
      '768x': {
        raw: '(max-height: 1440px) and (min-width: 768px) and (orientation: portrait)',
      },
      'big-tablet': {
        raw: '(min-width: 1023px) and (orientation: portrait)',
      },
      lg: '1023px',
      xl: '1279px',
      midxl: '1440px',
      '2xl': '1534px',
      '3xl': '1718px',
      SHD: {
        raw: '(max-height: 700px) and (min-width: 1280px) and (orientation: landscape)',
      },
      SHD2: {
        raw: '(max-height: 659px) and (min-width: 1280px) and (orientation: landscape)',
      },
      SHD3: {
        raw: '(max-height: 750px) and (min-width: 1280px) and (orientation: landscape)',
      },
      SHD4: {
        raw: '(max-height: 700px) and (min-width: 1180px) and (orientation: landscape)',
      },
      xxl: '1900px',
    },
    extend: {
      colors: {
        whiteAccent: '#D1D5DB',
        brown: '#574143',
        pink: '#D19EA2',
        mixPink: '#A9636A',
        bordo: '#6D0710',
        pinkShade: "#e6cbcd"
      },
      fontFamily: {
        sansation: ['var(--font-sansation)', 'ui-sans-serif', 'system-ui', 'Arial'],
        kolka: ['var(--font-kolka)', 'ui-sans-serif', 'system-ui', 'Arial'],
        'great-vibes': ['var(--font-great-vibes)', 'ui-sans-serif', 'system-ui', 'Arial'],
      },
    },
  },
  plugins: [],
}
export default config
//TODO CHANGE COLORS AND FONTS
