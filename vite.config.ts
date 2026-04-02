import { defineConfig, Plugin } from 'vite';
import react from '@vitejs/plugin-react';

const CRITICAL_FONTS = ['FoundersGrotesk-Regular', 'FoundersGrotesk-Semibold'];

function preloadFonts(): Plugin {
  return {
    name: 'preload-fonts',
    enforce: 'post',
    transformIndexHtml(_html, ctx) {
      if (!ctx.bundle) return [];

      const fontAssets = Object.keys(ctx.bundle).filter(
        (k) => k.endsWith('.woff2') && CRITICAL_FONTS.some((f) => k.includes(f))
      );

      return fontAssets.map((asset) => ({
        tag: 'link',
        attrs: {
          rel: 'preload',
          href: `/${asset}`,
          as: 'font',
          type: 'font/woff2',
          crossorigin: 'anonymous',
        },
        injectTo: 'head' as const,
      }));
    },
  };
}

export default defineConfig({
  base: '/',
  plugins: [react(), preloadFonts()],
  server: {
    proxy: {
      '/api/combo-convo-form': {
        target:
          'https://script.google.com/macros/s/AKfycbyBjqgKCilAgqqpy_HkuyrrJ0HaLka-Ch6yea-swOFSKnfRu7dPO7dTc4yLNx2gQ0ZR/exec',
        changeOrigin: true,
        rewrite: (path) =>
          path.replace(/^\/api\/combo-convo-form/, '')
      },
      '/api/venting-machine-form': {
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
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-motion': ['framer-motion'],
          'vendor-d3': ['d3'],
        },
      },
    },
  }
});