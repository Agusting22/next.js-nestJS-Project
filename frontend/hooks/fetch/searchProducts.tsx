'use client'

import { useState, useCallback } from 'react'
import { getProducts } from '@/lib/api/product/getAll.Product'

export interface Product {
  id: number
  name: string
  description?: string
  price: number
  priceHistory?: number
  discount: number
  image?: string
  isInternational: boolean
  countryOfOrigin?: string
  arrivesTomorrow: boolean
  isFlash: boolean
  installments?: number
  installmentAmount?: number
  createdAt: string
  updatedAt: string
  provider?: string
}

export function useSearchProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const searchProducts = useCallback(async (searchText: string) => {
    setIsLoading(true)
    setError(null)
    
    try {
      const data = await getProducts(searchText)
      setProducts(data)
      return data
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al buscar productos'
      setError(errorMessage)
      setProducts([])
      throw err
    } finally {
      setIsLoading(false)
    }
  }, [])

  const getAllProductsData = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    
    try {
      const data = await getProducts()
      setProducts(data)
      return data
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al cargar productos'
      setError(errorMessage)
      setProducts([])
      throw err
    } finally {
      setIsLoading(false)
    }
  }, [])

  return {
    products,
    isLoading,
    error,
    searchProducts,
    getAllProductsData,
  }
}