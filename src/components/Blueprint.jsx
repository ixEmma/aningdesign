import { ArrowRight } from 'lucide-react'
import { SiteLink } from './SiteLink'
import './Blueprint.css'

const homepageServices = [
  {
    number: '01',
    title: 'Strategic Business Websites',
    description:
      'Responsive WordPress websites with clear offers, service-page structure, and direct enquiry paths.',
    scope: [
      'Strategy and sitemap',
      'Conversion structure',
      'Responsive interface design',
      'WordPress development',
      'CMS handover'
    ],
    outcome:
      'A credible and manageable business website built around real customer and business needs.',
    actionLabel: 'Explore Business Websites',
    href: '/services/wordpress-websites'
  },
  {
    number: '02',
    title: 'Website Redesign and Performance',
    description:
      'Audit and improve website structure, usability, responsiveness, and technical delivery.',
    scope: [
      'Website and UX audit',
      'Page restructuring',
      'Visual redesign',
      'Mobile and accessibility',
      'Performance and SEO foundations'
    ],
    outcome:
      'A clearer, faster and more reliable website that better represents the business.',
    actionLabel: 'Explore Website Redesign',
    href: '/services/ai-wordpress-debugging'
  },
  {
    number: '03',
    title: 'Digital Products and MVPs',
    description:
      'Focused product design and React development for useful first releases.',
    scope: [
      'Product framing and flows',
      'Interface and dashboard design',
      'React frontend development',
      'Firebase integration',
      'Payments and account workflows'
    ],
    outcome:
      'A functional product foundation that can be tested, demonstrated and developed further.',
    actionLabel: 'Explore Digital Products',
    href: '/services/react-web-apps'
  }
]

function ServiceModule({ service, variant }) {
  const isLead = variant === 'lead'
  const capabilities = service.scope.slice(0, isLead ? 4 : 3)

  return (
    <article className={`homepage-service homepage-service--${variant}`}>
      <span className="homepage-service__number type-small" aria-hidden="true">
        {service.number}
      </span>

      <div className="homepage-service__content">
        <h3 className="homepage-service__title type-h3">{service.title}</h3>
        <p className="homepage-service__description type-body">{service.description}</p>

        <ul className="homepage-service__scope type-body" aria-label={`${service.title} key capabilities`}>
          {capabilities.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        <div className="homepage-service__outcome">
          <p className="homepage-service__label type-eyebrow">Outcome</p>
          <p className="type-body">{service.outcome}</p>
        </div>

        <SiteLink
          href={service.href}
          className="aning-button aning-button--text homepage-service__action"
          aria-label={`${service.actionLabel}: ${service.title}`}
        >
          {service.actionLabel}
          <ArrowRight size={18} strokeWidth={2.2} aria-hidden="true" />
        </SiteLink>
      </div>
    </article>
  )
}

function HomepageServices() {
  const [leadService, ...supportingServices] = homepageServices

  return (
    <section className="homepage-services" id="services" aria-labelledby="homepage-services-title">
      <div className="homepage-services__shell">
        <div className="homepage-services__intro">
          <p className="homepage-services__eyebrow type-eyebrow">Services</p>
          <h2 className="type-h2" id="homepage-services-title">
            Focused expertise for websites and digital products
          </h2>
          <p className="homepage-services__summary type-body-large">
            Three focused engagements for businesses that need a stronger website, a clearer
            digital experience or a practical product foundation.
          </p>
          <SiteLink
            href="/contact"
            className="aning-button aning-button--primary homepage-services__primary-action"
          >
            Start a Project
            <ArrowRight size={18} strokeWidth={2.2} aria-hidden="true" />
          </SiteLink>
        </div>

        <div className="homepage-services__list">
          <ServiceModule service={leadService} variant="lead" />
          <div className="homepage-services__supporting-grid">
            {supportingServices.map((service) => (
              <ServiceModule service={service} variant="supporting" key={service.number} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default HomepageServices
