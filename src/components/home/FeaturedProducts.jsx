// Importa los hooks useEffect y useState de React
import { useEffect, useState } from 'react'
// Importa el servicio de productos
import { getFeaturedProducts } from '../../services/productsService'
// Importa el componente ProductCard
import ProductCard from '../catalog/ProductCard'

/**
 * Componente FeaturedProducts - Muestra productos destacados en la homepage
 * Estilo lujoso: fondo crema, títulos en fuente serif, animación slide-up
 */
function FeaturedProducts() {
  // Estado para almacenar los productos destacados
  const [products, setProducts] = useState([])
  // Estado para controlar la carga
  const [loading, setLoading] = useState(true)
  // Cantidad de productos a mostrar según pantalla
  const [maxItems, setMaxItems] = useState(8)

  // Detecta el tamaño de pantalla para ajustar cuántos productos mostrar
  useEffect(() => {
    function handleResize() {
      setMaxItems(window.innerWidth < 640 ? 6 : 8)
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    // Función asíncrona para cargar productos destacados
    async function loadFeatured() {
      try {
        const data = await getFeaturedProducts()
        setProducts(data)
      } catch (error) {
        console.error('Error loading featured products:', error)
      } finally {
        setLoading(false)
      }
    }

    loadFeatured()
  }, [])

  // Muestra spinner mientras carga
  if (loading) {
    return <div className="text-center py-16 text-charcoal-blue/80">Cargando productos destacados...</div>
  }

  // Solo mostramos los primeros `maxItems` productos
  const visibleProducts = products.slice(0, maxItems)

  return (
    <div className="py-20 bg-lavender-blush/80">
      <div className="container mx-auto px-4">
        {/* Título en fuente serif elegante */}
        <h2 className="text-4xl font-bold text-center mb-12 text-charcoal-blue font-serif">
          Productos <span className="text-goldenrod">Destacados</span>
        </h2>
        
        {/* Grid de productos con animación suave */}
        <div className="grid grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
          {visibleProducts.map((product, index) => (
            <div 
              key={product.id} 
              className="animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default FeaturedProducts
