import { ArrowRight, CheckCircle2, HelpCircle, Link as LinkIcon } from 'lucide-react'
import { Link } from 'react-router-dom'
import { servicePages } from '../../data/servicePages'
import { getExternalLinkProps, isExternalLink } from '../../utils/links'
import './ServicePageTemplate.css'

function SmartServiceLink({ href, className = '', children, ariaLabel }) {
  if (!href) return null

  if (isExternalLink(href)) {
    return (
      <a href={href} className={className} aria-label={ariaLabel} {...getExternalLinkProps(href)}>
        {children}
      </a>
    )
  }

  return (
    <Link to={href} className={className} aria-label={ariaLabel}>
      {children}
    </Link>
  )
}

function ServiceSection({ id, kicker, title, children }) {
  return (
    <section className="service-page-section" aria-labelledby={id}>
      <div className="service-section-heading">
        <p className="service-section-kicker">{kicker}</p>
        <h2 id={id}>{title}</h2>
      </div>
      <div className="service-section-body">{children}</div>
    </section>
  )
}

function ServiceCtaBlock({ cta, id, className }) {
  if (!cta) return null

  return (
    <section className={className} aria-labelledby={id}>
      <h2 id={id}>{cta.heading}</h2>
      <p className="service-cta-text">{cta.text}</p>
      <div className="service-cta-actions">
        <SmartServiceLink href={cta.primaryHref} className="service-primary-action">
          {cta.primaryLabel}
          <ArrowRight size={17} strokeWidth={2.2} aria-hidden="true" />
        </SmartServiceLink>
        {cta.secondaryHref && (
          <SmartServiceLink href={cta.secondaryHref} className="service-inline-action">
            {cta.secondaryLabel}
            <ArrowRight size={15} strokeWidth={2.2} aria-hidden="true" />
          </SmartServiceLink>
        )}
      </div>
    </section>
  )
}

function ServiceIncludedItem({ item }) {
  if (typeof item === 'string') {
    return <span>{item}</span>
  }

  return (
    <span className="service-check-copy">
      <strong>{item.title}</strong>
      <span>{item.description}</span>
    </span>
  )
}

function RelatedServiceLinks({ service }) {
  const relatedServices = service.relatedServices
    .map((slug) => servicePages.find((item) => item.slug === slug))
    .filter(Boolean)

  if (!relatedServices.length) return null

  return (
    <div className="service-related-links" aria-label="Related service pages">
      {relatedServices.map((item) => (
        <SmartServiceLink key={item.slug} href={item.path}>
          {item.shortTitle}
          <ArrowRight size={14} strokeWidth={2.2} aria-hidden="true" />
        </SmartServiceLink>
      ))}
    </div>
  )
}

function ServiceDirectory({ service }) {
  return (
    <section className="service-directory" aria-labelledby="service-directory-title">
      <div className="service-section-heading service-directory-aside">
        <p className="service-section-kicker">Service pages</p>
        <h2 id="service-directory-title">Choose the service that matches your next move.</h2>
        {service.directoryIntro && <p className="service-directory-copy">{service.directoryIntro}</p>}
        {service.directoryHighlights && (
          <ul className="service-directory-highlights" aria-label="Service selection notes">
            {service.directoryHighlights.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        )}
      </div>
      <div className="service-directory-grid">
        {servicePages.map((service) => (
          <article className="service-directory-card" key={service.slug}>
            <h3>{service.title}</h3>
            <p>{service.cardDescription || service.intro}</p>
            <SmartServiceLink href={service.path} className="service-text-link">
              View service
              <ArrowRight size={15} strokeWidth={2.2} aria-hidden="true" />
            </SmartServiceLink>
          </article>
        ))}
      </div>
    </section>
  )
}

function ServiceUseCases({ service }) {
  if (!service.useCases?.length) return null

  return (
    <ServiceSection id="service-use-cases" kicker="Use cases" title={service.useCasesTitle || 'Common use cases'}>
      <div className="service-use-case-grid">
        {service.useCases.map((item) => (
          <article className="service-use-case-card" key={item.title}>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </article>
        ))}
      </div>
    </ServiceSection>
  )
}

function ServiceResources({ resources }) {
  if (!resources?.length) return null

  return (
    <ServiceSection id="service-resources" kicker="Resources" title="Plan the work before the build starts">
      <div className="service-resource-grid">
        {resources.map((resource) => (
          <article className="service-resource-card" key={resource.href}>
            <h3>{resource.title}</h3>
            <p>{resource.description}</p>
            <SmartServiceLink href={resource.href} className="service-text-link">
              {resource.label || 'Read resource'}
              <ArrowRight size={15} strokeWidth={2.2} aria-hidden="true" />
            </SmartServiceLink>
          </article>
        ))}
      </div>
    </ServiceSection>
  )
}

function ServiceContentSections({ service }) {
  if (!service.contentSections?.length) return null

  return service.contentSections.map((section, index) => (
    <ServiceSection
      key={section.title}
      id={section.id || `service-content-${index + 1}`}
      kicker={section.kicker || 'Details'}
      title={section.title}
    >
      {section.body && (
        Array.isArray(section.body)
          ? section.body.map((paragraph) => (
            <p className="service-lead" key={paragraph}>{paragraph}</p>
          ))
          : <p className="service-lead">{section.body}</p>
      )}
      {section.items?.length > 0 && (
        <ul className="service-check-grid">
          {section.items.map((item) => (
            <li key={typeof item === 'string' ? item : item.title}>
              <CheckCircle2 size={18} strokeWidth={2.2} aria-hidden="true" />
              <ServiceIncludedItem item={item} />
            </li>
          ))}
        </ul>
      )}
    </ServiceSection>
  ))
}

function ServiceOverview({ overview }) {
  if (Array.isArray(overview)) {
    return overview.map((paragraph) => (
      <p className="service-lead" key={paragraph}>
        {paragraph}
      </p>
    ))
  }

  return <p className="service-lead">{overview}</p>
}

function ServicePageTemplate({ service }) {
  const isServicesIndex = service.showDirectory === true
  const hasOverview = Boolean(
    service.overviewTitle
    && (Array.isArray(service.overview) ? service.overview.length : service.overview)
  )
  const hasIncluded = service.included?.length > 0
  const finalCta = service.finalCta || {
    label: 'Ready when you are',
    heading: 'Turn this service into a clear project plan.',
    primaryLabel: 'Contact AningDesign',
    primaryHref: '/contact',
    secondaryLabel: 'See website projects',
    secondaryHref: '/#projects'
  }

  return (
    <main className={isServicesIndex ? 'service-page service-page--index' : 'service-page'}>
      <section className="service-page-hero" aria-labelledby="service-page-title">
        <div className="service-page-shell">
          <p className="service-page-kicker">{service.kicker}</p>
          <h1 id="service-page-title">{service.h1}</h1>
          {service.introCta ? (
            <div className="service-page-intro-block">
              <p className="service-page-intro">{service.intro}</p>
              <ServiceCtaBlock cta={service.introCta} id="service-intro-cta-title" className="service-intro-cta" />
            </div>
          ) : (
            <>
              <p className="service-page-intro">{service.intro}</p>
              <div className="service-hero-actions" aria-label="Service page actions">
                <SmartServiceLink href="/contact" className="service-primary-action">
                  {service.heroPrimaryLabel || 'Start a project'}
                  <ArrowRight size={17} strokeWidth={2.2} aria-hidden="true" />
                </SmartServiceLink>
                <SmartServiceLink href="/services" className="service-secondary-action">
                  {service.heroSecondaryLabel || 'View all services'}
                </SmartServiceLink>
              </div>
            </>
          )}
        </div>
      </section>

      <div className="service-page-shell service-page-content">
        {hasOverview && (
          <ServiceSection id="service-overview" kicker="Overview" title={service.overviewTitle}>
            <ServiceOverview overview={service.overview} />
            <RelatedServiceLinks service={service} />
          </ServiceSection>
        )}

        {service.showDirectory && <ServiceDirectory service={service} />}

        {hasIncluded && (
          <ServiceSection id="service-included" kicker="Included" title={service.includedTitle || 'What is included'}>
            <ul className="service-check-grid">
              {service.included.map((item) => (
                <li key={typeof item === 'string' ? item : item.title}>
                  <CheckCircle2 size={18} strokeWidth={2.2} aria-hidden="true" />
                  <ServiceIncludedItem item={item} />
                </li>
              ))}
            </ul>
          </ServiceSection>
        )}

        <ServiceCtaBlock cta={service.midPageCta} id="service-mid-cta-title" className="service-mid-cta" />

        <ServiceSection id="service-audience" kicker="Best for" title={service.audienceTitle || 'Who this service is for'}>
          <div className="service-audience-grid">
            {service.audience.map((item) => (
              <article key={item}>
                <h3>{item}</h3>
              </article>
            ))}
          </div>
        </ServiceSection>

        <ServiceUseCases service={service} />

        <ServiceContentSections service={service} />

        <ServiceSection id="service-process" kicker="Process" title={service.processTitle || 'How the work moves'}>
          <div className="service-process-list">
            {service.process.map((step, index) => (
              <article key={step.title} className="service-process-step">
                <span>{String(index + 1).padStart(2, '0')}</span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              </article>
            ))}
          </div>
        </ServiceSection>

        <ServiceResources resources={service.resources} />

        <ServiceSection id="service-examples" kicker="Examples" title={service.examplesTitle || 'Related portfolio or examples'}>
          <div className="service-example-grid">
            {service.examples.map((example) => (
              <article key={example.title} className="service-example-card">
                <LinkIcon size={18} strokeWidth={2.2} aria-hidden="true" />
                <h3>{example.title}</h3>
                <p>{example.description}</p>
                <SmartServiceLink href={example.href} className="service-text-link">
                  View example
                  <ArrowRight size={15} strokeWidth={2.2} aria-hidden="true" />
                </SmartServiceLink>
              </article>
            ))}
          </div>
        </ServiceSection>

        <ServiceSection id="service-faq" kicker="FAQ" title="Questions clients usually ask">
          <div className="service-faq-list">
            {service.faqs.map((faq) => (
              <details key={faq.question} className="service-faq-item">
                <summary>
                  <HelpCircle size={18} strokeWidth={2.2} aria-hidden="true" />
                  {faq.question}
                </summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </ServiceSection>

        <section className="service-final-cta" aria-labelledby="service-final-cta-title">
          <p>{finalCta.label}</p>
          <h2 id="service-final-cta-title">{finalCta.heading}</h2>
          {finalCta.text && <p className="service-final-cta-text">{finalCta.text}</p>}
          <div className="service-final-actions">
            <SmartServiceLink href={finalCta.primaryHref} className="service-primary-action">
              {finalCta.primaryLabel}
              <ArrowRight size={17} strokeWidth={2.2} aria-hidden="true" />
            </SmartServiceLink>
            {finalCta.secondaryHref && (
              <SmartServiceLink href={finalCta.secondaryHref} className="service-secondary-action">
                {finalCta.secondaryLabel}
              </SmartServiceLink>
            )}
          </div>
        </section>
      </div>
    </main>
  )
}

export default ServicePageTemplate
