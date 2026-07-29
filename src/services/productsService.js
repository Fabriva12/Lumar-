// Importa el cliente de Supabase configurado
import { supabase } from './supabase'

/**
 * Obtiene productos filtrados por género desde la tabla 'products' de Supabase
 * @param {string} gender - 'hombre' o 'mujer'
 * @returns {Promise<Array>} - Lista de productos
 */
export async function getProductsByGender(gender) {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('gender', gender)
    .order('created_at', { ascending: false })
  
  if (error) {
    console.error('Error fetching products by gender:', error)
    throw error
  }
  
  return data || []
}

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
export async function getProductsByGenderAndType(gender, type, page = 1, pageSize = 12) {
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

  const { data, error, count } = await query.order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching products by gender and type:', error)
    throw error
  }

  return { data: data || [], count }
}

/**
 * Obtiene todos los productos (sin filtro de género)
 * @returns {Promise<Array>} - Lista completa de productos
 */
export async function getAllProducts() {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false })
  
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
