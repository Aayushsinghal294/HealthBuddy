import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  envDir: './src',
  plugins: [tailwindcss(), react()],
  server: { port: 5173 },
})
