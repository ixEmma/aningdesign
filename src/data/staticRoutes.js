import { serviceRoutePaths } from './servicePages'

export const prerenderCandidateRoutes = [
  '/',
  ...serviceRoutePaths,
  '/startups',
  '/contact'
]

export const firstMarketingRoutesToPrerender = prerenderCandidateRoutes
