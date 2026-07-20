import {
  ArrowUpRight,
  BookOpen,
  BriefcaseBusiness,
  Code2,
  FileText,
  Gift,
  Image,
  LayoutDashboard,
  Monitor,
  Palette,
  PenTool,
  Rocket,
  Search
} from 'lucide-react'
import {
  mobileActionLinks,
  quickLinks,
  resourceLinks,
  serviceMegaMenuGroups,
  socialLinks
} from '../data/navigationConfig'
import { getExternalLinkProps } from '../utils/links'
import { SiteLink } from './SiteLink'
import { XLogoIcon, YoutubeLogoIcon } from './SocialIcons'
import './MegaMenu.css'

function SmartLink({item,className = '',children,onNavigate}) {
  const externalProps = getExternalLinkProps(item.href)
  const handleClick = () => {
    onNavigate?.()
  }

  return (
    <SiteLink
      href={item.href}
      target={item.target || externalProps.target}
      rel={item.rel || externalProps.rel}
      className={className}
      onClick={handleClick}
    >
      {children || item.title || item.label}
    </SiteLink>
  )
}

const serviceIconMap = {
  'Website Design': Monitor,
  'WordPress Websites': Monitor,
  'React Web Apps': Code2,
  'Startup MVPs': Rocket,
  'Graphic Design': PenTool,
  Branding: Palette,
  'Social Media Design': Image,
  'UI/UX Design': LayoutDashboard
}

const resourceIconMap = {
  Blog: FileText,
  Pricing: BriefcaseBusiness,
  Books: BookOpen,
  Tutorials: Monitor,
  'Case Studies': LayoutDashboard,
  'Free Resources': Gift,
  'Prompt Library': BookOpen,
  'Free Tools': BriefcaseBusiness,
  Checklists: FileText,
  Guides: BookOpen
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

        <section className="mega-menu-section mega-menu-services-section">
          <div className="mega-menu-heading-row">
            <p className="mega-menu-kicker">Services</p>
            <SmartLink item={{title: 'View all services',href: '/services'}} className="mega-menu-small-link" onNavigate={onClose}>
              View all
              <ArrowUpRight size={14} strokeWidth={2.2} aria-hidden="true" />
            </SmartLink>
          </div>

          <div className="mega-menu-services-grid">
            {serviceMegaMenuGroups.map((group) => (
              <div className="mega-menu-service-group" key={group.title}>
                <h3>{group.title}</h3>
                <div className="mega-menu-service-list">
                  {group.links.map((item) => {
                    const Icon = serviceIconMap[item.title] || Monitor

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
              </div>
            ))}
          </div>

          <div className="mega-menu-service-cta">
            <span>
              <strong>Not sure what you need?</strong>
              <small>Tell me what you are building.</small>
            </span>
            <SmartLink item={{title: 'Contact Us',href: '/contact'}} className="mega-menu-cta-link" onNavigate={onClose}>
              Contact Us
            </SmartLink>
          </div>
        </section>

        <section className="mega-menu-section">
          <p className="mega-menu-kicker">Resources</p>
          <div className="mega-menu-simple-list">
            {resourceLinks.map((item) => {
              const Icon = resourceIconMap[item.title] || FileText

              return (
                <SmartLink key={item.title} item={item} className="mega-menu-simple-link" onNavigate={onClose}>
                  <Icon size={16} strokeWidth={2} aria-hidden="true" />
                  <span>
                    <strong>{item.title}</strong>
                    <small>{item.description}</small>
                  </span>
                  <ArrowUpRight size={14} strokeWidth={2} aria-hidden="true" />
                </SmartLink>
              )
            })}
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
                <SiteLink key={topic} href="/blog" onClick={onClose}>{topic}</SiteLink>
              ))}
            </div>
          </div>

          <div className="mega-menu-socials" aria-label="Social links">
            {socialLinks.map((link) => {
              const Icon = link.label.includes('YouTube') ? YoutubeLogoIcon : XLogoIcon

              return (
              <a key={link.label} href={link.href} {...getExternalLinkProps(link.href)} aria-label={link.label} onClick={onClose}>
                <Icon />
              </a>
              )
            })}
          </div>
        </section>
      </div>
    </nav>
  )
}

export default MegaMenu
