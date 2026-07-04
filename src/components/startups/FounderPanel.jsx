import { ArrowUpRight, Github, Globe2, MapPin, Send, Youtube } from 'lucide-react'
import { identityTags } from '../../data/startupProjects'

const youtubeUrl = 'https://www.youtube.com/channel/UCUBBcAJYllM2DVZ46Wkepxg'

const founderLinks = [
  { label: 'Website', href: 'https://aningdesign.com/', icon: Globe2 },
  { label: 'YouTube', href: youtubeUrl, icon: Youtube },
  { label: 'Telegram', href: 'https://t.me/AningDzn', icon: Send },
  { label: 'GitHub', href: 'https://github.com/ixEmma', icon: Github }
]

function FounderPanel() {
  return (
    <aside className="startup-founder-panel" aria-labelledby="startup-founder-name">
      <div className="startup-founder-avatar">
        <img src="/images/LOGO.png" alt="Aning Design Lab logo" />
      </div>

      <p className="startup-founder-eyebrow">Founder profile</p>
      <h1 id="startup-founder-name">Emmanuel Aning</h1>
      <p className="startup-founder-role">Founder of Aning Design Lab</p>

      <div className="startup-founder-location">
        <MapPin size={17} strokeWidth={2.2} aria-hidden="true" />
        <span>Ghana</span>
      </div>

      <div className="startup-founder-tags" aria-label="Founder identity">
        {identityTags.map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </div>

      <p className="startup-founder-statement">
        I build web apps, websites, tutorials, and digital products that help creators,
        students, and businesses grow online.
      </p>
      <p className="startup-founder-note">
        I document the process, share what I learn, and build useful tools in public.
      </p>

      <div className="startup-founder-actions" aria-label="Founder actions">
        <a href="/#contact" className="startup-profile-button startup-profile-button-primary">
          Work with me
          <ArrowUpRight size={17} strokeWidth={2.2} aria-hidden="true" />
        </a>
        <a
          href={youtubeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="startup-profile-button startup-profile-button-secondary"
        >
          View tutorials
          <Youtube size={17} strokeWidth={2.2} aria-hidden="true" />
        </a>
      </div>

      <div className="startup-founder-links" aria-label="Founder links">
        {founderLinks.map(({ label, href, icon: Icon }) => (
          <a key={label} href={href} target="_blank" rel="noopener noreferrer">
            <Icon size={17} strokeWidth={2.1} aria-hidden="true" />
            {label}
          </a>
        ))}
      </div>
    </aside>
  )
}

export default FounderPanel
