import {fallbackBlogTopics} from '../data/navigationConfig'
import {getAllPosts, getCategories} from '../utils/blogUtils'

export const getBlogTopics = (limit = 8) => {
  const categories = getCategories()
    .filter((category) => category !== 'All')
    .filter(Boolean)

  const topics = categories.length > 0 ? categories : fallbackBlogTopics

  return topics.slice(0, limit)
}

export const getBlogSearchItems = () => {
  return getAllPosts().map((post) => ({
    title: post.title,
    type: 'Blog',
    description: post.description || post.category,
    href: `/blog/${post.slug}`
  }))
}

