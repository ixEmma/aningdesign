import ServicePageTemplate from '../components/services/ServicePageTemplate'
import { servicesIndexPage } from '../data/servicePages'
import { getDomain } from '../utils/domain'
import { useSeo } from '../utils/seo'

function ServicesPage() {
  useSeo({
    title: servicesIndexPage.seoTitle,
    description: servicesIndexPage.seoDescription,
    canonical: `${getDomain()}/services`,
    keywords: servicesIndexPage.keywords,
    type: 'website'
  })

  return <ServicePageTemplate service={servicesIndexPage} />
}

export default ServicesPage
