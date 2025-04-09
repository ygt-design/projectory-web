import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/projectory/', // Ensures asset paths are built correctly
  plugins: [react()],
})
