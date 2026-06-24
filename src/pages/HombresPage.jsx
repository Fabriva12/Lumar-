import { useParams } from 'react-router-dom'
import CatalogPage from '../components/catalog/CatalogPage'
import { PRODUCT_TYPES } from '../types'

function HombresPage() {
  const { tipo } = useParams()
  const validType = tipo && PRODUCT_TYPES.some((t) => t.value === tipo) ? tipo : undefined
  return <CatalogPage gender="hombre" type={validType} />
}

export default HombresPage
