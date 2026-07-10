import {useCallback, useEffect, useRef, useState} from 'react'
import {Menu, Search, X} from 'lucide-react'
import NavLink from './NavLink'
import HeaderIconButton from './HeaderIconButton'
import MegaMenu from './MegaMenu'
import SearchOverlay from './SearchOverlay'
import {mainNavLinks, projectLinks, serviceLinks} from '../data/navigationConfig'
import {getBlogTopics} from '../services/blogService'
import {getFeaturedStartups} from '../services/startupService'
import {getExternalLinkProps} from '../utils/links'
import './Header.css'

function NavDropdown({link,links,panelLabel,onNavigate}) {
  return (
    <div className="nav-dropdown">
      <a href={link.href} className="nav-link nav-dropdown-trigger" aria-haspopup="true">
        {link.label}
        <span className="nav-dropdown-chevron" aria-hidden="true"></span>
      </a>
      <div className="nav-dropdown-panel" aria-label={panelLabel}>
        {links.map((item) => {
          const externalProps = getExternalLinkProps(item.href)

          return (
            <a
              key={`${item.label}-${item.href}`}
              href={item.href}
              target={item.target || externalProps.target}
              rel={item.rel || externalProps.rel}
              className="nav-dropdown-link"
              onClick={onNavigate}
            >
              {item.label}
            </a>
          )
        })}
      </div>
    </div>
  )
}

function Header() {
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [featuredStartups, setFeaturedStartups] = useState([])
  const [blogTopics, setBlogTopics] = useState([])
  const headerShellRef = useRef(null)

  useEffect(() => {
    let isMounted = true

    getFeaturedStartups(5)
      .then((startups) => {
        if (isMounted) {
          setFeaturedStartups(startups)
        }
      })
      .catch(() => {
        if (isMounted) {
          setFeaturedStartups([])
        }
      })

    setBlogTopics(getBlogTopics(8))

    return () => {
      isMounted = false
    }
  }, [])

  useEffect(() => {
    document.body.classList.toggle('site-menu-open', isMegaMenuOpen)

    return () => {
      document.body.classList.remove('site-menu-open')
    }
  }, [isMegaMenuOpen])

  useEffect(() => {
    document.body.classList.toggle('site-search-open', isSearchOpen)

    return () => {
      document.body.classList.remove('site-search-open')
    }
  }, [isSearchOpen])

  const closeMegaMenu = useCallback(() => {
    setIsMegaMenuOpen(false)
  }, [])

  const closeSearch = useCallback(() => {
    setIsSearchOpen(false)
  }, [])

  const openSearch = useCallback(() => {
    setIsMegaMenuOpen(false)
    setIsSearchOpen(true)
  }, [])

  const toggleMegaMenu = () => {
    setIsSearchOpen(false)
    setIsMegaMenuOpen((isOpen) => !isOpen)
  }

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsMegaMenuOpen(false)
        setIsSearchOpen(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  useEffect(() => {
    if (!isMegaMenuOpen) return undefined

    const handlePointerDown = (event) => {
      if (headerShellRef.current && !headerShellRef.current.contains(event.target)) {
        closeMegaMenu()
      }
    }

    document.addEventListener('mousedown', handlePointerDown)
    document.addEventListener('touchstart', handlePointerDown)

    return () => {
      document.removeEventListener('mousedown', handlePointerDown)
      document.removeEventListener('touchstart', handlePointerDown)
    }
  }, [closeMegaMenu, isMegaMenuOpen])

  return (
    <>
      <div className="header-shell" ref={headerShellRef}>
        <header className="site-header">
          <div className="header-container">
            <div className="logo">
              <a href="/#home" className="logo-link" aria-label="Go to homepage" onClick={closeMegaMenu}>
                <img src="/images/LOGO-96.png" alt="Aning Design logo" width="96" height="96" decoding="async" />
              </a>
            </div>

            <div className="available-for-projects-container">
              <div className="circle-icon"></div>
              <h4 className="available-for-projects">Available for new Projects</h4>
            </div>

            <nav className="main-nav" aria-label="Primary navigation">
              {mainNavLinks.map((link) => {
                if (link.label === 'Services') {
                  return (
                    <NavDropdown
                      key={link.label}
                      link={link}
                      links={serviceLinks}
                      panelLabel="Service links"
                      onNavigate={closeMegaMenu}
                    />
                  )
                }

                if (link.label === 'Projects') {
                  return (
                    <NavDropdown
                      key={link.label}
                      link={link}
                      links={projectLinks}
                      panelLabel="Project categories"
                      onNavigate={closeMegaMenu}
                    />
                  )
                }

                return <NavLink key={link.label} href={link.href}>{link.label}</NavLink>
              })}
            </nav>

            <div className="header-actions" aria-label="Header actions">
              <HeaderIconButton label="Search site" onClick={openSearch}>
                <Search size={20} strokeWidth={2.2} aria-hidden="true" />
              </HeaderIconButton>
              <HeaderIconButton
                label={isMegaMenuOpen ? 'Close menu' : 'Open menu'}
                onClick={toggleMegaMenu}
                isActive={isMegaMenuOpen}
                controls="site-mega-menu"
              >
                {isMegaMenuOpen ? <X size={22} strokeWidth={2.2} aria-hidden="true" /> : <Menu size={22} strokeWidth={2.2} aria-hidden="true" />}
              </HeaderIconButton>
            </div>
          </div>
        </header>

        <MegaMenu
          isOpen={isMegaMenuOpen}
          startups={featuredStartups}
          blogTopics={blogTopics}
          onClose={closeMegaMenu}
          onSearch={openSearch}
        />
      </div>

      <SearchOverlay isOpen={isSearchOpen} onClose={closeSearch} startups={featuredStartups} />
    </>
  )
}

export default Header
