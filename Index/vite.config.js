// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
   build: {
    rollupOptions: {
      external: ['react-ga4'],
    },
  },
  optimizeDeps: {
    include: ['swiper'],
    exclude: ['react-hot-toast']
  },
  server: {
    proxy: {
      '/api': 'http://localhost:3000',
    },
  },
});
