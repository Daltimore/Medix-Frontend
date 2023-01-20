/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  mode: 'jit',
  theme: {
    extend: {
      fontFamily: {
        segoe: ['Segoe UI', 'sans-serif'],
      },
      screens: {
        '3xl': '1900px',
      },
    },
  },
  plugins: [import('@tailwindcss/forms')],
}
