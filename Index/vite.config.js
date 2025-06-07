// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';

// export default defineConfig({
//   plugins: [react()],
//   optimizeDeps: {
//     include: ['swiper','aos', 'framer-motion'],        // ✅ Ensures Swiper is pre-bundled
//     exclude: ['react-hot-toast'] // ✅ You exclude it from optimization
//   },
//   server: {
//     proxy: {
//       '/api': 'http://localhost:3000', // ✅ Good for backend proxying
//     },
//   },
// });

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
  server: {
    proxy: {
      '/api': 'http://localhost:3000',
    },
  },
  // build:{
  //   rollupOptions:{
  //     external:['react-ga4']
  //   }

  //},
  optimizeDeps: {
    include: ['swiper'],
  },
});