import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/besider/',
  plugins: [react()],
  // server: {
  //   proxy: {
  //     '/api': {
  //       target: 'https://api.nytimes.com',
  //       changeOrigin: true,
  //       rewrite: (path) => path.replace(/^\/api/, ''),
  //     },
  //     '/images': {
  //       target: 'https://www.nytimes.com',
  //       changeOrigin: true,
  //       rewrite: (path) => path.replace(/^\/images/, ''),
  //     },
  //   },
  // },
});