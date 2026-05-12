// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // REEMPLAZA 'nombre-del-repo' por el nombre exacto que le pusiste en GitHub
  base: '/nombre-del-repo/', 
})