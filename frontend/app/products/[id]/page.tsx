'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import Swal from 'sweetalert2'
import { deleteProduct } from '@/lib/api/product/delete.Product'
import type { Product } from '@/app/types/Product'

export default function ProductDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [product, setProduct] = useState<Product | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setIsLoading(true)
        const response = await fetch(`http://localhost:4000/api/products/${params.id}`)
        
        if (!response.ok) {
          throw new Error('Producto no encontrado')
        }
        
        const data = await response.json()
        setProduct(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error al cargar el producto')
      } finally {
        setIsLoading(false)
      }
    }

    if (params.id) {
      fetchProduct()
    }
  }, [params.id])

  const handleDelete = async () => {
    if (!product) return
    const result = await Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará el producto permanentemente.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    })

    if (result.isConfirmed) {
      setDeleting(true)
      try {
        await deleteProduct(product.id)
        await Swal.fire('Eliminado', 'El producto fue eliminado exitosamente.', 'success')
        router.push('/products/searched')
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error al eliminar el producto')
        await Swal.fire('Error', 'No se pudo eliminar el producto.', 'error')
      } finally {
        setDeleting(false)
      }
    }
  }

  if (isLoading) {
    return (
      <div className="detail-container">
        <p className="loading">Cargando producto...</p>
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="detail-container">
        <p className="error">{error || 'Producto no encontrado'}</p>
        <Link href="/products/searched" className="back-link">
          ← Volver a productos
        </Link>
      </div>
    )
  }

  return (
    <div className="detail-container">
      <Link href="/products/searched" className="back-link">
        ← Volver a productos
      </Link>

      <div className="product-detail">
        {/* Imagen del producto */}
        <div className="product-detail-image">
          <Image
            src={product.image || '/placeholder.png'}
            alt={product.name}
            fill
            className="image"
            priority
          />
        </div>

        {/* Información del producto */}
        <div className="product-detail-info">
          <div className="product-badges">
            <Image
              src="/original.png"
              alt="Producto Original"
              width={20}
              height={20}
            />
          </div>

          <h1 className="product-detail-title">{product.name}</h1>

          <div className="product-detail-price">
            <span className="price">${product.price.toFixed(2)}</span>
          </div>

          <div className="shipping-info">
            <Image
              src="/icon_rayo.png"
              alt="Envío rápido"
              width={20}
              height={20}
            />
            <span>Envío gratis</span>
          </div>

          {product.description && (
            <div className="product-detail-description">
              <h2>Descripción</h2>
              <p>{product.description}</p>
            </div>
          )}

          <div className="product-actions">
            <button className="btn-buy">Comprar ahora</button>
            <button className="btn-cart">Agregar al carrito</button>
            <button
              className="btn-delete"
              onClick={handleDelete}
              disabled={deleting}
              style={{ background: '#ef4444', color: '#fff', marginLeft: '1rem' }}
            >
              {deleting ? 'Eliminando...' : 'Eliminar'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}