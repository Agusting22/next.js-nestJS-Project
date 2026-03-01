export async function deleteProduct(id: number) {
  const baseUrl = 'http://localhost:4000/api/products'

  const response = await fetch(`${baseUrl}/${id}`, {
    method: 'DELETE',
  })

  if (!response.ok) {
    throw new Error('Error al eliminar el producto')
  }

  return await response.json()
}