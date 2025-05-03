/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#faf5ff',
          100: '#f3e8ff',
          200: '#e9d5ff',
          300: '#d8b4fe',
          400: '#c084fc',
          500: '#a855f7',
          600: '#9333ea',
          700: '#7e22ce',
          800: '#6b21a8',
          900: '#581c87',
        },
        accent: {
          50: '#fff7e6',
          100: '#ffe5b4',
          200: '#ffd700',
          300: '#ffc107',
          400: '#ffb300',
          500: '#ffa000',
          600: '#ff8f00',
          700: '#ff6f00',
          800: '#ff5722',
          900: '#f4511e',
        },
      },
    },
  },
  plugins: [],
};