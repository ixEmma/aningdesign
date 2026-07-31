import { ArrowRight } from 'lucide-react'
import { SiteLink } from './SiteLink'
import './Process.css'

const processSteps = [
  {
    title: 'Discovery and direction',
    description:
      'We clarify the business, audience, project goals, current challenges and the decisions the website or product needs to support.'
  },
  {
    title: 'Structure and strategy',
    description:
      'I define the sitemap, page hierarchy, user journeys, content priorities and conversion paths before visual design begins.'
  },
  {
    title: 'Design and development',
    description:
      'The approved direction becomes a responsive interface and a working WordPress website or web product.'
  },
  {
    title: 'Review and refinement',
    description:
      'We test the experience, review feedback, correct issues and refine important interactions before launch.'
  },
  {
    title: 'Launch and handover',
    description:
      'The project is prepared for release, essential access is transferred and the system is documented for continued use.'
  }
]

function Process() {
  return (
    <section className="process-section" id="process" aria-labelledby="process-title">
      <div className="process-section__inner">
        <header className="process-section__intro">
          <p className="process-section__eyebrow type-eyebrow">Process</p>
          <h2 className="type-h2" id="process-title">
            A structured path from idea to launch
          </h2>
          <p className="process-section__summary type-body-large">
            Every engagement moves through a clear sequence of discovery, strategy,
            design, implementation and review.
          </p>
          <SiteLink className="aning-button aning-button--primary" href="/contact">
            <span>Start a Project</span>
            <ArrowRight size={18} strokeWidth={1.8} aria-hidden="true" />
          </SiteLink>
        </header>

        <ol className="process-section__steps">
          {processSteps.map((step, index) => (
            <li className="process-step" key={step.title}>
              <span className="process-step__number type-small" aria-hidden="true">
                {String(index + 1).padStart(2, '0')}
              </span>
              <div className="process-step__content">
                <h3 className="process-step__title type-h3">{step.title}</h3>
                <p className="process-step__description type-body">{step.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

export default Process
