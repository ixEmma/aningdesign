import { useState, useEffect, useRef } from 'react'
import NavLink from './NavLink'
import './Header.css'

function Header() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isClosing, setIsClosing] = useState(false)
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
    timeoutRef.current = setTimeout(() => {
      setSidebarOpen(false)
      setIsClosing(false)
    }, 420)
  }

  const handleNavClick = () => {
    closeSidebar()
  }

  return (
    <>
      <header>
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
            <NavLink href="/#projects">Projects</NavLink>
            <a href="/blog" className="nav-link">Blog</a>
            <NavLink href="/#contact">Contact</NavLink>
          </nav>

          <a
            href="https://www.behance.net/emmaaning"
            target="_blank"
            rel="noopener noreferrer"
            className="cta-button-nav"
          >
            Projects
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
        <nav className="sidebar-nav" onClick={handleNavClick}>
          <a href="/#home">Home</a>
          <a href="/#skills">Skills</a>
          <a href="/#services">Services</a>
          <a href="/#projects">Projects</a>
          <a href="/blog">Blog</a>
          <a href="/#contact">Contact</a>
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
