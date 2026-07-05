import {startupProjects} from '../data/startupProjects'

const getStartupHref = (startup) => {
  if (startup.href) return startup.href
  if (startup.url) return startup.url
  if (startup.slug) return `/startups#${startup.slug}`

  return '/startups'
}

const getStartupDescription = (startup) => {
  return startup.summary || startup.tagline || startup.description || startup.category || ''
}

const getStartupRank = (startup) => {
  return Number(startup.viewCount || startup.views || startup.visits || 0)
}

const getStartupDate = (startup) => {
  if (!startup.createdAt) return 0

  if (typeof startup.createdAt?.toDate === 'function') {
    return startup.createdAt.toDate().getTime()
  }

  return new Date(startup.createdAt).getTime() || 0
}

const isVisibleStartup = (startup) => {
  const status = String(startup.status || '').toLowerCase()

  if (startup.published === false) return false
  if (!status) return true

  return !['draft', 'private', 'archived', 'inactive'].includes(status)
}

const normalizeStartup = (startup) => ({
  name: startup.name || startup.title || 'Untitled startup',
  title: startup.title || startup.name || 'Untitled startup',
  href: getStartupHref(startup),
  description: getStartupDescription(startup),
  category: startup.category || startup.status || 'Startup',
  icon: startup.logo || startup.icon || '',
  viewCount: getStartupRank(startup),
  createdAt: getStartupDate(startup)
})

export const getFeaturedStartups = async (limit = 5) => {
  // TODO: Replace this local source with a Firestore read when this project adds Firebase client setup.
  return startupProjects
    .filter(isVisibleStartup)
    .map(normalizeStartup)
    .sort((a, b) => {
      if (b.viewCount !== a.viewCount) return b.viewCount - a.viewCount

      return b.createdAt - a.createdAt
    })
    .slice(0, limit)
}

export const getStartupSearchItems = async () => {
  const startups = await getFeaturedStartups(20)

  return startups.map((startup) => ({
    title: startup.title,
    type: 'Startup',
    description: startup.description,
    href: startup.href
  }))
}

