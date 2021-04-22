import { defineConfig } from 'vite'
import { chromeExtension } from 'vite-plugin-chrome-extension'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [chromeExtension()],
  resolve: {
    alias: [{ find: '@', replacement: '/src' }],
  },
  build: {
    rollupOptions: {
      input: 'src/manifest.json',
    },
  },
})
