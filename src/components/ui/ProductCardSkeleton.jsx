function ProductCardSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow-xl overflow-hidden border border-goldenrod/10 animate-pulse">
      <div className="relative overflow-hidden">
        <div className="w-full h-48 sm:h-72 bg-charcoal-blue/10" />
        <div className="absolute top-3 left-3 w-16 h-5 rounded-full bg-charcoal-blue/10" />
      </div>
      <div className="p-4 sm:p-6 space-y-3">
        <div className="h-5 bg-charcoal-blue/10 rounded w-3/4" />
        <div className="h-7 bg-charcoal-blue/10 rounded w-1/3" />
        <div className="h-11 bg-charcoal-blue/10 rounded w-full" />
      </div>
    </div>
  )
}

export default ProductCardSkeleton
