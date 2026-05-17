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

const normalizePost = ([path, raw]) => {
  const { data, content } = parseFrontmatter(raw)
  const slug = data.slug || path.split('/').pop().replace('.md', '')

  return {
    title: data.title || 'Untitled Tutorial',
    description: data.description || '',
    category: data.category || 'Tutorials',
    date: data.date || '',
    slug,
    youtubeUrl: data.youtubeUrl || '',
    youtubeEmbedUrl: data.youtubeEmbedUrl || '',
    thumbnail: data.thumbnail || '',
    thumbnailAlt: data.thumbnailAlt || '',
    tags: data.tags || [],
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
