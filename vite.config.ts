// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/',           // or './' if you want relative paths in production
  plugins: [react()],
  server: {
    proxy: {
      '/api/combo-convo-form': {
        target: 'https://script.google.com/macros/s/AKfycbwkRIM-9HS6bAtntSb-0tUHE2PGqdJTRVBSRINmKd3CEqHvPx4LF-Vd-FyNvvuuypPrKg/exec',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/combo-convo-form/, ''),
      },
    },
  },
  build: {
    outDir: 'docs',
    emptyOutDir: true,
  },
})