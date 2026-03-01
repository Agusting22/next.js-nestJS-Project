export type Product = {
  id: number
  name: string
  description?: string | null
  price: number
  priceHistory?: number | null
  discount: number
  image?: string | null
  isInternational: boolean
  countryOfOrigin?: string | null
  arrivesTomorrow: boolean
  isFlash: boolean
  installments?: number | null
  installmentAmount?: number | null
  provider?: string | null
}