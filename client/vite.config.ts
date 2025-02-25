import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()], // Use plugins here
  build: {
    rollupOptions: {
      external: ['react-router-dom'], // Keep external dependencies here
    },
  },
})
