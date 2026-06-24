import { Link } from 'react-router-dom'
import { PRODUCT_TYPES } from '../../types'

function ProductCard({ product }) {
  const typeLabel = PRODUCT_TYPES.find((t) => t.value === product.type)?.label

  return (
    <div className="bg-white rounded-lg shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 group border border-goldenrod/10 hover:border-goldenrod/30">
      <div className="relative overflow-hidden">
        <img
          src={product.image_url || 'https://via.placeholder.com/300x300'}
          alt={product.name}
          className="w-full h-48 sm:h-72 object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-blue/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        {typeLabel && (
          <span className="absolute top-3 left-3 bg-charcoal-blue/80 text-lavender-blush text-xs font-medium px-3 py-1 rounded-full backdrop-blur-sm">
            {typeLabel}
          </span>
        )}
      </div>

      <div className="p-4 sm:p-6">
        <h3 className="text-base sm:text-xl font-semibold text-charcoal-blue mb-2 sm:mb-3 font-serif">
          {product.name}        {product.volume}
        </h3>


        <p className="text-lg sm:text-2xl font-bold text-goldenrod mb-3 sm:mb-4">
          ₡{product.price}
        </p>

        <Link
          to={`/product/${product.id}`}
          className="inline-block w-full text-center bg-charcoal-blue text-lavender-blush px-6 py-3 rounded hover:bg-charcoal-blue/80 transition-colors duration-300 tracking-wide uppercase text-sm font-semibold"
        >
          Ver Detalles
        </Link>
      </div>
    </div>
  )
}

export default ProductCard
