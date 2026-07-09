const PEXELS_SEARCH_URL = 'https://api.pexels.com/v1/search'
const DEFAULT_PER_PAGE = 12
const MAX_PER_PAGE = 30

const getQueryValue = (value) => {
  if (Array.isArray(value)) return value[0] || ''
  return value || ''
}

const parsePerPage = (value) => {
  const parsedValue = Number.parseInt(getQueryValue(value), 10)

  if (Number.isNaN(parsedValue)) {
    return DEFAULT_PER_PAGE
  }

  return Math.min(Math.max(parsedValue, 1), MAX_PER_PAGE)
}

const normalizePhoto = (photo) => ({
  id: photo.id,
  photographer: photo.photographer,
  photographer_url: photo.photographer_url,
  alt: photo.alt || '',
  src: {
    medium: photo.src?.medium || '',
    large: photo.src?.large || '',
    landscape: photo.src?.landscape || ''
  },
  url: photo.url
})

const sendJson = (response, statusCode, payload) => {
  response.statusCode = statusCode
  response.setHeader('Content-Type', 'application/json')
  response.end(JSON.stringify(payload))
}

module.exports = async function handler(request, response) {
  if (request.method !== 'GET') {
    response.setHeader('Allow', 'GET')
    sendJson(response, 405, {error: 'Method not allowed'})
    return
  }

  const query = getQueryValue(request.query?.query).trim()

  if (!query) {
    sendJson(response, 400, {error: 'Missing query parameter'})
    return
  }

  const apiKey = process.env.PEXELS_API_KEY

  if (!apiKey) {
    sendJson(response, 500, {error: 'Pexels API key is not configured'})
    return
  }

  const searchParams = new URLSearchParams({
    query,
    per_page: String(parsePerPage(request.query?.per_page))
  })

  try {
    const pexelsResponse = await fetch(`${PEXELS_SEARCH_URL}?${searchParams.toString()}`, {
      headers: {
        Authorization: apiKey
      }
    })

    const payload = await pexelsResponse.json().catch(() => ({}))

    if (!pexelsResponse.ok) {
      sendJson(response, pexelsResponse.status, {
        error: payload?.error || 'Pexels image search failed'
      })
      return
    }

    const photos = Array.isArray(payload.photos) ? payload.photos.map(normalizePhoto) : []

    response.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=86400')
    sendJson(response, 200, {photos})
  } catch {
    sendJson(response, 502, {error: 'Unable to reach Pexels image search'})
  }
}
