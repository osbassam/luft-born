import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8000/', // Change this to the API server URL
        changeOrigin: true, // this is required to avoid CORS issues
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
});
