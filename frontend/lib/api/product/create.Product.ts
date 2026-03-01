export async function createProduct(productData: {
  name: string
  description?: string
  price: number
  priceHistory?: number
  discount?: number
  image?: string
  isInternational?: boolean
  countryOfOrigin?: string
  arrivesTomorrow?: boolean
  isFlash?: boolean
  installments?: number
  provider?: string
}) {
  const baseUrl = 'http://localhost:4000/api/products'
  
  const response = await fetch(baseUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(productData),
  })

  if (!response.ok) {
    throw new Error('Error al crear el producto')
  }

  return await response.json()
}