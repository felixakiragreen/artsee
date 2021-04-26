import { defineConfig } from 'vite'
import svelte from '@sveltejs/vite-plugin-svelte'
import { chromeExtension } from 'vite-plugin-chrome-extension'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte(), chromeExtension()],
  resolve: {
    alias: [{ find: '@', replacement: '/src' }],
  },
  build: {
    rollupOptions: {
      input: {
        manifest: 'src/manifest.json',
        // newtab: 'src/newtab/index.html',
      },
      output: {
        name: 'ArtSee',
      },
    },
  },
  optimizeDeps: {
    include: ['svelte-hero-icons'],
  },
})
