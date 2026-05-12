// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/lex-premium/', // <-- CAMBIA ESTO PARA QUE COINCIDA CON EL REPO
})