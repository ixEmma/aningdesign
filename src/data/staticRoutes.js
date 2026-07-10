import { serviceRoutePaths } from './servicePages'

export const prerenderCandidateRoutes = [
  '/',
  ...serviceRoutePaths,
  '/pricing',
  '/startups',
  '/contact'
]

export const firstMarketingRoutesToPrerender = prerenderCandidateRoutes
