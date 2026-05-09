import { useEffect, useMemo, useState } from 'react'
import { buildYouTubeUrl, fetchYouTubeJson, validateYouTubeConfig } from './youtubeApi'

const CACHE_KEY = 'portfolio-youtube-uploads'
const CACHE_TTL = 1000 * 60 * 15
const MAX_RESULTS = 4

const formatDuration = (duration = '') => {
  const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/)

  if (!match) {
    return '0:00'
  }

  const hours = Number(match[1] || 0)
  const minutes = Number(match[2] || 0)
  const seconds = Number(match[3] || 0)
  const paddedSeconds = String(seconds).padStart(2, '0')

  if (hours > 0) {
    return `${hours}:${String(minutes).padStart(2, '0')}:${paddedSeconds}`
  }

  return `${minutes}:${paddedSeconds}`
}

const getThumbnail = (thumbnails = {}, videoId) => {
  return (
    thumbnails.maxres?.url ||
    thumbnails.standard?.url ||
    thumbnails.high?.url ||
    thumbnails.medium?.url ||
    thumbnails.default?.url ||
    `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`
  )
}

const readCache = (apiKey, channelId) => {
  try {
    const cachedValue = sessionStorage.getItem(CACHE_KEY)
    const cached = cachedValue ? JSON.parse(cachedValue) : null

    if (
      cached?.apiKey === apiKey &&
      cached?.channelId === channelId &&
      Date.now() - cached.timestamp < CACHE_TTL &&
      Array.isArray(cached.videos)
    ) {
      return cached.videos
    }
  } catch {
    return null
  }

  return null
}

const writeCache = (apiKey, channelId, videos) => {
  try {
    sessionStorage.setItem(
      CACHE_KEY,
      JSON.stringify({
        apiKey,
        channelId,
        videos,
        timestamp: Date.now()
      })
    )
  } catch {
    return null
  }

  return null
}

const normalizeVideo = (video) => {
  const snippet = video?.snippet
  const details = video?.contentDetails

  if (!video?.id || !snippet || !details) {
    return null
  }

  return {
    id: video.id,
    title: snippet.title || 'Untitled video',
    description: snippet.description || '',
    duration: formatDuration(details.duration),
    thumbnail: getThumbnail(snippet.thumbnails, video.id),
    videoUrl: `https://www.youtube.com/watch?v=${video.id}`,
    publishedAt: snippet.publishedAt || ''
  }
}

const getFallbackMessage = (message) =>
  message || 'Unable to load YouTube videos at this time. Please try again later.'

export function useYoutubeVideos() {
  const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY
  const channelId = import.meta.env.VITE_YOUTUBE_CHANNEL_ID

  const config = useMemo(() => validateYouTubeConfig(apiKey, channelId), [apiKey, channelId])
  const configReady = config.ready

  const [videos, setVideos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [debug, setDebug] = useState({
    mode: import.meta.env.MODE || 'production',
    apiKeyPresent: config.apiKeyPresent,
    channelIdPresent: config.channelIdPresent,
    status: configReady ? 'ready' : 'missing-config',
    videoCount: 0,
    lastError: ''
  })

  useEffect(() => {
    console.log('MODE:', import.meta.env.MODE)
    console.log('KEY:', apiKey)
    console.log('CHANNEL:', channelId)
    console.log('YOUTUBE CONFIG:', {
      apiKeyPresent: config.apiKeyPresent,
      channelIdPresent: config.channelIdPresent,
      ready: configReady
    })

    if (!configReady) {
      const fallback =
        'YouTube showcase is not configured for this environment. Please verify VITE_YOUTUBE_API_KEY and VITE_YOUTUBE_CHANNEL_ID.'
      setLoading(false)
      setError(fallback)
      setDebug((previous) => ({
        ...previous,
        status: 'missing-config',
        lastError: fallback,
        apiKeyPresent: config.apiKeyPresent,
        channelIdPresent: config.channelIdPresent,
        videoCount: 0
      }))
      return
    }

    const cachedVideos = readCache(apiKey, channelId)

    if (cachedVideos && cachedVideos.length) {
      setVideos(cachedVideos)
      setLoading(false)
      setError('')
      setDebug((previous) => ({
        ...previous,
        status: 'cached',
        videoCount: cachedVideos.length,
        lastError: ''
      }))
      return
    }

    const controller = new AbortController()

    const loadVideos = async () => {
      setLoading(true)
      setError('')
      setDebug((previous) => ({
        ...previous,
        status: 'fetching',
        lastError: '',
        videoCount: 0
      }))

      try {
        const channelUrl = buildYouTubeUrl('channels', {
          part: 'contentDetails',
          id: channelId,
          key: apiKey
        })

        setDebug((previous) => ({
          ...previous,
          status: 'fetching-channel',
          lastError: ''
        }))

        const channelData = await fetchYouTubeJson(channelUrl, controller.signal)
        const uploadsPlaylistId =
          channelData?.items?.[0]?.contentDetails?.relatedPlaylists?.uploads

        if (!uploadsPlaylistId) {
          throw new Error('No uploads playlist was found for this channel.')
        }

        const playlistUrl = buildYouTubeUrl('playlistItems', {
          part: 'snippet,contentDetails',
          playlistId: uploadsPlaylistId,
          maxResults: String(MAX_RESULTS),
          key: apiKey
        })

        setDebug((previous) => ({
          ...previous,
          status: 'fetching-playlist',
          lastError: ''
        }))

        const playlistData = await fetchYouTubeJson(playlistUrl, controller.signal)
        const uploadedItems = Array.isArray(playlistData.items) ? playlistData.items : []
        const videoIds = uploadedItems
          .map((item) => item?.contentDetails?.videoId)
          .filter(Boolean)

        if (videoIds.length === 0) {
          const emptyMessage = 'No videos were available from this YouTube channel.'
          setVideos([])
          setLoading(false)
          setError(emptyMessage)
          setDebug((previous) => ({
            ...previous,
            status: 'no-videos',
            lastError: emptyMessage,
            videoCount: 0
          }))
          return
        }

        const videosUrl = buildYouTubeUrl('videos', {
          part: 'snippet,contentDetails',
          id: videoIds.join(','),
          key: apiKey
        })

        setDebug((previous) => ({
          ...previous,
          status: 'fetching-videos',
          lastError: ''
        }))

        const videoDetails = await fetchYouTubeJson(videosUrl, controller.signal)
        const normalizedVideos = (Array.isArray(videoDetails.items) ? videoDetails.items : [])
          .map(normalizeVideo)
          .filter(Boolean)

        if (normalizedVideos.length === 0) {
          throw new Error('YouTube API returned malformed video data.')
        }

        setVideos(normalizedVideos)
        writeCache(apiKey, channelId, normalizedVideos)
        setDebug((previous) => ({
          ...previous,
          status: 'loaded',
          lastError: '',
          videoCount: normalizedVideos.length
        }))
      } catch (loadError) {
        if (controller.signal.aborted) {
          return
        }

        const message =
          loadError instanceof Error
            ? loadError.message
            : 'Unable to load YouTube videos.'

        console.error('YouTube API error:', message, loadError)
        setError(getFallbackMessage(message))
        setDebug((previous) => ({
          ...previous,
          status: 'error',
          lastError: message,
          videoCount: 0
        }))
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      }
    }

    loadVideos()

    return () => controller.abort()
  }, [apiKey, channelId, configReady])

  return { videos, loading, error, debug }
}
