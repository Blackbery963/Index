// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      external: ['react-ga4'], // ✅ Optional but depends on your needs (see notes below)
    },
  },
  optimizeDeps: {
    include: ['swiper'],        // ✅ Ensures Swiper is pre-bundled
    exclude: ['react-hot-toast'] // ✅ You exclude it from optimization
  },
  server: {
    proxy: {
      '/api': 'http://localhost:3000', // ✅ Good for backend proxying
    },
  },
});
