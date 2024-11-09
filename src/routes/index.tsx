import Layout from '../components/Layout'
import Home from '../pages/Home'
import About from '../pages/About'
import NotFound from '../pages/NotFound'
import { Routes, Route } from 'react-router-dom'

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
} 