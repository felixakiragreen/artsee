const { tailwindConfig } = require('@f*g/felix')

module.exports = {
  mode: 'jit',
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        ...tailwindConfig,
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
