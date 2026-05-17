/** Traditional Vedic palette — saffron / maroon / gold on cream */
import typography from '@tailwindcss/typography';

export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        saffron: {
          50: '#fff8ed',
          100: '#ffefd4',
          200: '#ffdba8',
          300: '#ffc070',
          400: '#ff9a36',
          500: '#ff7a0f',
          600: '#f05d05',
          700: '#c74407',
          800: '#9d370f',
          900: '#7f2f10'
        },
        maroon: {
          50: '#fdf3f3',
          100: '#fbe5e5',
          200: '#f7cfd0',
          300: '#f0adae',
          400: '#e57d80',
          500: '#d65257',
          600: '#c23740',
          700: '#a32933',
          800: '#882530',
          900: '#74232e',
          950: '#400e13'
        },
        gold: {
          50: '#fdfbe9',
          100: '#fbf6c4',
          200: '#f8ec8b',
          300: '#f4db48',
          400: '#eec418',
          500: '#dead0b',
          600: '#c08807',
          700: '#996209',
          800: '#7f4d0f',
          900: '#6c4012'
        },
        cream: {
          50: '#fefcf8',
          100: '#fdf7e7',
          200: '#fbecc6',
          300: '#f7dc99',
          400: '#f2c569',
          500: '#edae3f'
        },
        ink: {
          900: '#1a0f0a',
          800: '#2a1a10',
          700: '#3d2a1d',
          600: '#5a4030',
          500: '#7a5a45'
        }
      },
      fontFamily: {
        display: ['"Noto Serif Devanagari"', '"Tiro Devanagari Hindi"', 'Georgia', 'serif'],
        body: ['"Noto Sans Devanagari"', '"Inter"', 'system-ui', 'sans-serif'],
        en: ['"Inter"', 'system-ui', 'sans-serif']
      },
      fontSize: {
        '2xs': ['0.625rem', { lineHeight: '0.875rem' }]
      },
      boxShadow: {
        cta: '0 8px 24px -8px rgba(192, 55, 64, 0.45)',
        soft: '0 4px 18px -6px rgba(127, 47, 16, 0.18)'
      },
      backgroundImage: {
        'vedic-grain': "url('/textures/grain.png')",
        'mandala-soft': "url('/textures/mandala-soft.svg')"
      }
    }
  },
  plugins: [typography]
};
