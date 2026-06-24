import { useState } from 'react'
import { PRODUCT_TYPES } from '../../types'

function ProductDetail({ product }) {
  const [imageLoading, setImageLoading] = useState(true)

  const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER
  const typeLabel = PRODUCT_TYPES.find((t) => t.value === product.type)?.label
  const message = `Hola! Quiero este perfume: ${product.name}`
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`

  return (
    <div className="py-16 bg-lavender-blush/80 min-h-screen animate-fade-in">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden border border-goldenrod/20">
          <div className="md:flex">
            <div className="md:w-1/2 relative bg-gradient-to-br from-lavender-blush to-goldenrod-light/20">
              {imageLoading && (
                <div className="w-full h-96 bg-lavender-blush animate-pulse flex items-center justify-center">
                  <div className="text-goldenrod text-lg">Cargando imagen...</div>
                </div>
              )}
              <img
                src={product.image_url || 'https://via.placeholder.com/600x600'}
                alt={product.name}
                className={`w-full h-96 md:h-full object-cover ${imageLoading ? 'hidden' : 'block'}`}
                onLoad={() => setImageLoading(false)}
              />
            </div>

            <div className="md:w-1/2 p-10 flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-2">
                <p className="text-goldenrod font-semibold text-sm tracking-widest uppercase">
                  {product.brand}
                </p>
                {typeLabel && (
                  <span className="bg-charcoal-blue/10 text-charcoal-blue text-xs font-medium px-3 py-1 rounded-full">
                    {typeLabel}
                  </span>
                )}
              </div>

              <h1 className="text-4xl font-bold text-charcoal-blue mb-6 font-serif leading-tight">
                {product.name}
              </h1>

              <div className="space-y-4 mb-8">
                <div className="flex items-center space-x-2">
                  <span className="text-charcoal-blue/80 font-semibold">Volumen:</span>
                  <span className="text-charcoal-blue text-lg">{product.volume}</span>
                </div>

                <div className="pt-4 border-t border-goldenrod/20">
                  <p className="text-5xl font-bold text-goldenrod font-serif">
                    ${product.price}
                  </p>
                  <p className="text-sm text-charcoal-blue/80 mt-1">Precio final</p>
                </div>

                {product.description && (
                  <div className="pt-4">
                    <p className="text-charcoal-blue/80 leading-relaxed">
                      {product.description}
                    </p>
                  </div>
                )}
              </div>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center space-x-3 bg-green-600 text-white px-10 py-4 rounded-lg font-semibold hover:bg-green-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <span className="text-2xl">💬</span>
                <span>Contactar por WhatsApp</span>
              </a>

              <p className="text-sm text-charcoal-blue/80 mt-4 text-center">
                Consultá disponibilidad y realiza tu pedido
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail
