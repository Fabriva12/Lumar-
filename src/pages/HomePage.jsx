// Importa los componentes de la sección home
import HeroSection from '../components/home/HeroSection'
import FeaturedProducts from '../components/home/FeaturedProducts'

/**
 * Página principal - HomePage
 * Muestra el hero section y productos destacados
 */
function HomePage() {
  return (
    <div>
      <HeroSection />
      <FeaturedProducts />
    </div>
  )
}

export default HomePage
