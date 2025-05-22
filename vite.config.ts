// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: './',             // or '/'—either works if everything is served from docs/
  plugins: [react()],
  build: {
    outDir: 'docs',
    emptyOutDir: true,    // ← THIS clears out `docs/` on each build
  }
})