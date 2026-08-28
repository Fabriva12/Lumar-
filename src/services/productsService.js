// Importa el cliente de Supabase configurado
import { supabase } from './supabase'

/**
 * Obtiene un producto específico por su ID
 * @param {string} id - UUID del producto
 * @returns {Promise<Object>} - Datos del producto
 */
export async function getProductById(id) {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single()
  
  if (error) {
    console.error('Error fetching product by id:', error)
    throw error
  }
  
  return data
}

/**
 * Obtiene productos filtrados por género y tipo (con paginación)
 * @param {string} gender - 'hombre' o 'mujer'
 * @param {string} [type] - 'perfume', 'reloj' o 'crema' (opcional)
 * @param {number} [page=1] - Número de página
 * @param {number} [pageSize=12] - Productos por página
 * @returns {Promise<{data: Array, count: number}>} - Lista de productos y total
 */
export async function getProductsByGenderAndType(gender, type, page = 1, pageSize = 12, brand) {
  const from = (page - 1) * pageSize
  const to = from + pageSize - 1

  let query = supabase
    .from('products')
    .select('*', { count: 'exact' })
    .eq('gender', gender)
    .range(from, to)

  if (type) {
    query = query.eq('type', type)
  }

  if (brand) {
    query = query.eq('brand', brand)
  }

  const { data, error, count } = await query.order('name', { ascending: true })

  if (error) {
    console.error('Error fetching products by gender and type:', error)
    throw error
  }

  return { data: data || [], count }
}

/**
 * Obtiene las marcas disponibles para un género y tipo
 * @param {string} gender - 'hombre' o 'mujer'
 * @param {string} [type] - 'perfume', 'reloj' o 'crema' (opcional)
 * @returns {Promise<Array>} - Lista de marcas únicas ordenadas alfabéticamente
 */
export async function getBrands(gender, type) {
  let query = supabase
    .from('products')
    .select('brand')
    .eq('gender', gender)

  if (type) {
    query = query.eq('type', type)
  }

  const { data, error } = await query

  if (error) {
    console.error('Error fetching brands:', error)
    throw error
  }

  const brands = [...new Set((data || []).map((p) => p.brand?.trim()).filter(Boolean))]
  return brands.sort((a, b) => a.localeCompare(b, 'es'))
}

/**
 * Obtiene todos los productos (sin filtro de género)
 * @returns {Promise<Array>} - Lista completa de productos
 */
export async function getAllProducts() {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('name', { ascending: true })
  
  if (error) {
    console.error('Error fetching all products:', error)
    throw error
  }
  
  return data || []
}

/**
 * Obtiene productos destacados para la página principal (máximo 6)
 * @returns {Promise<Array>} - Lista de productos destacados
 */
export async function getFeaturedProducts() {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('is_featured', true)
    .limit(8)
  
  if (error) {
    console.error('Error fetching featured products:', error)
    throw error
  }
  
  return data || []
}
