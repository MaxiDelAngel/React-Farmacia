import { BrowserRouter, Routes, Route } from 'react-router'
import { SideBar } from './components'
import { Dashboard, Inventario } from './pages'

import './App.css'

function App() {
  return (
    <BrowserRouter>
      <main className="main">
        <SideBar />
        <div className="contenedor">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/inventory" element={<Inventario />} />
          </Routes>
        </div>
      </main>
    </BrowserRouter>
  )
}

export default App