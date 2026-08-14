import { defineConfig, Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const CRITICAL_FONTS = ['FoundersGrotesk-Regular', 'FoundersGrotesk-Semibold'];

/**
 * Reads the :root block out of src/styles/tokens.css and minifies it.
 *
 * This is for the first paint of the site — the tiny CSS baked into the HTML so the page isn’t naked while the real stylesheet loads.
 */
function readTokensRoot(): string {
  const css = readFileSync(
    fileURLToPath(new URL('./src/styles/tokens.css', import.meta.url)),
    'utf8'
  );
  const match = css.match(/:root\s*\{[^}]*\}/);
  if (!match)
    throw new Error(
      'tokens.css: no :root block found — critical CSS would ship without design tokens'
    );
  return match[0]
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/\s+/g, ' ')
    .replace(/\s*([{}:;,])\s*/g, '$1')
    .trim();
}

function criticalCssAndFonts(): Plugin {
  return {
    name: 'critical-css-and-fonts',
    enforce: 'post',
    transformIndexHtml(html, ctx) {
      if (!ctx.bundle) return html;

      const fontAssets = Object.keys(ctx.bundle).filter(
        (k) => k.endsWith('.woff2') && CRITICAL_FONTS.some((f) => k.includes(f))
      );

      const fontPreloads = fontAssets
        .map(
          (asset) =>
            `<link rel="preload" href="/${asset}" as="font" type="font/woff2" crossorigin="anonymous">`
        )
        .join('\n  ');

      const cssEntry = Object.keys(ctx.bundle).find(
        (k) => k.endsWith('.css') && k.includes('index')
      );

      let criticalCss =
        `*{margin:0;padding:0;box-sizing:border-box}` +
        readTokensRoot() +
        `body{background-color:var(--black);color:var(--white)}`;

      if (cssEntry) {
        const chunk = ctx.bundle[cssEntry];
        if (chunk && 'source' in chunk) {
          const fullCss = String(chunk.source);
          const containerMatch = fullCss.match(/\._container_[a-z0-9_]+\{[^}]+\}/);
          if (containerMatch) criticalCss += containerMatch[0];
        }
      }

      const fontFaces = fontAssets
        .map((asset) => {
          const name = asset.includes('Regular')
            ? 'FounderGrotesk_Regular'
            : asset.includes('Semibold')
              ? 'FounderGrotesk_SemiBold'
              : '';
          if (!name) return '';
          return `@font-face{font-family:'${name}';src:url('/${asset}') format('woff2');font-display:swap}`;
        })
        .filter(Boolean)
        .join('');

      criticalCss += fontFaces;
      criticalCss += `*{font-family:'FounderGrotesk_Regular',sans-serif}h1{font-family:'FounderGrotesk_SemiBold';font-size:80px}`;

      const inlineStyle = `<style>${criticalCss}</style>`;

      if (cssEntry) {
        html = html.replace(
          `<link rel="stylesheet" crossorigin href="/${cssEntry}">`,
          `${inlineStyle}\n  ${fontPreloads}\n  <link rel="stylesheet" href="/${cssEntry}" media="print" onload="this.media='all'">\n  <noscript><link rel="stylesheet" href="/${cssEntry}"></noscript>`
        );
      }

      return html;
    },
  };
}

export default defineConfig({
  base: '/',
  plugins: [react(), criticalCssAndFonts()],
  resolve: {
    // Mirrors "paths" in tsconfig.app.json.
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    proxy: {
      '/api/combo-convo-form': {
        target:
          'https://script.google.com/macros/s/AKfycbyBjqgKCilAgqqpy_HkuyrrJ0HaLka-Ch6yea-swOFSKnfRu7dPO7dTc4yLNx2gQ0ZR/exec',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/combo-convo-form/, ''),
      },
      '/api/venting-machine-form': {
        target:
          'https://script.google.com/macros/s/AKfycbz9PRZKGHPK6YMt-f8FXUY5vnsDVW8g2xyUI9NDoFyVuT-NH05UWqsLxhf-7NqvAzKfHA/exec',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/venting-machine-form/, ''),
      },
      '/api/laser-focus-form': {
        target:
          'https://script.google.com/macros/s/AKfycbyPHYnixWbW2tKp2gK0LkAupBk89LDTDwOdCDy_DltvOvtgkq115bwUgRIDlG1eknJS/exec',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/laser-focus-form/, ''),
        configure: (proxy) => {
          proxy.on('proxyRes', (proxyRes) => {
            proxyRes.headers['access-control-allow-origin'] = '*';
            proxyRes.headers['access-control-allow-methods'] = 'GET,POST,OPTIONS';
            proxyRes.headers['access-control-allow-headers'] = 'Content-Type';
          });
        },
      },
    },
  },
  build: {
    outDir: 'docs',
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-dom/client', 'react-router-dom'],
          'vendor-motion': ['framer-motion'],
          'vendor-d3': ['d3'],
        },
      },
    },
  },
});
