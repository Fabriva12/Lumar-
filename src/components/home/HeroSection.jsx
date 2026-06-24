/**
 * Componente HeroSection - Sección principal de la página de inicio
 * Muestra el logo y nombre de la tienda con estilo lujoso
 * Fondo degradado dorado/crema, fuentes elegantes
 */
function HeroSection() {
  return (
    <div className="bg-gradient-to-r from-goldenrod-light/20 to-lavender-blush/60 py-24 animate-fade-in">
      <div className="container mx-auto px-4 text-center">
        {/* Logo grande sin fondo */}
        <div className="mb-8">
          <img
            src="/logo.png"
            alt="Lumaré"
            className="w-36 h-36 mx-auto object-contain"
          />
        </div>

        {/* Descripción en fuente sans-serif suave */}
        <p className="text-xl text-charcoal-blue/80 max-w-3xl mx-auto leading-relaxed">
          Explorá nuestra exclusiva colección de Productos para hombre y mujer.
        </p>

        {/* Línea decorativa dorada */}
        <div className="mt-8 w-24 h-1 bg-goldenrod mx-auto"></div>
      </div>
    </div>
  )
}

export default HeroSection
