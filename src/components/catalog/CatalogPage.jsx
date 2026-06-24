import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useProducts } from '../../hooks/useProducts'
import ProductCard from './ProductCard'
import LoadingSpinner from '../ui/LoadingSpinner'
import { PRODUCT_TYPES } from '../../types'

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

function CatalogPage({ gender, type }) {
  const { products, loading, error } = useProducts(gender, type)
  const [sortOrder, setSortOrder] = useState('default')

  if (loading) return <LoadingSpinner />

  if (error) return <div className="text-center py-16 text-red-600">Error: {error.message}</div>

  const genderLabel = gender === 'hombre' ? 'Hombre' : 'Mujer'
  const genderPath = gender === 'hombre' ? 'hombres' : 'mujeres'
  const typeLabel = type ? PRODUCT_TYPES.find((t) => t.value === type)?.label : null
  const title = typeLabel
    ? `${typeLabel}s para ${genderLabel}`
    : `Productos para ${genderLabel}`
  const sortedProducts = sortProducts(products, sortOrder)

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

        {products.length > 0 && (
          <div className="flex justify-end mb-10">
            <div className="flex items-center gap-3">
              <label htmlFor="sort-order" className="text-charcoal-blue/70 text-sm font-medium uppercase tracking-wide">
                Ordenar por
              </label>
              <select
                id="sort-order"
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

        {products.length === 0 && (
          <div className="text-center py-16">
            <p className="text-charcoal-blue/80 text-xl">No hay productos disponibles en esta categoría.</p>
            <p className="text-goldenrod mt-2">Pronto agregaremos nuevas fragancias.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default CatalogPage
