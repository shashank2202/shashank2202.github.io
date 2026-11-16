import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  // Served from https://shashank2202.github.io/shashank.github.io/
  base: '/shashank.github.io/',
  plugins: [react(), tailwindcss()],
})
