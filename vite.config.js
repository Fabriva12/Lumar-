import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Configuración de Vite para el proyecto Perfumes Z-Aromac
// Integra el plugin de Tailwind CSS v4 y el plugin de React
export default defineConfig({
  plugins: [react(), tailwindcss()],
})
