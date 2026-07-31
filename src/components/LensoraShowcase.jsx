import { useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { SiteLink } from './SiteLink'
import './LensoraShowcase.css'

function LensoraShowcase({ project }) {
  const [activeFeatureId, setActiveFeatureId] = useState(project.features[0].id)
  const activeFeature =
    project.features.find((feature) => feature.id === activeFeatureId) || project.features[0]

  return (
    <article className="lensora-showcase" aria-labelledby="lensora-showcase-title">
      <div className="lensora-showcase__main">
        <div className="lensora-showcase__rail">
          <div className="lensora-showcase__intro">
            <p className="lensora-showcase__eyebrow type-eyebrow">Featured digital product</p>
            <h3 className="type-h3" id="lensora-showcase-title">
              {project.title}
            </h3>
            <p className="lensora-showcase__summary type-body">{project.showcaseIntro}</p>
            <SiteLink
              href={project.href}
              className="aning-button aning-button--text lensora-showcase__intro-action"
              aria-label={`Explore ${project.title}`}
            >
              Explore Lensora Events
              <ArrowRight size={18} strokeWidth={2.2} aria-hidden="true" />
            </SiteLink>
          </div>

          <div className="lensora-feature-list" aria-label="Lensora product features">
            {project.features.map((feature) => {
              const isActive = activeFeature.id === feature.id

              return (
                <button
                  type="button"
                  className={`lensora-feature${isActive ? ' lensora-feature--active' : ''}`}
                  aria-pressed={isActive}
                  aria-controls="lensora-feature-panel"
                  onClick={() => setActiveFeatureId(feature.id)}
                  key={feature.id}
                >
                  <span className="lensora-feature__title">{feature.title}</span>
                  {isActive && (
                    <span className="lensora-feature__description type-small">
                      {feature.description}
                    </span>
                  )}
                </button>
              )
            })}
          </div>
        </div>

        <div
          className={`lensora-preview lensora-preview--${activeFeature.visualLayout}`}
          id="lensora-feature-panel"
          aria-live="off"
        >
          <div className="lensora-preview__transition" key={activeFeature.id}>
            <div className="lensora-preview__media-stage">
              <figure className="lensora-preview__frame">
                <img
                  src={activeFeature.image}
                  srcSet={activeFeature.imageSrcSet}
                  sizes="(min-width: 1025px) 58vw, 100vw"
                  alt={activeFeature.imageAlt}
                  width={activeFeature.width}
                  height={activeFeature.height}
                  loading="lazy"
                  decoding="async"
                />
              </figure>
            </div>

            <div className="lensora-preview__detail-rail">
              <aside className="lensora-detail-panel" aria-label={`${activeFeature.title} detail`}>
                <div
                  className={`lensora-detail-panel__media lensora-detail-panel__media--${activeFeature.detailFocus}`}
                >
                  <img
                    src={activeFeature.image}
                    alt=""
                    width={activeFeature.width}
                    height={activeFeature.height}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="lensora-detail-panel__copy">
                  <p className="type-eyebrow">Workflow detail</p>
                  <h4>{activeFeature.detailTitle}</h4>
                  <p className="type-small">{activeFeature.detailText}</p>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </div>

      <div className="lensora-showcase__footer">
        <dl className="lensora-showcase__metadata">
          <div>
            <dt className="type-eyebrow">Role</dt>
            <dd className="type-small">{project.role}</dd>
          </div>
          <div>
            <dt className="type-eyebrow">Outcome</dt>
            <dd className="type-small">{project.outcome}</dd>
          </div>
          <div>
            <dt className="type-eyebrow">Built with</dt>
            <dd className="type-small">{project.technologies.join(' · ')}</dd>
          </div>
        </dl>

        <SiteLink
          href={project.href}
          className="aning-button aning-button--secondary lensora-showcase__footer-action"
          aria-label={`Explore ${project.title}`}
        >
          Explore Lensora Events
          <ArrowRight size={18} strokeWidth={2.2} aria-hidden="true" />
        </SiteLink>
      </div>
    </article>
  )
}

export default LensoraShowcase
