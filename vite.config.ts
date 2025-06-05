// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/combo-convo-form': {
        target:
          'https://script.google.com/macros/s/AKfycbyZUYi2C60jwxA1sb2T7lUbvXe1WQDiyg_fHFNfse4CGDSGcdFYBZBb6q7T36ERR-dN/exec',
        changeOrigin: true,
        rewrite: (path) =>
          path.replace(/^\/api\/combo-convo-form/, '')
      }
    }
  }
});