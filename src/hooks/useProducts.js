import { useState, useEffect } from 'react'
import { getProductsByGenderAndType } from '../services/productsService'

export function useProducts(gender, type) {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function loadProducts() {
      try {
        setLoading(true)
        const data = await getProductsByGenderAndType(gender, type)
        setProducts(data)
      } catch (err) {
        setError(err)
      } finally {
        setLoading(false)
      }
    }

    if (gender) {
      loadProducts()
    }
  }, [gender, type])

  return { products, loading, error }
}
