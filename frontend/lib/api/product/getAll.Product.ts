export async function getProducts(searchText?: string) {
    const baseUrl = 'http://localhost:4000/api/products'
    const url = searchText 
        ? `${baseUrl}?search=${encodeURIComponent(searchText)}`
        : baseUrl
    
    const data = await fetch(url)
    return await data.json()
}