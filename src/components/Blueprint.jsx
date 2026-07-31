import { ArrowRight } from 'lucide-react'
import { SiteLink } from './SiteLink'
import './Blueprint.css'

const homepageServices = [
  {
    number: '01',
    title: 'Strategic Business Websites',
    audience:
      'For service businesses, professionals and growing organizations that need stronger credibility and clearer customer journeys.',
    description:
      'I plan, design and develop responsive WordPress websites that clarify the offer, organize content and guide visitors toward meaningful action.',
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
    audience:
      'For businesses with websites that feel outdated, load slowly, communicate poorly or are difficult to maintain.',
    description:
      'I audit the current experience, restructure important pages and improve design, usability, responsiveness and technical delivery.',
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
    audience:
      'For founders and organizations developing portals, dashboards, platforms and early-stage web products.',
    description:
      'I turn product requirements into structured user flows, interface systems and working web experiences using practical modern technology.',
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

function ServiceRow({ service }) {
  return (
    <article className="homepage-service">
      <span className="homepage-service__number type-small" aria-hidden="true">
        {service.number}
      </span>

      <div className="homepage-service__content">
        <h3 className="homepage-service__title type-h3">{service.title}</h3>

        <div className="homepage-service__body">
          <div className="homepage-service__primary">
            <p className="homepage-service__audience type-body">{service.audience}</p>
            <p className="homepage-service__description type-body">{service.description}</p>
          </div>

          <div className="homepage-service__supporting">
            <p className="homepage-service__label type-eyebrow">Selected scope</p>
            <ul className="homepage-service__scope type-body">
              {service.scope.map((item) => (
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
        </div>
      </div>
    </article>
  )
}

function HomepageServices() {
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
          {homepageServices.map((service) => (
            <ServiceRow service={service} key={service.number} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default HomepageServices
