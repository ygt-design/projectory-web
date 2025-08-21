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
      '/api/laser-focus-form': {
        target: 'https://www.projectory.live',
        changeOrigin: true,
        rewrite: (path) => path 
      },
      '/api/venting-machine-form': {
        target: 'https://www.projectory.live',
        changeOrigin: true,
        rewrite: (path) => path
      },
    }
  },
  build: {
    outDir: 'docs',
    assetsDir: 'assets'
  }
});