import { useState, useEffect, useCallback, useRef } from 'react'
import { getProductsByGenderAndType } from '../services/productsService'

const PAGE_SIZE = 12

export function useProducts(gender, type, brand) {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [error, setError] = useState(null)
  const [page, setPage] = useState(1)
  const [totalCount, setTotalCount] = useState(0)

  const requestIdRef = useRef(0)

  const hasMore = totalCount > products.length

  const reset = useCallback(() => {
    setProducts([])
    setPage(1)
    setTotalCount(0)
    setError(null)
    setLoading(true)
  }, [])

  useEffect(() => {
    const requestId = ++requestIdRef.current
    let cancelled = false

    async function loadProducts() {
      try {
        setLoading(true)
        const { data, count } = await getProductsByGenderAndType(gender, type, 1, PAGE_SIZE, brand)
        if (cancelled || requestId !== requestIdRef.current) return
        setProducts(data)
        setTotalCount(count)
        setPage(1)
      } catch (err) {
        if (!cancelled && requestId === requestIdRef.current) setError(err)
      } finally {
        if (!cancelled && requestId === requestIdRef.current) setLoading(false)
      }
    }

    if (gender) {
      reset()
      loadProducts()
    }

    return () => {
      cancelled = true
    }
  }, [gender, type, brand, reset])

  const loadMore = useCallback(async () => {
    if (loadingMore || !hasMore) return

    const requestId = requestIdRef.current

    try {
      setLoadingMore(true)
      const nextPage = page + 1
      const { data } = await getProductsByGenderAndType(gender, type, nextPage, PAGE_SIZE, brand)
      if (requestId !== requestIdRef.current) return
      setProducts((prev) => [...prev, ...data])
      setPage(nextPage)
    } catch (err) {
      if (requestId === requestIdRef.current) setError(err)
    } finally {
      if (requestId === requestIdRef.current) setLoadingMore(false)
    }
  }, [gender, type, brand, page, loadingMore, hasMore])

  return { products, loading, loadingMore, error, hasMore, loadMore }
}