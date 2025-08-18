import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';

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
    visualizer({
      open: true, // Automatically open the report in your browser
      filename: 'bundle-analysis.html',
      template: 'treemap', // You can try 'sunburst', 'network'
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
