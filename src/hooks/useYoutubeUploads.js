import { useEffect, useMemo, useState } from 'react'

const YOUTUBE_API_BASE = 'https://www.googleapis.com/youtube/v3'
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
    const cached = JSON.parse(sessionStorage.getItem(CACHE_KEY))

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

const fetchJson = async (url, signal) => {
  const response = await fetch(url, { signal })
  const payload = await response.json()

  if (!response.ok) {
    throw new Error(payload?.error?.message || 'Unable to load YouTube videos.')
  }

  return payload
}

export function useYoutubeUploads() {
  const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY
  const channelId = import.meta.env.VITE_YOUTUBE_CHANNEL_ID
  const [videos, setVideos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const configReady = useMemo(() => Boolean(apiKey && channelId), [apiKey, channelId])

  useEffect(() => {
    if (!configReady) {
      setLoading(false)
      setError('YouTube showcase is waiting for channel configuration.')
      return
    }

    const cachedVideos = readCache(apiKey, channelId)

    if (cachedVideos) {
      setVideos(cachedVideos)
      setLoading(false)
      setError('')
      return
    }

    const controller = new AbortController()

    const loadUploads = async () => {
      setLoading(true)
      setError('')

      try {
        const channelUrl = new URL(`${YOUTUBE_API_BASE}/channels`)
        channelUrl.search = new URLSearchParams({
          part: 'contentDetails',
          id: channelId,
          key: apiKey
        })

        const channelData = await fetchJson(channelUrl, controller.signal)
        const uploadsPlaylistId = channelData.items?.[0]?.contentDetails?.relatedPlaylists?.uploads

        if (!uploadsPlaylistId) {
          throw new Error('No uploads playlist was found for this channel.')
        }

        const playlistUrl = new URL(`${YOUTUBE_API_BASE}/playlistItems`)
        playlistUrl.search = new URLSearchParams({
          part: 'snippet,contentDetails',
          playlistId: uploadsPlaylistId,
          maxResults: String(MAX_RESULTS),
          key: apiKey
        })

        const playlistData = await fetchJson(playlistUrl, controller.signal)
        const uploadedItems = playlistData.items || []
        const videoIds = uploadedItems
          .map((item) => item.contentDetails?.videoId)
          .filter(Boolean)

        if (!videoIds.length) {
          setVideos([])
          setLoading(false)
          return
        }

        const videosUrl = new URL(`${YOUTUBE_API_BASE}/videos`)
        videosUrl.search = new URLSearchParams({
          part: 'snippet,contentDetails',
          id: videoIds.join(','),
          key: apiKey
        })

        const videoDetails = await fetchJson(videosUrl, controller.signal)
        const detailMap = new Map((videoDetails.items || []).map((video) => [video.id, video]))

        const normalizedVideos = videoIds
          .map((id) => {
            const details = detailMap.get(id)
            const snippet = details?.snippet

            if (!snippet) {
              return null
            }

            return {
              id,
              title: snippet.title,
              description: snippet.description,
              duration: formatDuration(details.contentDetails?.duration),
              thumbnail: getThumbnail(snippet.thumbnails, id),
              videoUrl: `https://www.youtube.com/watch?v=${id}`,
              publishedAt: snippet.publishedAt
            }
          })
          .filter(Boolean)

        setVideos(normalizedVideos)
        writeCache(apiKey, channelId, normalizedVideos)
      } catch (loadError) {
        if (loadError.name !== 'AbortError') {
          setError(loadError.message || 'Unable to load YouTube videos.')
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      }
    }

    loadUploads()

    return () => controller.abort()
  }, [apiKey, channelId, configReady])

  return { videos, loading, error }
}
