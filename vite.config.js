import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { blogMetadataPlugin } from './scripts/blogMetadataPlugin.js'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [blogMetadataPlugin(), react()],
  server: {
    port: 5500,
    open: true
  },
  build: {
    outDir: 'dist'
  }
})

