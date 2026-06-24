// Importa el hook useState y useEffect de React
import { useState, useEffect } from 'react'
// Importa el servicio para obtener un producto
import { getProductById } from '../services/productsService'

/**
 * Hook personalizado para obtener un producto por su ID
 * @param {string} id - UUID del producto
 * @returns {Object} - { product, loading, error }
 */
export function useProduct(id) {
  // Estado para almacenar el producto
  const [product, setProduct] = useState(null)
  // Estado para controlar la carga
  const [loading, setLoading] = useState(true)
  // Estado para almacenar errores
  const [error, setError] = useState(null)

  useEffect(() => {
    // Función asíncrona para cargar el producto
    async function loadProduct() {
      try {
        setLoading(true)
        // Llama al servicio para obtener el producto por ID
        const data = await getProductById(id)
        setProduct(data)
      } catch (err) {
        setError(err)
      } finally {
        setLoading(false)
      }
    }

    // Ejecuta la carga si hay un ID definido
    if (id) {
      loadProduct()
    }
  }, [id])

  return { product, loading, error }
}
