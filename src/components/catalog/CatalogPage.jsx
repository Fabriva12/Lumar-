import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useProducts } from '../../hooks/useProducts'
import { getBrands } from '../../services/productsService'
import ProductCard from './ProductCard'
import ProductCardSkeleton from '../ui/ProductCardSkeleton'
import { PRODUCT_TYPES } from '../../types'

function CatalogPage({ gender, type }) {
  const [brand, setBrand] = useState(null)
  const [brands, setBrands] = useState([])
  const [brandOpen, setBrandOpen] = useState(false)
  const brandRef = useRef(null)
  const { products, loading, loadingMore, error, hasMore, loadMore } = useProducts(gender, type, brand)

  useEffect(() => {
    if (!brandOpen) return

    function handleClickOutside(e) {
      if (brandRef.current && !brandRef.current.contains(e.target)) {
        setBrandOpen(false)
      }
    }

    function handleKeyDown(e) {
      if (e.key === 'Escape') {
        setBrandOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [brandOpen])

  useEffect(() => {
    let cancelled = false

    async function loadBrands() {
      try {
        const data = await getBrands(gender, type)
        if (!cancelled) setBrands(data)
      } catch (err) {
        console.error('Error loading brands:', err)
      }
    }

    setBrand(null)
    setBrandOpen(false)
    loadBrands()

    return () => {
      cancelled = true
    }
  }, [gender, type])

  if (error) return <div className="text-center py-16 text-red-600">Error: {error.message}</div>

  const genderLabel = gender === 'hombre' ? 'Hombre' : gender === 'mujer' ? 'Mujer' : 'Unisex'
  const genderPath = gender === 'hombre' ? 'hombres' : gender === 'mujer' ? 'mujeres' : 'unisex'
  const typeLabel = type ? PRODUCT_TYPES.find((t) => t.value === type)?.label : null
  const title = typeLabel
    ? `${typeLabel}s para ${genderLabel}`
    : `Productos para ${genderLabel}`

  return (
    <div className="py-16 bg-lavender-blush/80 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-charcoal-blue font-serif mb-4">
            {title}
          </h1>
          <div className="w-32 h-1 bg-goldenrod mx-auto"></div>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-10">
          <Link
            to={`/${genderPath}`}
            className={`px-5 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
              !type
                ? 'bg-goldenrod text-white shadow-md'
                : 'bg-white text-charcoal-blue/70 border border-goldenrod/20 hover:border-goldenrod/50'
            }`}
          >
            Todos
          </Link>
          {PRODUCT_TYPES.map((t) => (
            <Link
              key={t.value}
              to={`/${genderPath}/${t.value}`}
              className={`px-5 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                type === t.value
                  ? 'bg-goldenrod text-white shadow-md'
                  : 'bg-white text-charcoal-blue/70 border border-goldenrod/20 hover:border-goldenrod/50'
              }`}
            >
              {t.label}s
            </Link>
          ))}
        </div>

        {brands.length > 0 && (
          <div className="flex justify-center mb-10">
            <div className="relative" ref={brandRef}>
              <button
                onClick={() => setBrandOpen(!brandOpen)}
                aria-haspopup="listbox"
                aria-expanded={brandOpen}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 bg-white text-charcoal-blue/70 border border-goldenrod/20 hover:border-goldenrod/50"
              >
                <span className={brand ? 'text-goldenrod font-semibold' : ''}>
                  {brand || 'Filtrar por marca'}
                </span>
                <svg
                  className={`w-4 h-4 transition-transform duration-200 ${brandOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {brandOpen && (
                <div
                  role="listbox"
                  className="absolute z-20 left-1/2 -translate-x-1/2 mt-2 w-60 bg-white rounded-xl shadow-2xl border border-goldenrod/20 overflow-hidden max-h-72 overflow-y-auto animate-slide-down text-left"
                >
                  <button
                    onClick={() => {
                      setBrand(null)
                      setBrandOpen(false)
                    }}
                    className={`block w-full px-4 py-3 text-sm text-left transition-colors ${
                      !brand
                        ? 'bg-goldenrod/10 text-goldenrod font-semibold'
                        : 'text-charcoal-blue/70 hover:bg-goldenrod/10'
                    }`}
                  >
                    Todas las marcas
                  </button>
                  {brands.map((b) => (
                    <button
                      key={b}
                      onClick={() => {
                        setBrand(b)
                        setBrandOpen(false)
                      }}
                      className={`block w-full px-4 py-3 text-sm text-left transition-colors border-t border-goldenrod/10 ${
                        brand === b
                          ? 'bg-goldenrod/10 text-goldenrod font-semibold'
                          : 'text-charcoal-blue/70 hover:bg-goldenrod/10'
                      }`}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
          {loading
            ? Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={`skeleton-${i}`}
                  className="animate-slide-up h-full"
                  style={{ animationDelay: `${i * 0.05}s` }}
                >
                  <ProductCardSkeleton />
                </div>
              ))
            : products.map((product, index) => (
                <div
                  key={product.id}
                  className="animate-slide-up h-full"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <ProductCard product={product} />
                </div>
              ))}
          {loadingMore && (
            <div className="col-span-full grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={`more-skeleton-${i}`} className="h-full">
                  <ProductCardSkeleton />
                </div>
              ))}
            </div>
          )}
        </div>

        {!loading && hasMore && (
          <div className="flex justify-center mt-12">
            <button
              onClick={loadMore}
              disabled={loadingMore}
              className="bg-goldenrod text-white px-10 py-4 rounded-full font-semibold text-lg shadow-lg hover:bg-goldenrod/80 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loadingMore ? 'Cargando...' : 'Cargar más'}
            </button>
          </div>
        )}

        {!loading && products.length === 0 && !error && (
          <div className="text-center py-16">
            <p className="text-charcoal-blue/80 text-xl">
              {brand
                ? `No hay productos de ${brand} en esta categoría.`
                : 'No hay productos disponibles en esta categoría.'}
            </p>
            {brand ? (
              <button
                onClick={() => setBrand(null)}
                className="mt-4 inline-block bg-charcoal-blue text-lavender-blush px-8 py-3 rounded-lg hover:bg-charcoal-blue/80 transition-colors duration-300"
              >
                Ver todas las marcas
              </button>
            ) : (
              <p className="text-goldenrod mt-2">Pronto agregaremos nuevas fragancias.</p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default CatalogPage
