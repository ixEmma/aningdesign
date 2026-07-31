import './ProofBar.css'
import { SiteLink } from './SiteLink'

const proofMarks = [
  {
    label: 'ANING DESIGN LAB',
    href: 'https://www.youtube.com/@Aningdesignlab',
    variant: 'aning'
  },
  {
    label: 'LENSORA EVENTS',
    href: 'https://lensoraevents.com/',
    variant: 'lensora'
  },
  {
    label: 'STUDYNESTT',
    href: 'https://studynestt.com/',
    variant: 'studynest'
  },
  {
    label: 'CLIENT-READY WORDPRESS BLUEPRINT',
    href: 'https://www.aningdesign.com/books/client-ready-wordpress-website-blueprint',
    variant: 'blueprint'
  }
]

function ProofMark({ mark }) {
  const className = `hero-proof__wordmark hero-proof__wordmark--${mark.variant}`

  return (
    <SiteLink
      className={`${className} hero-proof__wordmark-link`}
      href={mark.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={mark.label}
    >
      {mark.label}
    </SiteLink>
  )
}

function ProofBar() {
  return (
    <aside className="hero-proof" aria-label="Owned brands, products and projects">
      <div className="hero-proof__inner">
        <p className="hero-proof__statement">
          Products, platforms and resources built by Emmanuel Aning.
        </p>
        <ul className="hero-proof__marks" aria-label="Owned brands and products">
          {proofMarks.map((mark) => (
            <li className={`hero-proof__mark hero-proof__mark--${mark.variant}`} key={mark.label}>
              <ProofMark mark={mark} />
            </li>
          ))}
        </ul>
      </div>
    </aside>
  )
}

export default ProofBar
