import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/',             // root-relative asset paths
  plugins: [react()],
  build: {
    outDir: 'docs',
    emptyOutDir: true    // clear docs/ each build
  }
})