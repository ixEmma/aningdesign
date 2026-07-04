import { useEffect } from 'react'
import { getDomain } from './domain'

const setMeta = (selector, attributes) => {
  let tag = document.head.querySelector(selector)

  if (!tag) {
    tag = document.createElement('meta')
    document.head.appendChild(tag)
  }

  Object.entries(attributes).forEach(([key, value]) => {
    tag.setAttribute(key, value)
  })
}

const setLink = (selector, attributes) => {
  let tag = document.head.querySelector(selector)

  if (!tag) {
    tag = document.createElement('link')
    document.head.appendChild(tag)
  }

  Object.entries(attributes).forEach(([key, value]) => {
    tag.setAttribute(key, value)
  })
}

export const useSeo = ({
  title,
  description,
  canonical,
  image,
  keywords,
  type = 'article',
  robots = 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1'
}) => {
  const defaultImage = image || `${getDomain()}/images/LOGO.png`
  
  useEffect(() => {
    document.title = title

    setMeta('meta[name="description"]', { name: 'description', content: description })
    setMeta('meta[name="robots"]', { name: 'robots', content: robots })
    if (keywords) {
      setMeta('meta[name="keywords"]', { name: 'keywords', content: keywords })
    }
    setLink('link[rel="canonical"]', { rel: 'canonical', href: canonical })
    setMeta('meta[property="og:title"]', { property: 'og:title', content: title })
    setMeta('meta[property="og:description"]', { property: 'og:description', content: description })
    setMeta('meta[property="og:url"]', { property: 'og:url', content: canonical })
    setMeta('meta[property="og:image"]', { property: 'og:image', content: defaultImage })
    setMeta('meta[property="og:type"]', { property: 'og:type', content: type })
    setMeta('meta[name="twitter:card"]', { name: 'twitter:card', content: 'summary_large_image' })
    setMeta('meta[name="twitter:title"]', { name: 'twitter:title', content: title })
    setMeta('meta[name="twitter:description"]', { name: 'twitter:description', content: description })
    setMeta('meta[name="twitter:image"]', { name: 'twitter:image', content: defaultImage })
  }, [title, description, canonical, defaultImage, keywords, type, robots])
}
