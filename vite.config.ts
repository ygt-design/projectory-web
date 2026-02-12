import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/',
  plugins: [react()],
  server: {
    proxy: {
      // Same URL as api/combo-convo-form.cjs so dev and prod hit the same Google sheet
      '/api/combo-convo-form': {
        target:
          'https://script.google.com/macros/s/AKfycbyBjqgKCilAgqqpy_HkuyrrJ0HaLka-Ch6yea-swOFSKnfRu7dPO7dTc4yLNx2gQ0ZR/exec',
        changeOrigin: true,
        rewrite: (path) =>
          path.replace(/^\/api\/combo-convo-form/, '')
      },
      '/api/venting-machine-form': {
        // TODO: replace with your Venting Machine Web App /exec URL
        target:
          'https://script.google.com/macros/s/AKfycbz9PRZKGHPK6YMt-f8FXUY5vnsDVW8g2xyUI9NDoFyVuT-NH05UWqsLxhf-7NqvAzKfHA/exec',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/venting-machine-form/, '')
      },
      '/api/laser-focus-form': {
        target: 'https://script.google.com/macros/s/AKfycbyPHYnixWbW2tKp2gK0LkAupBk89LDTDwOdCDy_DltvOvtgkq115bwUgRIDlG1eknJS/exec',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/laser-focus-form/, ''),
        configure: (proxy) => {
          proxy.on('proxyRes', (proxyRes) => {
            proxyRes.headers['access-control-allow-origin'] = '*';
            proxyRes.headers['access-control-allow-methods'] = 'GET,POST,OPTIONS';
            proxyRes.headers['access-control-allow-headers'] = 'Content-Type';
          });
        }
      },
    }
  },
  build: {
    outDir: 'docs',
    assetsDir: 'assets'
  }
});