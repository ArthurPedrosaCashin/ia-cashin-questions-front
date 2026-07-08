import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#FEF2FF',
          100: '#FBD9FF',
          200: '#F8BFFF',
          300: '#F5A6FF',
          400: '#F38CFF',
          500: '#E155F2',
          600: '#D618ED',
          700: '#BD00D4',
          800: '#A500B9',
          900: '#62006E',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
