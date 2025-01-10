/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        '3xl': '0 1 12 0 rgba(124, 124, 124, 0.3)',
      },
      fontFamily: {
        'Manrope': ['Manrope', 'sans-serif']
      }
    },
    container: {
      center: true,

      screens: {
        xl: '1440px',
      }
    },
    extend: {},
  },
  plugins: [],
}