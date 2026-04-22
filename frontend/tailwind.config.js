/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#000000',
        secondary: '#FFFFFF',
        accent: '#9333EA',
      },
      fontFamily: {
        sans: ['system-ui', 'sans-serif'],
      },
      fontSize: {
        'xs': '0.8125rem',
        'sm': '0.875rem',
        'base': '1rem',
        'lg': '1.0905rem',
        'xl': '1.1853rem',
        'xl2': '1.2929rem',
        'xl3': '1.4143rem',
        'xl4': '1.618rem',
        'xl5': '1.854rem',
        'xl6': '2.058rem',
      },
    },
  },
  plugins: [],
}
