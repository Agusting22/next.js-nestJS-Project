'use client'

import { useState } from 'react'
import { createProduct } from '@/lib/api/product/create.Product'

interface ProductFormProps {
  onClose: () => void
}

export default function ProductForm({ onClose }: ProductFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    priceHistory: '',
    discount: '',
    image: '',
    isInternational: false,
    countryOfOrigin: '',
    arrivesTomorrow: false,
    isFlash: false,
    installments: '',
    provider: '', // Nuevo campo
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      await createProduct({
        name: formData.name,
        description: formData.description || undefined,
        price: parseFloat(formData.price),
        priceHistory: formData.priceHistory ? parseFloat(formData.priceHistory) : undefined,
        discount: formData.discount ? parseFloat(formData.discount) : undefined,
        image: formData.image || undefined,
        isInternational: formData.isInternational,
        countryOfOrigin: formData.isInternational && formData.countryOfOrigin ? formData.countryOfOrigin : undefined,
        arrivesTomorrow: formData.arrivesTomorrow,
        isFlash: formData.isFlash,
        installments: formData.installments ? parseInt(formData.installments) : undefined,
        provider: formData.provider, // Enviar proveedor
      })

      setFormData({
        name: '',
        description: '',
        price: '',
        priceHistory: '',
        discount: '',
        image: '',
        isInternational: false,
        countryOfOrigin: '',
        arrivesTomorrow: false,
        isFlash: false,
        installments: '',
        provider: '',
      })
      alert('Producto creado exitosamente!')
      onClose()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al crear el producto')
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox'
        ? (e.target as HTMLInputElement).checked
        : value,
    }))
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Crear Nuevo Producto</h2>
          <button className="btn-close" onClick={onClose}>×</button>
        </div>

        <form onSubmit={handleSubmit} className="product-form">
          <div className="form-group">
            <label htmlFor="name">Nombre *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Ej: Laptop Gamer"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Descripción</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              placeholder="Describe el producto..."
            />
          </div>

          <div className="form-group">
            <label htmlFor="price">Precio *</label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              step="0.01"
              min="0"
              placeholder="0.00"
            />
          </div>

          <div className="form-group">
            <label htmlFor="priceHistory">Precio Histórico</label>
            <input
              type="number"
              id="priceHistory"
              name="priceHistory"
              value={formData.priceHistory}
              onChange={handleChange}
              step="0.01"
              min="0"
              placeholder="0.00"
            />
          </div>

          <div className="form-group">
            <label htmlFor="discount">Descuento (%)</label>
            <input
              type="number"
              id="discount"
              name="discount"
              value={formData.discount}
              onChange={handleChange}
              step="0.01"
              min="0"
              max="100"
              placeholder="0"
            />
          </div>

          <div className="form-group">
            <label htmlFor="image">URL de la Imagen</label>
            <input
              type="url"
              id="image"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="https://ejemplo.com/imagen.jpg"
            />
          </div>

          <div className="form-group">
            <label>
              <input
                type="checkbox"
                name="isInternational"
                checked={formData.isInternational}
                onChange={handleChange}
              />
              ¿Es internacional?
            </label>
          </div>

          {formData.isInternational && (
            <div className="form-group">
              <label htmlFor="countryOfOrigin">País de origen</label>
              <input
                type="text"
                id="countryOfOrigin"
                name="countryOfOrigin"
                value={formData.countryOfOrigin}
                onChange={handleChange}
                placeholder="Ej: China"
              />
            </div>
          )}

          <div className="form-group">
            <label>
              <input
                type="checkbox"
                name="arrivesTomorrow"
                checked={formData.arrivesTomorrow}
                onChange={handleChange}
              />
              ¿Llega mañana?
            </label>
          </div>

          <div className="form-group">
            <label>
              <input
                type="checkbox"
                name="isFlash"
                checked={formData.isFlash}
                onChange={handleChange}
              />
              ¿Es oferta flash?
            </label>
          </div>

          <div className="form-group">
            <label htmlFor="installments">Cuotas</label>
            <input
              type="number"
              id="installments"
              name="installments"
              value={formData.installments}
              onChange={handleChange}
              min="0"
              placeholder="Ej: 3"
            />
          </div>

          <div className="form-group">
            <label htmlFor="provider">Proveedor *</label>
            <input
              type="text"
              id="provider"
              name="provider"
              value={formData.provider}
              onChange={handleChange}
              required
              placeholder="Ej: MercadoLibre"
            />
          </div>

          <div className="form-actions">
            <button type="button" onClick={onClose} className="btn-cancel">
              Cancelar
            </button>
            <button type="submit" disabled={isLoading} className="btn-submit">
              {isLoading ? 'Creando...' : 'Crear Producto'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}