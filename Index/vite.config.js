
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'custom-headers',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          res.setHeader('Content-Type', 'application/javascript');
          next();
        });
      },
    },
  ],
   base: './', // Use relative paths for assets
  server: {
    proxy: {
      '/api': 'http://localhost:3000',
    },
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    // rollupOptions: {
    //   external: ['react-ga4']
    // }
  },
  optimizeDeps: {
    include: ['swiper'],
  },
});
