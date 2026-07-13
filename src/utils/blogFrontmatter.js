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

export const parseFrontmatter = (raw) => {
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

export const normalizePostMetadata = ({ sourcePath, raw }) => {
  const { data } = parseFrontmatter(raw)
  const fileName = sourcePath.split('/').pop() || ''
  const slug = data.slug || fileName.replace('.md', '')

  return {
    title: data.title || 'Untitled Tutorial',
    seoTitle: data.seoTitle || '',
    description: data.description || '',
    category: data.category || 'Tutorials',
    date: data.date || '',
    slug,
    type: inferPostType(data),
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
    isFreeResource: Boolean(data.isFreeResource),
    resourceType: data.resourceType || '',
    resourceLabel: data.resourceLabel || '',
    resourceCategory: data.resourceCategory || '',
    promptTitle: data.promptTitle || '',
    promptBestFor: data.promptBestFor || '',
    canonicalPath: data.canonicalPath || `/blog/${slug}`,
    sourcePath
  }
}
