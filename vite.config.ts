import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  // Use relative asset paths so built files can live under any base URL
  base: './',
  plugins: [react()],
  build: {
    outDir: 'docs',      // your chosen output folder
    emptyOutDir: true    // clear it on each build
  }
})