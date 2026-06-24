import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { PRODUCT_TYPES } from '../../types'

function Header() {
  const [searchTerm, setSearchTerm] = useState('')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState(null)
  const navigate = useNavigate()

  function handleSearchSubmit(e) {
    e.preventDefault()
    const term = searchTerm.trim()
    if (term) {
      navigate(`/buscar?q=${encodeURIComponent(term)}`)
      setSearchTerm('')
    }
  }

  function handleNavClick() {
    setMobileMenuOpen(false)
    setActiveDropdown(null)
  }

  return (
    <header className="bg-charcoal-blue shadow-lg border-b border-goldenrod/20">
      <nav className="container mx-auto px-4 py-2 flex items-center justify-between gap-2">
        <Link to="/" onClick={handleNavClick} className="flex items-center space-x-3 group shrink-0">
          <img
            src="/logo.png"
            alt="Lumaré Logo"
            className="w-10 lg:w-12 h-10 lg:h-12 object-contain group-hover:scale-105 transition-transform duration-300"
          />
        </Link>

        <form onSubmit={handleSearchSubmit} className="flex-1 max-w-md">
          <div className="relative">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-lavender-blush/40"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscá tu producto..."
              className="w-full pl-10 pr-3 py-2 rounded-lg bg-charcoal-blue/50 border border-goldenrod/20 text-lavender-blush placeholder-lavender-blush/40 focus:outline-none focus:border-goldenrod focus:ring-2 focus:ring-goldenrod/20 transition-all duration-300 text-sm"
            />
          </div>
        </form>

        <div className="hidden lg:flex items-center space-x-6 shrink-0">
          {[
            { label: 'Hombres', base: '/hombres' },
            { label: 'Mujeres', base: '/mujeres' },
          ].map((gender) => (
            <div
              key={gender.base}
              className="relative"
              onMouseEnter={() => setActiveDropdown(gender.base)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <Link
                to={gender.base}
                className="text-lavender-blush hover:text-goldenrod-light transition-colors duration-300 text-base tracking-wide relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-goldenrod after:transition-all after:duration-300 hover:after:w-full"
              >
                {gender.label}
              </Link>
              <div
                className={`absolute top-full left-0 mt-2 w-44 bg-charcoal-blue rounded-xl shadow-2xl border border-goldenrod/20 overflow-hidden transition-all duration-200 ${activeDropdown === gender.base
                    ? 'opacity-100 visible translate-y-0'
                    : 'opacity-0 invisible -translate-y-2'
                  }`}
              >
                <Link
                  to={gender.base}
                  onClick={handleNavClick}
                  className="block px-4 py-3 text-sm text-lavender-blush hover:bg-goldenrod/10 hover:text-goldenrod-light transition-colors border-b border-goldenrod/10"
                >
                  Todos
                </Link>
                {PRODUCT_TYPES.map((t) => (
                  <Link
                    key={t.value}
                    to={`${gender.base}/${t.value}`}
                    onClick={handleNavClick}
                    className="block px-4 py-3 text-sm text-lavender-blush hover:bg-goldenrod/10 hover:text-goldenrod-light transition-colors"
                  >
                    {t.label}s
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-3 text-lavender-blush hover:text-goldenrod-light transition-colors duration-300 min-w-[44px] min-h-[44px] flex items-center justify-center"
          aria-label={mobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
        >
          {mobileMenuOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </nav>

      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-goldenrod/20 bg-charcoal-blue/95 backdrop-blur-sm animate-slide-down">
          <div className="container mx-auto px-4 py-4 space-y-1">
            <Link to="/" onClick={handleNavClick} className="block text-lavender-blush hover:text-goldenrod-light transition-colors duration-300 py-3 px-4 rounded-lg hover:bg-goldenrod/10 text-base tracking-wide">
              Inicio
            </Link>
            {[
              { label: 'Hombres', base: '/hombres' },
              { label: 'Mujeres', base: '/mujeres' },
            ].map((gender) => (
              <div key={gender.base}>
                <Link
                  to={gender.base}
                  onClick={handleNavClick}
                  className="block text-lavender-blush hover:text-goldenrod-light transition-colors duration-300 py-3 px-4 rounded-lg hover:bg-goldenrod/10 text-base tracking-wide font-semibold"
                >
                  {gender.label}
                </Link>
                <div className="ml-4 space-y-0.5">
                  <Link to={gender.base} onClick={handleNavClick} className="block text-lavender-blush/70 hover:text-goldenrod-light transition-colors duration-300 py-2 px-4 rounded-lg hover:bg-goldenrod/10 text-sm">
                    Todos
                  </Link>
                  {PRODUCT_TYPES.map((t) => (
                    <Link
                      key={t.value}
                      to={`${gender.base}/${t.value}`}
                      onClick={handleNavClick}
                      className="block text-lavender-blush/70 hover:text-goldenrod-light transition-colors duration-300 py-2 px-4 rounded-lg hover:bg-goldenrod/10 text-sm"
                    >
                      {t.label}s
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}

export default Header
