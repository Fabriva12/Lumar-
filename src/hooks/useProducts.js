import { useState, useEffect, useCallback } from 'react'
import { getProductsByGenderAndType } from '../services/productsService'

const PAGE_SIZE = 12

export function useProducts(gender, type) {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [error, setError] = useState(null)
  const [page, setPage] = useState(1)
  const [totalCount, setTotalCount] = useState(0)

  const hasMore = totalCount > products.length

  const reset = useCallback(() => {
    setProducts([])
    setPage(1)
    setTotalCount(0)
    setError(null)
    setLoading(true)
  }, [])

  useEffect(() => {
    async function loadProducts() {
      try {
        setLoading(true)
        const { data, count } = await getProductsByGenderAndType(gender, type, 1, PAGE_SIZE)
        setProducts(data)
        setTotalCount(count)
        setPage(1)
      } catch (err) {
        setError(err)
      } finally {
        setLoading(false)
      }
    }

    if (gender) {
      reset()
      loadProducts()
    }
  }, [gender, type, reset])

  const loadMore = useCallback(async () => {
    if (loadingMore || !hasMore) return

    try {
      setLoadingMore(true)
      const nextPage = page + 1
      const { data } = await getProductsByGenderAndType(gender, type, nextPage, PAGE_SIZE)
      setProducts((prev) => [...prev, ...data])
      setPage(nextPage)
    } catch (err) {
      setError(err)
    } finally {
      setLoadingMore(false)
    }
  }, [gender, type, page, loadingMore, hasMore])

  return { products, loading, loadingMore, error, hasMore, loadMore }
}
