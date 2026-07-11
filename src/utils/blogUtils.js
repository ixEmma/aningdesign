const blogPostFiles = import.meta.glob('../content/blog/**/*.md', {
  query: '?raw',
  import: 'default',
  eager: true
})

const parseValue = (value) => {
  const trimmedValue = value.trim()

  if (trimmedValue === 'true') return true
  if (trimmedValue === 'false') return false
  if (
    (trimmedValue.startsWith('"') && trimmedValue.endsWith('"')) ||
    (trimmedValue.startsWith("'") && trimmedValue.endsWith("'"))
  ) {
    return trimmedValue.slice(1, -1)
  }

  return trimmedValue
}

const parseFrontmatter = (raw) => {
  if (!raw.startsWith('---')) {
    return { data: {}, content: raw }
  }

  const endIndex = raw.indexOf('\n---', 3)
  if (endIndex === -1) {
    return { data: {}, content: raw }
  }

  const frontmatter = raw.slice(3, endIndex).trim().split('\n')
  const content = raw.slice(endIndex + 4).trim()
  const data = {}
  let currentKey = ''

  frontmatter.forEach((line) => {
    const trimmedLine = line.trim()

    if (!trimmedLine) return

    if (trimmedLine.startsWith('- ') && currentKey) {
      data[currentKey] = [...(data[currentKey] || []), parseValue(trimmedLine.slice(2))]
      return
    }

    const separatorIndex = trimmedLine.indexOf(':')
    if (separatorIndex === -1) return

    const key = trimmedLine.slice(0, separatorIndex).trim()
    const value = trimmedLine.slice(separatorIndex + 1).trim()

    currentKey = key
    data[key] = value ? parseValue(value) : []
  })

  return { data, content }
}

const toArray = (value) => {
  if (Array.isArray(value)) return value.filter(Boolean)
  if (!value) return []

  return [value]
}

const inferPostType = (data) => {
  if (data.type) return data.type
  if (data.youtubeEmbedUrl) return 'youtube'

  const category = String(data.category || '').toLowerCase()
  const tags = toArray(data.tags).map((tag) => String(tag).toLowerCase())

  if (category.includes('tutorial') || tags.some((tag) => tag.includes('tutorial'))) {
    return 'tutorial'
  }

  return 'seo'
}

const normalizePost = ([path, raw]) => {
  const { data, content } = parseFrontmatter(raw)
  const slug = data.slug || path.split('/').pop().replace('.md', '')
  const type = inferPostType(data)

  return {
    title: data.title || 'Untitled Tutorial',
    seoTitle: data.seoTitle || '',
    description: data.description || '',
    category: data.category || 'Tutorials',
    date: data.date || '',
    slug,
    type,
    primaryKeyword: data.primaryKeyword || '',
    keywordCluster: toArray(data.keywordCluster),
    servicePage: data.servicePage || '',
    relatedService: data.relatedService || '',
    productPage: data.productPage || '',
    productCtaText: data.productCtaText || '',
    productCtaLabel: data.productCtaLabel || '',
    youtubeUrl: data.youtubeUrl || '',
    youtubeEmbedUrl: data.youtubeEmbedUrl || '',
    youtubeVideoId: data.youtubeVideoId || '',
    toolsUsed: toArray(data.toolsUsed),
    thumbnail: data.thumbnail || '',
    thumbnailAlt: data.thumbnailAlt || '',
    imageCredit: data.imageCredit || '',
    imageCreditUrl: data.imageCreditUrl || '',
    tags: toArray(data.tags),
    relatedPosts: toArray(data.relatedPosts),
    featured: Boolean(data.featured),
    content
  }
}

export const blogPosts = Object.entries(blogPostFiles)
  .map(normalizePost)
  .sort((a, b) => new Date(b.date) - new Date(a.date))

export const getAllPosts = () => blogPosts

export const getLatestPosts = (limit = 3) => blogPosts.slice(0, limit)

export const getPostBySlug = (slug) => blogPosts.find((post) => post.slug === slug)

export const getRelatedPosts = (post, limit = 3) => {
  if (!post) return []

  if (post.relatedPosts.length > 0) {
    return post.relatedPosts
      .map((slug) => getPostBySlug(slug))
      .filter(Boolean)
      .filter((relatedPost) => relatedPost.slug !== post.slug)
      .slice(0, limit)
  }

  const postTags = new Set(post.tags.map((tag) => String(tag).toLowerCase()))
  const postKeywords = new Set([
    post.primaryKeyword,
    ...post.keywordCluster
  ].map((keyword) => String(keyword).toLowerCase()).filter(Boolean))

  return blogPosts
    .filter((candidate) => candidate.slug !== post.slug)
    .map((candidate) => {
      const sharedTags = candidate.tags.filter((tag) => postTags.has(String(tag).toLowerCase()))
      const candidateKeywords = [
        candidate.primaryKeyword,
        ...candidate.keywordCluster
      ].map((keyword) => String(keyword).toLowerCase()).filter(Boolean)
      const sharedKeywords = candidateKeywords.filter((keyword) => postKeywords.has(keyword))

      let score = 0

      if (candidate.category === post.category) score += 4
      if (candidate.type === post.type) score += 1
      if (post.servicePage && candidate.servicePage === post.servicePage) score += 8
      if (post.relatedService && candidate.relatedService === post.relatedService) score += 5
      score += sharedTags.length * 2
      score += sharedKeywords.length

      return { post: candidate, score }
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score

      return new Date(b.post.date) - new Date(a.post.date)
    })
    .slice(0, limit)
    .map(({ post: relatedPost }) => relatedPost)
}

export const getCategories = () => {
  return ['All', ...new Set(blogPosts.map((post) => post.category))]
}

export const formatPostDate = (date) => {
  if (!date) return ''

  return new Intl.DateTimeFormat('en', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  }).format(new Date(date))
}
