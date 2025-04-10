import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({

content: [
  "./index.html",
  "./src/**/*.{js,ts,tsx,jsx}",
],
theme: {
  extend:{
    colors:{
      'primary':"#111111",
    }
  },
},

  plugins: [tailwindcss(),react()],
  server:{port:5173}
})
