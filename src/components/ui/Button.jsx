/**
 * Componente Button - Botón reutilizable
 * @param {Object} props - Propiedades del componente
 * @param {string} props.variant - Variante del botón ('primary' | 'secondary')
 * @param {Function} props.onClick - Función al hacer clic
 * @param {React.ReactNode} props.children - Contenido del botón
 */
function Button({ variant = 'primary', onClick, children, className = '' }) {
  // Clases base para el botón
  const baseClasses = 'px-6 py-2 rounded-lg font-semibold transition-colors'
  
  // Clases según la variante
  const variantClasses = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300'
  }

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
    >
      {children}
    </button>
  )
}

export default Button
