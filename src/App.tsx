import { BrowserRouter, Navigate, Route, Routes } from 'react-router'
import { SideBar } from './components'
import { Dashboard, Inventario } from './pages'

import './App.css'

function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <main className="main">
        <SideBar />
        <div className="contenedor">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/inventory" element={<Inventario />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </main>
    </BrowserRouter>
  )
}

export default App