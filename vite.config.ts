// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/',             // or '/'—either works if everything is served from docs/
  plugins: [react()],
  server: {
    proxy: {
      '/api/comboconvo': {
        target: 'https://script.google.com/macros/s/AKfycbwkRIM-9HS6bAtntSb-0tUHE2PGqdJTRVBSRINmKd3CEqHvPx4LF-Vd-FyNvvuuypPrKg/exec',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/comboconvo/, '')
      }
    }
  },
  build: {
    outDir: 'docs',
    emptyOutDir: true,    // ← THIS clears out `docs/` on each build
  }
})