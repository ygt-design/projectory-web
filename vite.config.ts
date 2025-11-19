import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/',
  plugins: [react()],
  server: {
    proxy: {
      '/api/combo-convo-form': {
        target:
          'https://script.google.com/macros/s/AKfycbw3jszT16xnqHvT1OwYswb1hhzDcyzsc53vkCq-JdwCEmQG5VKY5W65c-mkm65LVIFG1A/exec',
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
        target: 'https://script.google.com/macros/s/AKfycbx008M516hGzbzP_8uczo-jgt0JSIclh5Dr_2bmz2Vor_Z7ONPA5Wc6v3dq18Ny7bGD/exec',
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