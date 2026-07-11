import { Navigate, useParams } from 'react-router-dom'
import ServicePageTemplate from '../components/services/ServicePageTemplate'
import { getServicePageBySlug, servicesIndexPage } from '../data/servicePages'
import { getDomain } from '../utils/domain'
import { useSeo } from '../utils/seo'

function ServiceDetailPage() {
  const { slug } = useParams()
  const service = getServicePageBySlug(slug)
  const seoService = service || servicesIndexPage

  useSeo({
    title: seoService.seoTitle,
    description: seoService.seoDescription,
    canonical: `${getDomain()}${seoService.path}`,
    keywords: seoService.keywords,
    type: 'website'
  })

  if (!service) {
    return <Navigate to="/services" replace />
  }

  return <ServicePageTemplate service={service} />
}

export default ServiceDetailPage
