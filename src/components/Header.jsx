import {useCallback, useEffect, useRef, useState} from 'react'
import {Menu, Search, X} from 'lucide-react'
import NavLink from './NavLink'
import HeaderIconButton from './HeaderIconButton'
import MegaMenu from './MegaMenu'
import SearchOverlay from './SearchOverlay'
import {mainNavLinks, projectLinks} from '../data/navigationConfig'
import {getBlogTopics} from '../services/blogService'
import {getFeaturedStartups} from '../services/startupService'
import {getExternalLinkProps} from '../utils/links'
import './Header.css'

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
              {mainNavLinks.slice(0, 3).map((link) => (
                <NavLink key={link.label} href={link.href}>{link.label}</NavLink>
              ))}
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
                  {projectLinks.map((link) => {
                    const externalProps = getExternalLinkProps(link.href)

                    return (
                      <a
                        key={link.label}
                        href={link.href}
                        target={link.target || externalProps.target}
                        rel={link.rel || externalProps.rel}
                        className="projects-menu-link"
                        onClick={closeMegaMenu}
                      >
                        {link.label}
                      </a>
                    )
                  })}
                </div>
              </div>
              {mainNavLinks.slice(4).map((link) => (
                <NavLink key={link.label} href={link.href}>{link.label}</NavLink>
              ))}
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
