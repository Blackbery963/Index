// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';
// import { visualizer } from 'rollup-plugin-visualizer';
// import { VitePwa } from "vite-plugin-pwa"

// export default defineConfig({
//   plugins: [
//     react(),
//     VitePwa({
//       registerType: 'autoUpdate',
//       includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
//       manifest: {
//         name: 'Your React App',
//         short_name: 'ReactApp',
//         description: 'My Awesome React App',
//         theme_color: '#ffffff',
//         icons: [
//           {
//             src: 'pwa-192x192.png',
//             sizes: '192x192',
//             type: 'image/png'
//           },
//           {
//             src: 'pwa-512x512.png',
//             sizes: '512x512',
//             type: 'image/png'
//           },
//           {
//             src: 'pwa-512x512.png',
//             sizes: '512x512',
//             type: 'image/png',
//             purpose: 'any maskable'
//           }
//         ],
//       },
//     }),
//     {
//       name: 'custom-headers',
//       configureServer(server) {
//         server.middlewares.use((req, res, next) => {
//           res.setHeader('Content-Type', 'application/javascript');
//           next();
//         });
//       },
//     },
//     visualizer({
//       open: true, // Automatically open the report in your browser
//       filename: 'bundle-analysis.html',
//       template: 'treemap', // You can try 'sunburst', 'network'
//     }),
//   ],
//    base: '/', // Use relative paths for assets
//   server: {
//     proxy: {
//       '/api': 'http://localhost:3000',
//     },
//   },
//   build: {
//     outDir: 'dist',
//     assetsDir: 'assets',
//   },
//   optimizeDeps: {
//     include: ['swiper'],
//   },
// });


import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      workbox: {
      maximumFileSizeToCacheInBytes: 5 * 1024 * 1024, // 5 MB
      },
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
      manifest: {
        name: 'Your React App',
        short_name: 'ReactApp',
        description: 'My Awesome React App',
        theme_color: '#ffffff',
        icons: [
          {
            src: '/logo_pd_192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/logo_pd_512x512.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: '/logo_pd_512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ],
      },
    }),
    {
      name: 'custom-headers',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          res.setHeader('Content-Type', 'application/javascript');
          next();
        });
      },
    },
    visualizer({
      open: true, // Automatically open the report in your browser
      filename: 'bundle-analysis.html',
      template: 'treemap', // 'sunburst', 'network' are also available
    }),
  ],
  base: '/', // Use relative paths for assets
  server: {
    proxy: {
      '/api': 'http://localhost:3000',
    },
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
  optimizeDeps: {
    include: ['swiper'],
  },
});
