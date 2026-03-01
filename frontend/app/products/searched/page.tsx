'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { useSearchProducts } from '@/hooks/fetch/searchProducts'
import Link from 'next/link'
import Image from 'next/image'
import '../../sass/pages/_searched.scss'

export default function ProductsPage() {
  const searchParams = useSearchParams()
  const searchQuery = searchParams.get('search')
  const { products, isLoading, error, searchProducts, getAllProductsData } = useSearchProducts()

  useEffect(() => {
    if (searchQuery) {
      searchProducts(searchQuery)
    } else {
      getAllProductsData()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery])

  if (isLoading) {
    return (
      <div className="products-container">
        <p className="loading">Cargando productos...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="products-container">
        <p className="error">{error}</p>
      </div>
    )
  }

  return (
    <div className="products-container">
      <h1 className="products-title">
        {searchQuery ? `Resultados para "${searchQuery}"` : 'Todos los productos'}
      </h1>
      
      {products.length === 0 ? (
        <p className="no-results">No se encontraron productos</p>
      ) : (
        <div className="product-list">
          {products.map((product) => (
            <Link 
              key={product.id} 
              href={`/products/${product.id}`}
              className="product-card"
            >
              <div className="product-image">
                <Image
                  src={product.image || '/placeholder.png'}
                  alt={product.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
              </div>
              
              <div className="product-info">
                <div>
                  <h2 className="product-title">
                    {product.name}
                  </h2>

                  {product.isInternational && (
                    <div className="product-badge-row product-badge-row-international">
                      <Image
                        src="/airplane_red_logo.png"
                        alt="Producto Internacional"
                        width={20}
                        height={20}
                        className="icon-international"
                      />
                        <span className='product-red'>Internacional</span>
                        <div>
                        <span className="badge-international-inline">
                          Envío desde {product.countryOfOrigin === 'Estados Unidos' ? 'USA' : product.countryOfOrigin}
                        </span>
                        </div>
                    </div>
                    )}
                    {product.provider && (
                      <div className="product-provider">
                      {product.provider}
                    <Image
                        src="/original.png"
                        alt="Producto Original"
                        width={16}
                        height={16}
                      />
                      </div>
                    )}
                  {product.priceHistory !== null && product.priceHistory !== undefined && (
                  <div className="product-price-history-line">
                    <span className="product-price-history">
                      <s>${product.priceHistory.toFixed(2)}</s>
                    </span>
                  </div> )}
                
                </div>
                
                <div className="product-footer">
                  <div className="product-prices">
                    {product.price !== undefined && (
                      <span className="product-price">
                        ${product.price.toFixed(2)}
                      </span>
                    )}
                    {product.discount !== undefined && product.discount > 0 && (
                      <span className="badge-discount">
                        -{product.discount}% OFF
                      </span>
                    )}
                  </div>
                  {product.installments !== undefined && product.installments > 1 && product.installmentAmount !== undefined && (
                    <div className="product-installments">
                      Mismo Precio en {product.installments} cuotas sin tarjeta de ${product.installmentAmount.toFixed(2)}
                    </div>
                  )}
                </div>
                {(product.isFlash || product.arrivesTomorrow) && (
                    <div className="product-badge-row">
                      {product.isFlash && (
                        <>
                          <Image
                            src="/icon_rayo.png"
                            alt="Envío rápido"
                            width={20}
                            height={20}
                            className="icon-rayo"
                          />
                          <span className="badge-full">FULL</span>
                        </>
                      )}
                      {product.arrivesTomorrow && (
                        <span className="badge-arrives-inline">Llega Gratis mañana</span>
                      )}
                    </div>
                  )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}