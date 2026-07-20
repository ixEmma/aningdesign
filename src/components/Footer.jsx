import { getExternalLinkProps } from '../utils/links'
import { SiteLink } from './SiteLink'
import {
  XLogoIcon,
  LinkedInLogoIcon,
  BehanceLogoIcon,
  YoutubeLogoIcon,
  GithubLogoIcon,
  TelegramLogoIcon
} from './SocialIcons'
import './Footer.css'

const footerMainLinks = [
  { label: 'Home', href: '/#home' },
  { label: 'Services', href: '/services' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Blog', href: '/blog' },
  { label: 'About', href: '/#about' },
  { label: 'Contact', href: '/contact' }
]

const footerProjectLinks = [
  { label: 'Website Projects', href: '/#projects' },
  {
    label: 'Graphic Design Portfolio',
    href: 'https://www.behance.net/emmaaning',
    target: '_blank',
    rel: 'noopener noreferrer'
  },
  { label: 'Startup Projects', href: '/startups' }
]

const footerResourceLinks = [
  { label: 'Free Resources', href: '/free-resources' },
  {
    label: 'Books',
    href: '/books'
  },
  { label: 'Prompt Library', href: '/free-resources/prompts' },
  { label: 'Tutorials', href: '/blog' }
]

const footerSocialLinks = [
  { label: 'X (Twitter)', href: 'https://x.com/Aningdesigns', icon: XLogoIcon },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/emmanuel-aning-133189310', icon: LinkedInLogoIcon },
  { label: 'Behance', href: 'https://www.behance.net/emmaaning', icon: BehanceLogoIcon },
  { label: 'YouTube', href: 'https://www.youtube.com/channel/UCUBBcAJYllM2DVZ46Wkepxg', icon: YoutubeLogoIcon },
  { label: 'GitHub', href: 'https://github.com/ixEmma', icon: GithubLogoIcon },
  { label: 'Telegram', href: 'https://t.me/AningDzn', icon: TelegramLogoIcon }
]

const getLinkAttributes = (link) => {
  const externalProps = getExternalLinkProps(link.href)

  return {
    target: link.target || externalProps.target,
    rel: link.rel || externalProps.rel
  }
}

function Footer() {
  const currentYear = new Date().getFullYear()
  const openFeedback = () => {
    window.dispatchEvent(new CustomEvent('open-feedback'))
  }

  return (
    <footer className="footer-name">
      <div className="footer-content">
        <div className="footer-layout">
          <div className="footer-brand">
            <SiteLink href="/#home" className="footer-brand-mark" aria-label="AningDesign — Home">
              <img src="/images/LOGO-96.png" alt="" width="96" height="96" loading="lazy" decoding="async" />
              <span>AningDesign</span>
            </SiteLink>
            <p>Building websites, web apps, tutorials, and digital products.</p>
            <span className="footer-status">
              <span className="footer-status-dot" aria-hidden="true"></span>
              Available for new projects
            </span>
          </div>

          <nav className="footer-link-group" aria-label="Explore links">
            <h2>Explore</h2>
            <ul className="footer-links">
              {footerMainLinks.map((link) => (
                <li key={link.label}>
                  <SiteLink href={link.href}>{link.label}</SiteLink>
                </li>
              ))}
            </ul>
          </nav>

          <nav className="footer-link-group" aria-label="Project links">
            <h2>Projects</h2>
            <ul className="footer-links">
              {footerProjectLinks.map((link) => (
                <li key={link.label}>
                  <SiteLink href={link.href} {...getLinkAttributes(link)}>
                    {link.label}
                  </SiteLink>
                </li>
              ))}
            </ul>
          </nav>

          <nav className="footer-link-group" aria-label="Resource links">
            <h2>Resources</h2>
            <ul className="footer-links">
              {footerResourceLinks.map((link) => (
                <li key={link.label}>
                  <SiteLink href={link.href} {...getLinkAttributes(link)}>
                    {link.label}
                  </SiteLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="footer-link-group footer-connect">
            <h2>Connect</h2>
            <div className="footer-social">
              {footerSocialLinks.map(({ label, href, icon: Icon }) => (
                <a key={label} href={href} {...getExternalLinkProps(href)} aria-label={label}>
                  <Icon />
                </a>
              ))}
            </div>
            <button type="button" className="footer-feedback-link" onClick={openFeedback}>
              Send Feedback
            </button>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copyright">&copy; {currentYear} AningDesign. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
