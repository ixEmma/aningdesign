const YOUTUBE_API_BASE = 'https://www.googleapis.com/youtube/v3'
const DEFAULT_TIMEOUT_MS = 12000

export const isValidEnvValue = (value) =>
  typeof value === 'string' && value.trim() !== '' && value.trim().toLowerCase() !== 'undefined'

export const validateYouTubeConfig = (apiKey, channelId) => ({
  apiKeyPresent: isValidEnvValue(apiKey),
  channelIdPresent: isValidEnvValue(channelId),
  ready: isValidEnvValue(apiKey) && isValidEnvValue(channelId)
})

export const buildYouTubeUrl = (endpoint, params = {}) => {
  const url = new URL(`${YOUTUBE_API_BASE}/${endpoint}`)
  url.search = new URLSearchParams(params)
  return url
}

const mergeAbortSignals = (signalA, signalB) => {
  if (!signalA) return signalB
  if (!signalB) return signalA

  const controller = new AbortController()
  const onAbort = () => controller.abort()

  if (signalA.aborted || signalB.aborted) {
    controller.abort()
  } else {
    signalA.addEventListener('abort', onAbort, { once: true })
    signalB.addEventListener('abort', onAbort, { once: true })
  }

  return controller.signal
}

export const fetchWithTimeout = async (url, signal, timeoutMs = DEFAULT_TIMEOUT_MS) => {
  const timeoutController = new AbortController()
  const timeoutId = window.setTimeout(() => timeoutController.abort(), timeoutMs)
  const combinedSignal = mergeAbortSignals(signal, timeoutController.signal)

  try {
    const response = await fetch(url.toString(), { signal: combinedSignal })
    return response
  } finally {
    window.clearTimeout(timeoutId)
  }
}

const parseResponse = async (response) => {
  const text = await response.text()
  if (!text) {
    return {}
  }

  try {
    return JSON.parse(text)
  } catch {
    return { parseError: true, rawText: text }
  }
}

const getYouTubeErrorMessage = (payload, fallback) => {
  const reason = payload?.error?.errors?.[0]?.reason
  const message = payload?.error?.message || payload?.message || fallback

  if (reason === 'keyInvalid' || reason === 'apiKeyInvalid') {
    return 'Invalid YouTube API key. Confirm VITE_YOUTUBE_API_KEY is valid.'
  }

  if (reason === 'dailyLimitExceeded' || reason === 'quotaExceeded') {
    return 'YouTube API quota exceeded. Please review your API usage.'
  }

  if (reason === 'forbidden' || reason === 'permissionDenied') {
    return 'YouTube API request forbidden. Check referrer restrictions and allowed sites.'
  }

  if (reason === 'accessNotConfigured') {
    return 'YouTube API access is not configured for this project.'
  }

  if (reason === 'notFound') {
    return 'YouTube resource not found. Confirm the channel ID is valid.'
  }

  return message || fallback
}

export const fetchYouTubeJson = async (url, signal) => {
  const response = await fetchWithTimeout(url, signal)
  const payload = await parseResponse(response)

  if (!response.ok) {
    const message = getYouTubeErrorMessage(payload, `YouTube API request failed with status ${response.status}.`)
    const error = new Error(message)
    error.payload = payload
    throw error
  }

  if (!payload || typeof payload !== 'object') {
    throw new Error('Malformed YouTube API response.')
  }

  return payload
}
