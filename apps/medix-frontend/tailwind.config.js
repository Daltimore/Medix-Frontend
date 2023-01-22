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
      colors: {
        'gray-one': '#333333',
        'gray-two': '#4F4F4F',
      },
    },
  },
  plugins: [import('@tailwindcss/forms')],
}
