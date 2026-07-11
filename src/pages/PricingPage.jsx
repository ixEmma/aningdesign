import Services from '../components/Services'
import { getDomain } from '../utils/domain'
import { useSeo } from '../utils/seo'
import './PricingPage.css'

function PricingPage() {
  useSeo({
    title: 'Pricing | AningDesign',
    description:
      'View website design, graphic design, branding, and startup project pricing options from AningDesign.',
    canonical: `${getDomain()}/pricing`,
    keywords: 'AningDesign pricing, website design pricing, graphic design pricing, branding pricing, startup website pricing',
    type: 'website'
  })

  return (
    <main className="pricing-route-page">
      <section className="pricing-route-hero" aria-labelledby="pricing-route-title">
        <p>Pricing</p>
        <h1 id="pricing-route-title">Website and design pricing for clear project decisions.</h1>
        <p>
          Choose a starting point based on the type of support you need. Final pricing depends on
          scope, timeline, content, and required features.
        </p>
      </section>

      <Services />

      <section className="pricing-route-cta" aria-labelledby="pricing-route-cta-title">
        <div>
          <p>Not sure which package fits?</p>
          <h2 id="pricing-route-cta-title">
            Tell me what you are building, and I&apos;ll help you choose the best direction.
          </h2>
        </div>
        <div className="pricing-route-actions">
          <a href="/contact" className="pricing-route-button pricing-route-button-primary">Start a project</a>
          <a href="/services" className="pricing-route-button">View services</a>
        </div>
      </section>
    </main>
  )
}

export default PricingPage
