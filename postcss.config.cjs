const tailwindcss = require('tailwindcss')
const autoprefixer = require('autoprefixer')
const cssnano = require('cssnano')
const postcssNested = require('postcss-nested')

const mode = process.env.NODE_ENV
const dev = mode === 'development'

module.exports = {
  plugins: [
    postcssNested,
    // Some plugins, like postcss-nested, need to run before Tailwind

    tailwindcss,

    // But others, like autoprefixer, need to run after

    autoprefixer,

    !dev &&
      cssnano({
        preset: 'default',
      }),
  ],
}
