// Importa hooks de React y React Router
import { useEffect, useState } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
// Importa el servicio de productos
import { getAllProducts } from '../services/productsService'
// Importa el componente ProductCard
import ProductCard from '../components/catalog/ProductCard'
// Importa el componente LoadingSpinner
import LoadingSpinner from '../components/ui/LoadingSpinner'

/**
 * Ordena un array de productos según el criterio indicado
 * @param {Array} products - Lista de productos
 * @param {string} order - 'default' | 'price-asc' | 'price-desc'
 * @returns {Array} - Productos ordenados
 */
function sortProducts(products, order) {
  if (order === 'default') return products

  const sorted = [...products]
  sorted.sort((a, b) => {
    const priceA = Number(a.price)
    const priceB = Number(b.price)
    return order === 'price-asc' ? priceA - priceB : priceB - priceA
  })
  return sorted
}

/**
 * Página de resultados de búsqueda - SearchResultsPage
 * Busca productos por nombre en todos los géneros
 * Recibe el término de búsqueda por query param ?q=
 */
function SearchResultsPage() {
  // Lee el query param ?q= de la URL
  const [searchParams] = useSearchParams()
  const query = searchParams.get('q') || ''

  // Estado para productos y carga
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  // Estado para el criterio de ordenamiento
  const [sortOrder, setSortOrder] = useState('default')

  useEffect(() => {
    async function loadAndSearch() {
      try {
        setLoading(true)
        const allProducts = await getAllProducts()

        // Filtra por nombre o marca si hay query (case-insensitive)
        const filtered = query.trim()
          ? allProducts.filter(p => {
              const term = query.toLowerCase().trim()
              const matchName = p.name.toLowerCase().includes(term)
              const matchBrand = p.brand && p.brand.toLowerCase().includes(term)
              return matchName || matchBrand
            })
          : []

        setProducts(filtered)
        // Resetea el orden al hacer una nueva búsqueda
        setSortOrder('default')
      } catch (err) {
        setError(err)
      } finally {
        setLoading(false)
      }
    }

    loadAndSearch()
  }, [query])

  // Muestra spinner mientras carga
  if (loading) return <LoadingSpinner />

  // Muestra error si ocurre
  if (error) return (
    <div className="min-h-screen bg-lavender-blush/80 flex items-center justify-center">
      <div className="text-center py-16 text-red-600">Error: {error.message}</div>
    </div>
  )

  // Productos ordenados según el criterio seleccionado
  const sortedProducts = sortProducts(products, sortOrder)

  return (
    <div className="py-16 bg-lavender-blush/80 min-h-screen">
      <div className="container mx-auto px-4">
        {/* Título según si hay resultados o no */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-charcoal-blue font-serif mb-4">
            Resultados para "{query}"
          </h1>
          {products.length > 0 && (
            <p className="text-charcoal-blue/60 text-lg">
              {products.length} {products.length === 1 ? 'perfume encontrado' : 'perfumes encontrados'}
            </p>
          )}
          <div className="w-32 h-1 bg-goldenrod mx-auto mt-4"></div>
        </div>

        {/* Barra de ordenamiento */}
        {products.length > 0 && (
          <div className="flex justify-end mb-10">
            <div className="flex items-center gap-3">
              <label htmlFor="sort-order-search" className="text-charcoal-blue/70 text-sm font-medium uppercase tracking-wide">
                Ordenar por
              </label>
              <select
                id="sort-order-search"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="bg-white border border-goldenrod/20 text-charcoal-blue px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:border-goldenrod/50 focus:ring-1 focus:ring-goldenrod/30 transition-colors cursor-pointer text-sm"
              >
                <option value="default">Por defecto</option>
                <option value="price-asc">Menor precio</option>
                <option value="price-desc">Mayor precio</option>
              </select>
            </div>
          </div>
        )}

        {/* Grid de resultados */}
        {sortedProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
            {sortedProducts.map((product, index) => (
              <div
                key={product.id}
                className="animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        ) : (
          /* Mensaje si no hay resultados */
          <div className="text-center py-16">
            <svg className="w-16 h-16 mx-auto text-charcoal-blue/20 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <p className="text-charcoal-blue/80 text-xl mb-2">No encontramos "{query}"</p>
            <p className="text-goldenrod mb-6">Probá con otro nombre o revisá la ortografía.</p>
            <Link
              to="/"
              className="inline-block bg-charcoal-blue text-lavender-blush px-8 py-3 rounded-lg hover:bg-charcoal-blue/80 transition-colors duration-300"
            >
              Volver al inicio
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default SearchResultsPage
