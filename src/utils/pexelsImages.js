export const searchPexelsImages = async (query, options = {}) => {
  const params = new URLSearchParams({
    query
  })

  if (options.perPage) {
    params.set('per_page', String(options.perPage))
  }

  const response = await fetch(`/api/pexels-search?${params.toString()}`)

  if (!response.ok) {
    throw new Error('Failed to fetch Pexels images')
  }

  return response.json()
}
