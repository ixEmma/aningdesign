import {
  ArrowUpRight,
  BriefcaseBusiness,
  Code2,
  LayoutDashboard,
  Monitor,
  Palette,
  PenTool,
  Search,
  SearchCheck,
  Wrench
} from 'lucide-react'
import {
  mobileActionLinks,
  quickLinks,
  resourceLinks,
  socialLinks,
  whatWeDoLinks
} from '../data/navigationConfig'
import { getExternalLinkProps, isExternalLink } from '../utils/links'
import './MegaMenu.css'

function SmartLink({item,className = '',children,onNavigate}) {
  const externalProps = getExternalLinkProps(item.href)
  const handleClick = () => {
    onNavigate?.()
  }

  return (
    <a
      href={item.href}
      target={item.target || externalProps.target}
      rel={item.rel || externalProps.rel}
      className={className}
      onClick={handleClick}
    >
      {children || item.title || item.label}
    </a>
  )
}

const whatWeDoIconMap = {
  'Website Design': Monitor,
  'UI/UX Design': LayoutDashboard,
  Branding: Palette,
  'Graphic Design': PenTool,
  'Startup MVPs & Web Apps': Code2,
  'SEO Setup': SearchCheck,
  'Website Maintenance': Wrench
}

const getSocialIcon = (label) => {
  if (label.includes('YouTube')) return 'YT'
  if (label.includes('Twitter') || label === 'X') return 'X'
  return label.slice(0, 2)
}

function MegaMenu({isOpen,startups,blogTopics,onClose,onSearch}) {
  if (!isOpen) return null

  const mobileStartups = startups.slice(0, 3)
  const featuredStartups = startups.slice(0, 5)

  return (
    <nav className="mega-menu-panel" id="site-mega-menu" aria-label="Expanded site navigation">
      <div className="mega-menu-mobile-actions" aria-label="Quick actions">
        <button type="button" className="mega-menu-action-card" onClick={onSearch}>
          <Search size={18} strokeWidth={2.2} aria-hidden="true" />
          <span>Search</span>
        </button>
        {mobileActionLinks.map((item) => (
          <SmartLink key={item.title} item={item} className="mega-menu-action-card" onNavigate={onClose}>
            <span>{item.title}</span>
          </SmartLink>
        ))}
      </div>

      <div className="mega-menu-grid">
        <section className="mega-menu-section mega-menu-featured">
          <div className="mega-menu-heading-row">
            <p className="mega-menu-kicker">Featured Startups</p>
            <SmartLink item={{title: 'View all startups',href: '/startups'}} className="mega-menu-small-link" onNavigate={onClose}>
              View all
              <ArrowUpRight size={14} strokeWidth={2.2} aria-hidden="true" />
            </SmartLink>
          </div>

          <div className="mega-menu-startup-list">
            {(featuredStartups.length > 0 ? featuredStartups : mobileStartups).map((startup) => (
              <SmartLink key={startup.name} item={{title: startup.name,href: startup.href}} className="mega-menu-startup-item" onNavigate={onClose}>
                <span className="mega-menu-startup-icon">
                  {startup.icon ? <img src={startup.icon} alt="" width="512" height="512" loading="lazy" decoding="async" /> : <BriefcaseBusiness size={18} strokeWidth={2.2} aria-hidden="true" />}
                </span>
                <span>
                  <strong>{startup.name}</strong>
                  <small>{startup.description}</small>
                </span>
              </SmartLink>
            ))}
          </div>
        </section>

        <section className="mega-menu-section">
          <p className="mega-menu-kicker">What We Do</p>
          <div className="mega-menu-link-grid">
            {whatWeDoLinks.map((item) => {
              const Icon = whatWeDoIconMap[item.title] || Monitor

              return (
                <SmartLink key={item.title} item={item} className="mega-menu-rich-link" onNavigate={onClose}>
                  <Icon size={18} strokeWidth={2.1} aria-hidden="true" />
                  <span>
                    <strong>{item.title}</strong>
                    <small>{item.description}</small>
                  </span>
                </SmartLink>
              )
            })}
          </div>
        </section>

        <section className="mega-menu-section">
          <p className="mega-menu-kicker">Resources</p>
          <div className="mega-menu-simple-list">
            {resourceLinks.map((item) => (
              <SmartLink key={item.title} item={item} className="mega-menu-simple-link" onNavigate={onClose}>
                <span>
                  <strong>{item.title}</strong>
                  <small>{item.description}</small>
                </span>
                {(item.target || isExternalLink(item.href)) && <ArrowUpRight size={15} strokeWidth={2.2} aria-hidden="true" />}
              </SmartLink>
            ))}
          </div>
        </section>

        <section className="mega-menu-section mega-menu-quick-section">
          <p className="mega-menu-kicker">Quick Links</p>
          <div className="mega-menu-quick-links">
            {quickLinks.map((item) => (
              <SmartLink key={item.title} item={item} className="mega-menu-quick-link" onNavigate={onClose} />
            ))}
          </div>

          <div className="mega-menu-topics">
            <p className="mega-menu-kicker">Blog Topics</p>
            <div className="mega-menu-topic-list">
              {blogTopics.slice(0, 8).map((topic) => (
                <a key={topic} href="/blog" onClick={onClose}>{topic}</a>
              ))}
            </div>
          </div>

          <div className="mega-menu-socials" aria-label="Social links">
            {socialLinks.map((link) => (
              <a key={link.label} href={link.href} {...getExternalLinkProps(link.href)} aria-label={link.label} onClick={onClose}>
                <span aria-hidden="true">{getSocialIcon(link.label)}</span>
              </a>
            ))}
          </div>
        </section>
      </div>
    </nav>
  )
}

export default MegaMenu
