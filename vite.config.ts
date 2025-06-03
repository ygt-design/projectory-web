// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/',
  plugins: [react()],
  server: {
    proxy: {
      // 🔑 The key MUST be '/api/combo-convo-form' so that fetch('/api/combo-convo-form')
      //   in the browser forwards to the Apps Script URL.
      '/api/combo-convo-form': {
        target:
          'https://script.google.com/macros/s/AKfycbyv6a7cBS4N2iLAYPWlK0TVOtQhRacJ2vE4FdIvErmDHz0o-NtrwIxzSwWeC143ujlFnA/exec',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/combo-convo-form/, '')
      }
    }
  },
  build: {
    outDir: 'docs',
    emptyOutDir: true
  }
});