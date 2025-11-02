import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import tsconfigPaths from 'vite-tsconfig-paths'
// import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig(({ mode }) => {
  const isDev = mode === 'development'

  const plugins = [tailwindcss(), react(), tsconfigPaths()];

  // plugins.push(VitePWA({
  //   registerType: 'autoUpdate',
  //   devOptions: { enabled: false },
  //   workbox: {
  //     cleanupOutdatedCaches: true,
  //     // blokir SW fallback ke index.html untuk route API
  //     navigateFallbackDenylist: [/\/api\//],

  //     // (opsional) pastikan request API tidak dicache
  //     runtimeCaching: [
  //       { urlPattern: /\/api\//, handler: 'NetworkOnly' },
  //       { urlPattern: /^https:\/\/gujati\.my\.id\/api\//, handler: 'NetworkOnly' }
  //     ]
  //   },
  //   manifest: {
  //     name: 'Warung Gujati',
  //     short_name: 'Warung Gujati',
  //     theme_color: '#E30613', // merah Gujati
  //     background_color: '#FFD500', // kuning Gujati
  //     screenshots: [
  //       {
  //         "src": "/screenshots/pc.png",
  //         "sizes": "2560x1600",
  //         "type": "image/png"
  //       }
  //     ],
  //     icons: [
  //       {
  //         src: '/icon-192x192.png',
  //         sizes: '192x192',
  //         type: 'image/png',
  //       },
  //       {
  //         src: '/icon-512x512.png',
  //         sizes: '512x512',
  //         type: 'image/png',
  //       },
  //     ],
  //   }
  // }))

  return {
    plugins: plugins,
    server: isDev
      ? {
        proxy: {
          // Proxy semua request yang diawali dengan /api
          '/api': {
            target: 'http://localhost:3000', // arahkan ke backend Hono/Bun
            changeOrigin: true,              // ubah origin agar cocok dengan target
            // rewrite: (path) => path.replace(/^\/api/, ''),
            // contoh: /api/auth → /auth di backend
          },
        },
      }
      : {
      }
  };
})
