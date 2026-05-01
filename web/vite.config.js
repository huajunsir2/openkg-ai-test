import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

// Vite config for OpenKG site.
// Source lives in web/, but we build to the repo root so that GitHub Pages
// (which is configured to serve the source branch root) directly serves the
// production bundle. This avoids a blank page caused by Pages serving the
// raw template that imports `/src/main.js` (which contains bare ES module
// specifiers that browsers cannot resolve without a build step).
export default defineConfig({
  root: fileURLToPath(new URL('.', import.meta.url)),
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    host: '0.0.0.0',
    port: 5173
  },
  build: {
    outDir: fileURLToPath(new URL('../dist', import.meta.url)),
    emptyOutDir: true
  },
  base: './'
})
