import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/csrf': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false,
      },
      '/test': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false,
      }
    },
    port: 9226
  }
})
