import { useEffect, useState, useMemo } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { getAllProducts } from '../services/productsService'
import ProductCard from '../components/catalog/ProductCard'
import ProductCardSkeleton from '../components/ui/ProductCardSkeleton'
import { PRODUCT_TYPES } from '../types'

const SEARCH_PAGE_SIZE = 12

function sortProducts(products, order) {
  if (order === 'default' || !products) return products

  const sorted = [...products]
  sorted.sort((a, b) => {
    const priceA = Number(a.price)
    const priceB = Number(b.price)
    return order === 'price-asc' ? priceA - priceB : priceB - priceA
  })
  return sorted
}

function SearchResultsPage() {
  const [searchParams] = useSearchParams()
  const query = searchParams.get('q') || ''

  const [allProducts, setAllProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [sortOrder, setSortOrder] = useState('default')
  const [visibleCount, setVisibleCount] = useState(SEARCH_PAGE_SIZE)

  useEffect(() => {
    async function loadAndSearch() {
      try {
        setLoading(true)
        const data = await getAllProducts()
        setAllProducts(data)
        setVisibleCount(SEARCH_PAGE_SIZE)
        setSortOrder('default')
      } catch (err) {
        setError(err)
      } finally {
        setLoading(false)
      }
    }

    loadAndSearch()
  }, [query])

  const filtered = useMemo(() => {
    if (!query.trim()) return []
    const term = query.toLowerCase().trim()
    return allProducts.filter(p => {
      const matchName = p.name.toLowerCase().includes(term)
      const matchBrand = p.brand && p.brand.toLowerCase().includes(term)
      return matchName || matchBrand
    })
  }, [allProducts, query])

  const sortedProducts = useMemo(
    () => sortProducts(filtered, sortOrder),
    [filtered, sortOrder]
  )

  const visibleProducts = sortedProducts.slice(0, visibleCount)
  const hasMore = visibleCount < sortedProducts.length

  if (error) return (
    <div className="min-h-screen bg-lavender-blush/80 flex items-center justify-center">
      <div className="text-center py-16 text-red-600">Error: {error.message}</div>
    </div>
  )

  return (
    <div className="py-16 bg-lavender-blush/80 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-charcoal-blue font-serif mb-4">
            Resultados para "{query}"
          </h1>
          {!loading && filtered.length > 0 && (
            <p className="text-charcoal-blue/60 text-lg">
              {filtered.length} {filtered.length === 1 ? 'producto encontrado' : 'productos encontrados'}
            </p>
          )}
          <div className="w-32 h-1 bg-goldenrod mx-auto mt-4"></div>
        </div>

        {!loading && filtered.length > 0 && (
          <div className="flex justify-end mb-10">
            <div className="flex items-center gap-3">
              <label htmlFor="sort-order-search" className="text-charcoal-blue/70 text-sm font-medium uppercase tracking-wide">
                Ordenar por
              </label>
              <select
                id="sort-order-search"
                value={sortOrder}
                onChange={(e) => { setSortOrder(e.target.value); setVisibleCount(SEARCH_PAGE_SIZE) }}
                className="bg-white border border-goldenrod/20 text-charcoal-blue px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:border-goldenrod/50 focus:ring-1 focus:ring-goldenrod/30 transition-colors cursor-pointer text-sm"
              >
                <option value="default">Por defecto</option>
                <option value="price-asc">Menor precio</option>
                <option value="price-desc">Mayor precio</option>
              </select>
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
          {loading
            ? Array.from({ length: 6 }).map((_, i) => (
                <div key={`skeleton-${i}`} className="animate-slide-up" style={{ animationDelay: `${i * 0.05}s` }}>
                  <ProductCardSkeleton />
                </div>
              ))
            : visibleProducts.map((product, index) => (
                <div
                  key={product.id}
                  className="animate-slide-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <ProductCard product={product} />
                </div>
              ))}
        </div>

        {!loading && hasMore && (
          <div className="flex justify-center mt-12">
            <button
              onClick={() => setVisibleCount((prev) => prev + SEARCH_PAGE_SIZE)}
              className="bg-goldenrod text-white px-10 py-4 rounded-full font-semibold text-lg shadow-lg hover:bg-goldenrod/80 transition-all duration-300"
            >
              Cargar más ({sortedProducts.length - visibleCount} restantes)
            </button>
          </div>
        )}

        {!loading && !error && filtered.length === 0 && query.trim() && (
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
