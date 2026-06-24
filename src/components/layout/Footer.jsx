// Importa el componente de enlace de React Router
import { Link } from 'react-router-dom'

/**
 * Componente Footer - Pie de página lujoso
 * Contiene enlaces a redes sociales e información de contacto
 * Estilo: negro mate con detalles dorados
 */
function Footer() {
  // Obtiene la URL de Instagram desde las variables de entorno
  const instagramUrl = import.meta.env.VITE_INSTAGRAM_URL || '#'

  return (
    <footer className="bg-charcoal-blue text-lavender-blush py-16 mt-24 border-t-2 border-goldenrod/20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Columna 1: Información de la tienda */}
          <div>
            <h3 className="text-2xl font-bold mb-4 text-goldenrod font-serif">
              Lumaré
            </h3>
            <p className="text-lavender-blush/80 leading-relaxed">
              Tu tienda de confianza. Descubrí los productos más exclusivas.
            </p>
          </div>

          {/* Columna 2: Enlaces rápidos */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-goldenrod-light">Enlaces Rápidos</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/hombres" className="text-lavender-blush/80 hover:text-goldenrod transition-colors">
                  Para Hombre
                </Link>
              </li>
              <li>
                <Link to="/mujeres" className="text-lavender-blush/80 hover:text-goldenrod transition-colors">
                  Para Mujer
                </Link>
              </li>
            </ul>
          </div>

          {/* Columna 3: Contacto e Instagram */}
          <div>
            {/* Enlace a Instagram - estilo elegante */}
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              <span className="text-2xl">📸</span>
              <span className="font-semibold">Síguenos en Instagram</span>
            </a>
          </div>
        </div>

        {/* Línea dorada decorativa */}
        <div className="mt-12 pt-8 border-t border-goldenrod/20">
          <p className="text-center text-lavender-blush/60 text-sm">
            &copy; 2026 Lumaré. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
