import { useState, useEffect, useRef } from 'react'
import NavLink from './NavLink'
import './Header.css'

const projectLinks = [
  { label: 'Website Design', href: '/#projects' },
  {
    label: 'Graphic Design',
    href: 'https://www.behance.net/emmaaning',
    target: '_blank',
    rel: 'noopener noreferrer'
  },
  { label: 'Startups', href: '/startups' }
]

function Header() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isClosing, setIsClosing] = useState(false)
  const [mobileProjectsOpen, setMobileProjectsOpen] = useState(false)
  const timeoutRef = useRef(null)

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  const toggleSidebar = () => {
    if (sidebarOpen) {
      setIsClosing(true)
      timeoutRef.current = setTimeout(() => {
        setSidebarOpen(false)
        setIsClosing(false)
      }, 420)
    } else {
      setSidebarOpen(true)
    }
  }

  const closeSidebar = () => {
    if (isClosing) return // Prevent double-close
    setIsClosing(true)
    setMobileProjectsOpen(false)
    timeoutRef.current = setTimeout(() => {
      setSidebarOpen(false)
      setIsClosing(false)
    }, 420)
  }

  const toggleMobileProjects = () => {
    setMobileProjectsOpen((isOpen) => !isOpen)
  }

  const handleNavClick = () => {
    closeSidebar()
  }

  return (
    <>
      <header className="site-header">
        <div className="header-container">
          <div className="logo">
            <a href="/#home" className="logo-link" aria-label="Go to homepage">
              <img src="/images/LOGO.png" alt="Aning Design logo" />
            </a>
          </div>

          <div className="available-for-projects-container">
            <div className="circle-icon"></div>
            <h4 className="available-for-projects">Available for new Projects</h4>
          </div>

          <button
            className={`hamburger ${sidebarOpen ? 'is-active' : ''}`}
            onClick={toggleSidebar}
            aria-label="Toggle menu"
            aria-expanded={sidebarOpen}
          >
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </button>

          <nav className="main-nav">
            <NavLink href="/#home">Home</NavLink>
            <NavLink href="/#skills">Skills</NavLink>
            <NavLink href="/#services">Services</NavLink>
            <div className="projects-menu">
              <button
                type="button"
                className="nav-link projects-menu-trigger"
                aria-haspopup="true"
              >
                Projects
                <span className="projects-menu-chevron" aria-hidden="true"></span>
              </button>
              <div className="projects-menu-panel" aria-label="Project categories">
                {projectLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target={link.target}
                    rel={link.rel}
                    className="projects-menu-link"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
            <a href="/blog" className="nav-link">Blog</a>
            <NavLink href="/#contact">Contact</NavLink>
          </nav>

          <a
            href="/startups"
            className="cta-button-nav"
          >
            Startups
          </a>
        </div>
      </header>

      {/* Mobile sidebar and backdrop */}
      <aside
        id="mobile-sidebar"
        className={`sidebar ${sidebarOpen ? 'is-open' : ''} ${isClosing ? 'closing' : ''}`}
        aria-hidden={!sidebarOpen}
        aria-labelledby="sidebar-close"
      >
        <div className="sidebar-header">
          <span className="sidebar-title">MENU</span>
          <button
            id="sidebar-close"
            className="sidebar-close"
            onClick={closeSidebar}
            aria-label="Close menu"
          >
            <span className="bar"></span>
            <span className="bar"></span>
          </button>
        </div>
        <nav className="sidebar-nav">
          <a href="/#home" onClick={handleNavClick}>Home</a>
          <a href="/#skills" onClick={handleNavClick}>Skills</a>
          <a href="/#services" onClick={handleNavClick}>Services</a>
          <div className={`sidebar-projects-group ${mobileProjectsOpen ? 'is-open' : ''}`}>
            <button
              type="button"
              className="sidebar-projects-toggle"
              onClick={toggleMobileProjects}
              aria-expanded={mobileProjectsOpen}
              aria-controls="sidebar-projects-menu"
            >
              Projects
              <span className="sidebar-projects-chevron" aria-hidden="true"></span>
            </button>
            <div id="sidebar-projects-menu" className="sidebar-projects-menu">
              {projectLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.target}
                  rel={link.rel}
                  onClick={handleNavClick}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
          <a href="/blog" onClick={handleNavClick}>Blog</a>
          <a href="/#contact" onClick={handleNavClick}>Contact</a>
        </nav>
      </aside>
      <div
        id="sidebar-backdrop"
        className={`sidebar-backdrop ${sidebarOpen ? 'is-open' : ''} ${isClosing ? 'closing' : ''}`}
        onClick={closeSidebar}
        aria-hidden={!sidebarOpen}
      ></div>
    </>
  )
}

export default Header
