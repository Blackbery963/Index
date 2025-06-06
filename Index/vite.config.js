import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
   build:{
   rollupOptions:{
   external:['aos', 'framer-motion']
}   
  },
  optimizeDeps: {
    include: ['swiper','aos', 'framer-motion'],        // ✅ Ensures Swiper is pre-bundled
    exclude: ['react-hot-toast'] // ✅ You exclude it from optimization
  },
  server: {
    proxy: {
      '/api': 'http://localhost:3000', // ✅ Good for backend proxying
    },
  },
});
