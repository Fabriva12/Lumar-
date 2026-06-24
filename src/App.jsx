import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import HomePage from './pages/HomePage'
import HombresPage from './pages/HombresPage'
import MujeresPage from './pages/MujeresPage'
import ProductDetailPage from './pages/ProductDetailPage'
import SearchResultsPage from './pages/SearchResultsPage'

function PublicLayout() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/hombres" element={<HombresPage />} />
          <Route path="/hombres/:tipo" element={<HombresPage />} />
          <Route path="/mujeres" element={<MujeresPage />} />
          <Route path="/mujeres/:tipo" element={<MujeresPage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="/buscar" element={<SearchResultsPage />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
