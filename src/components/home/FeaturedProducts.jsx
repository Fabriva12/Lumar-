import { useEffect, useState } from 'react'
import { getFeaturedProducts } from '../../services/productsService'
import ProductCard from '../catalog/ProductCard'
import ProductCardSkeleton from '../ui/ProductCardSkeleton'

function FeaturedProducts() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [maxItems, setMaxItems] = useState(8)

  useEffect(() => {
    function handleResize() {
      setMaxItems(window.innerWidth < 640 ? 6 : 8)
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
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

  const visibleProducts = products.slice(0, maxItems)

  return (
    <div className="py-20 bg-lavender-blush/80">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-charcoal-blue font-serif">
          Productos <span className="text-goldenrod">Destacados</span>
        </h2>

        <div className="grid grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
          {loading
            ? Array.from({ length: maxItems }).map((_, i) => (
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
      </div>
    </div>
  )
}

export default FeaturedProducts
