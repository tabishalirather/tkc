import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        saffron: {
          DEFAULT: '#E8A838',
          50: '#FDF8F0',
          100: '#FCF2D9',
          200: '#F8E4A6',
          300: '#F4D673',
          400: '#F0C840',
          500: '#E8A838',
          600: '#C18B2A',
          700: '#9A6E1C',
          800: '#73510E',
          900: '#4C3500',
        },
        amber: {
          DEFAULT: '#C17B2A',
        },
        forest: {
          DEFAULT: '#2D5016',
          50: '#F0F5EC',
          100: '#E1EBD9',
          200: '#C3D7B3',
          300: '#A5C38D',
          400: '#87AF67',
          500: '#699B41',
          600: '#557C34',
          700: '#415D27',
          800: '#2D3E1A',
          900: '#191F0D',
        },
        cream: {
          DEFAULT: '#FDF8F0',
        },
        walnut: {
          DEFAULT: '#5C3A1E',
          50: '#F5F0EB',
          100: '#EBE1D7',
          200: '#D7C3AF',
          300: '#C3A587',
          400: '#AF875F',
          500: '#9B6937',
          600: '#7C542C',
          700: '#5C3F21',
          800: '#3D2A16',
          900: '#1E150B',
        }
      },
      fontFamily: {
        serif: ['Cormorant Garamond', 'serif'],
        sans: ['Manrope', 'sans-serif'],
      },
      container: {
        center: true,
        padding: '2rem',
        screens: {
          '2xl': '1400px',
        },
      },
    },
  },
  plugins: [],
}

export default config
