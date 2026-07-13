import blogPostMetadata from 'virtual:blog-metadata'
import { parseFrontmatter } from './blogFrontmatter'

const blogPostLoaders = import.meta.glob('../content/blog/**/*.md', {
  query: '?raw',
  import: 'default'
})

const postLoadCache = new Map()

export const blogPosts = [...blogPostMetadata]
  .sort((a, b) => new Date(b.date) - new Date(a.date))

export const getAllPosts = () => blogPosts

export const getLatestPosts = (limit = 3) => blogPosts.slice(0, limit)

export const getFreeResourcePosts = (resourceType = '') => {
  return blogPosts.filter((post) => {
    if (!post.isFreeResource) return false

    return resourceType ? post.resourceType === resourceType : true
  })
}

export const getResourceCategories = (resourceType = '') => {
  const posts = getFreeResourcePosts(resourceType)

  return ['All', ...new Set(posts.map((post) => post.resourceCategory).filter(Boolean))]
}

export const filterPostsByArchiveCategory = (posts, category) => {
  if (category === 'All') return posts
  if (category === 'Free Resources') return posts.filter((post) => post.isFreeResource)
  if (category === 'Prompts') return posts.filter((post) => post.resourceType === 'prompt')

  return posts.filter((post) => post.category === category)
}

export const filterPostsBySearch = (posts, query) => {
  const normalizedQuery = String(query || '').trim().toLowerCase()

  if (!normalizedQuery) return posts

  return posts.filter((post) => {
    const searchableText = [
      post.title,
      post.description,
      post.category,
      post.primaryKeyword,
      post.resourceType,
      post.resourceLabel,
      post.resourceCategory,
      post.promptTitle,
      post.promptBestFor,
      ...(post.tags || []),
      ...(post.keywordCluster || []),
      ...(post.toolsUsed || [])
    ]
      .filter(Boolean)
      .join(' ')
      .toLowerCase()

    return normalizedQuery.split(/\s+/).every((term) => searchableText.includes(term))
  })
}

export const getPostBySlug = (slug) => blogPosts.find((post) => post.slug === slug)

export const loadPostBySlug = async (slug) => {
  const metadata = getPostBySlug(slug)
  if (!metadata) return null

  if (postLoadCache.has(slug)) {
    return postLoadCache.get(slug)
  }

  const loader = blogPostLoaders[metadata.sourcePath]
  if (!loader) {
    throw new Error(`No content loader found for blog post: ${slug}`)
  }

  const postPromise = loader()
    .then((raw) => {
      const { content } = parseFrontmatter(raw)

      return { ...metadata, content }
    })
    .catch((error) => {
      postLoadCache.delete(slug)
      throw error
    })

  postLoadCache.set(slug, postPromise)
  return postPromise
}

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
  const resourceCategories = blogPosts.some((post) => post.isFreeResource)
    ? ['Free Resources', ...(blogPosts.some((post) => post.resourceType === 'prompt') ? ['Prompts'] : [])]
    : []

  return ['All', ...resourceCategories, ...new Set(blogPosts.map((post) => post.category))]
}

export const formatPostDate = (date) => {
  if (!date) return ''

  return new Intl.DateTimeFormat('en', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  }).format(new Date(date))
}
