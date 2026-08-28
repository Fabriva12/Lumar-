import { useState } from "react";
import { Link } from "react-router-dom";
import { PRODUCT_TYPES } from "../../types";

function ProductCard({ product }) {
  const [imageError, setImageError] = useState(false);

  const typeLabel = PRODUCT_TYPES.find((t) => t.value === product.type)?.label;

  const imageSrc = product.image_url || null;
  const showFallback = imageError || !imageSrc;
  const initial = (product.name || "L").trim().charAt(0).toUpperCase();

  return (
    <div className="bg-white rounded-lg shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 group border border-goldenrod/10 hover:border-goldenrod/30 flex flex-col h-full">
      <div className="relative overflow-hidden">
        {showFallback ? (
          <div className="w-full h-48 sm:h-72 bg-gradient-to-br from-charcoal-blue to-goldenrod/70 flex items-center justify-center">
            <span className="text-5xl sm:text-7xl font-serif text-lavender-blush/80">
              {initial}
            </span>
          </div>
        ) : (
          <img
            src={imageSrc}
            alt={product.name}
            loading="lazy"
            onError={() => setImageError(true)}
            className="w-full h-48 sm:h-72 object-cover group-hover:scale-105 transition-transform duration-500"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-blue/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="absolute top-3 left-3 flex gap-2">
          {typeLabel && (
            <span className="bg-charcoal-blue/80 text-lavender-blush text-xs font-medium px-3 py-1 rounded-full backdrop-blur-sm">
              {typeLabel}
            </span>
          )}
        </div>
      </div>

      <div className="p-4 sm:p-6 flex flex-col flex-1">
        {product.brand && (
          <p className="text-goldenrod font-semibold text-sm tracking-widest uppercase mb-1">
            {product.brand}
          </p>
        )}

        <h3 className="text-base sm:text-xl font-semibold text-charcoal-blue font-serif">
          {product.name}
        </h3>

        {product.volume && (
          <p className="text-sm text-goldenrod mt-1 mb-4">{product.volume}</p>
        )}

        <Link
          to={`/product/${product.id}`}
          className="mt-auto inline-block w-full text-center bg-charcoal-blue text-lavender-blush px-6 py-3 rounded hover:bg-charcoal-blue/80 transition-colors duration-300 tracking-wide uppercase text-sm font-semibold"
        >
          Ver Detalles
        </Link>
      </div>
    </div>
  );
}

export default ProductCard;