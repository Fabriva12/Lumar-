import { useState } from 'react'
import { PRODUCT_TYPES } from '../../types'

function ProductDetail({ product }) {
  const [imageLoading, setImageLoading] = useState(true)
  const [selectedIndex, setSelectedIndex] = useState(0)

  const images = product.images?.length > 0
    ? product.images
    : product.image_url
      ? [product.image_url]
      : []

  const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER
  const typeLabel = PRODUCT_TYPES.find((t) => t.value === product.type)?.label
  const message = `Hola! Quiero este perfume: ${product.name}`
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`

  function prevImage(e) {
    e.stopPropagation()
    setSelectedIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  function nextImage(e) {
    e.stopPropagation()
    setSelectedIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  return (
    <div className="py-16 bg-lavender-blush/80 min-h-screen animate-fade-in">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden border border-goldenrod/20">
          <div className="md:flex">
            <div className="md:w-1/2 bg-gradient-to-br from-lavender-blush to-goldenrod-light/20">
              <div className="relative">
                {imageLoading && (
                  <div className="w-full h-96 bg-lavender-blush animate-pulse flex items-center justify-center">
                    <div className="text-goldenrod text-lg">Cargando imagen...</div>
                  </div>
                )}
                {images.length > 0 && (
                  <img
                    src={images[selectedIndex]}
                    alt={`${product.name} - ${selectedIndex + 1}`}
                    className={`w-full h-96 md:h-[32rem] object-cover ${imageLoading ? 'hidden' : 'block'}`}
                    onLoad={() => setImageLoading(false)}
                  />
                )}
                {images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 hover:bg-white shadow-md flex items-center justify-center text-charcoal-blue text-xl transition-all hover:scale-110"
                    >
                      ‹
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 hover:bg-white shadow-md flex items-center justify-center text-charcoal-blue text-xl transition-all hover:scale-110"
                    >
                      ›
                    </button>
                  </>
                )}
                {images.length > 1 && (
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-black/50 text-white text-xs px-3 py-1 rounded-full">
                    {selectedIndex + 1} / {images.length}
                  </div>
                )}
              </div>

              {images.length > 1 && (
                <div className="flex gap-2 px-4 pb-4 pt-2 overflow-x-auto">
                  {images.map((url, i) => (
                    <button
                      key={i}
                      onClick={() => { setSelectedIndex(i); setImageLoading(true) }}
                      className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                        i === selectedIndex
                          ? 'border-goldenrod shadow-md opacity-100'
                          : 'border-transparent opacity-60 hover:opacity-80'
                      }`}
                    >
                      <img
                        src={url}
                        alt={`${product.name} ${i + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
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
                    ₡{product.price}
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
