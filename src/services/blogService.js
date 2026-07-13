import {fallbackBlogTopics} from '../data/navigationConfig'
import { getAllPosts } from '../utils/blogUtils'

export const getBlogTopics = (limit = 8) => {
  return fallbackBlogTopics.slice(0, limit)
}

export const getBlogSearchItems = () => {
  const topicItems = fallbackBlogTopics.map((topic) => ({
    title: `${topic} tutorials`,
    type: 'Blog',
    description: `Browse ${topic.toLowerCase()} guides and tutorials.`,
    href: '/blog'
  }))

  const postItems = getAllPosts().map((post) => ({
    title: post.title,
    type: post.resourceLabel || 'Blog',
    description: [post.description, post.resourceCategory, ...(post.tags || [])].filter(Boolean).join(' '),
    href: post.canonicalPath || `/blog/${post.slug}`
  }))

  return [...postItems, ...topicItems]
}
