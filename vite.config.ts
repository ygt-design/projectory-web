import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/',            // root‐relative asset URLs
  plugins: [react()],
  build: {
    outDir: 'dist',
    emptyOutDir: true
  }
})