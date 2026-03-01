'use client'

import { useState } from 'react'
import ProductForm from '../components/form'

export default function HomePage() {
  const [showForm, setShowForm] = useState(false)

  return (
    <div className="app-container">
      <div className="app-container-content">
        <h1 className="app-container-title">Bienvenido MELI !</h1>
        <p className="app-container-description">Buscá productos en la barra superior O...</p>
        
        <button 
          onClick={() => setShowForm(true)}
          className="btn-create-product"
        >
          Creemos un nuevo Producto
        </button>
      </div>

      {showForm && (
        <ProductForm onClose={() => setShowForm(false)} />
      )}
    </div>
  )
}