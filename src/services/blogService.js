import {fallbackBlogTopics} from '../data/navigationConfig'

export const getBlogTopics = (limit = 8) => {
  return fallbackBlogTopics.slice(0, limit)
}

export const getBlogSearchItems = () => {
  return fallbackBlogTopics.map((topic) => ({
    title: `${topic} tutorials`,
    type: 'Blog',
    description: `Browse ${topic.toLowerCase()} guides and tutorials.`,
    href: '/blog'
  }))
}
