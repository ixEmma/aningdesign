import { serviceRoutePaths } from './servicePages'

export const prerenderCandidateRoutes = [
  '/',
  ...serviceRoutePaths,
  '/pricing',
  '/books',
  '/books/client-ready-wordpress-website-blueprint',
  '/blog/website-launch-checklist',
  '/blog/wordpress-website-checklist',
  '/blog/website-design-checklist-for-clients',
  '/blog/plan-wordpress-website-redesign',
  '/blog/wordpress-website-launch-checklist',
  '/startups',
  '/contact'
]

export const firstMarketingRoutesToPrerender = prerenderCandidateRoutes
