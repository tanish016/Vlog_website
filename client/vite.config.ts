import { defineConfig } from 'vite'
import path from 'path';
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  server: {
    proxy: {
      '/api':{
      target: 'http://localhost:3030',
      changeOrigin: true,
      }
    }
    },
  plugins: [react(), tailwindcss()], // Use plugins here
  build: {
    rollupOptions: {
      external: ['react-router-dom'], // Keep external dependencies here
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
