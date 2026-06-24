// Importa los hooks de React Router
import { useParams } from 'react-router-dom'
// Importa el hook personalizado useProduct
import { useProduct } from '../hooks/useProduct'
// Importa el componente ProductDetail
import ProductDetail from '../components/product/ProductDetail'
// Importa el componente LoadingSpinner
import LoadingSpinner from '../components/ui/LoadingSpinner'

/**
 * Página de detalles del producto
 * Obtiene el ID de la URL y carga el producto
 */
function ProductDetailPage() {
  // Obtiene el parámetro ID de la URL
  const { id } = useParams()
  
  // Carga el producto usando el hook personalizado
  const { product, loading, error } = useProduct(id)

  // Muestra spinner mientras carga
  if (loading) return <LoadingSpinner />
  
  // Muestra error si ocurre
  if (error) return <div className="text-center py-8 text-red-600">Error: {error.message}</div>
  
  // Muestra mensaje si no se encuentra el producto
  if (!product) return <div className="text-center py-8">Producto no encontrado</div>

  return <ProductDetail product={product} />
}

export default ProductDetailPage
