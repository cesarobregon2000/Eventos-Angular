/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'verde-azulado': {
          DEFAULT: '#14564E',
          claro: '#2B988B',
          oscuro: '#0A4159'
        }
      }
    },
  },
  plugins: [],
}
