// Importa la biblioteca React y el renderizador
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// Importa los estilos de Tailwind
import './index.css'
// Importa el componente principal App
import App from './App.jsx'

// Obtiene el elemento root del DOM
const rootElement = document.getElementById('root')

// Crea el root y renderiza la aplicación en modo estricto
createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
