import {useEffect, useMemo, useRef, useState} from 'react'
import {Search, X} from 'lucide-react'
import {mainNavLinks, resourceLinks, whatWeDoLinks} from '../data/navigationConfig'
import {getBlogSearchItems} from '../services/blogService'
import { getExternalLinkProps } from '../utils/links'
import './SearchOverlay.css'

const normalizeStaticItem = (item, type) => {
  const externalProps = getExternalLinkProps(item.href)

  return {
    title: item.title || item.label,
    type,
    description: item.description || `Open ${item.title || item.label}`,
    href: item.href,
    target: item.target || externalProps.target,
    rel: item.rel || externalProps.rel
  }
}

function SearchOverlay({isOpen,onClose,startups}) {
  const [query, setQuery] = useState('')
  const inputRef = useRef(null)

  useEffect(() => {
    if (!isOpen) return undefined

    const focusTimer = window.setTimeout(() => {
      inputRef.current?.focus({preventScroll: true})
    }, 0)

    return () => {
      window.clearTimeout(focusTimer)
    }
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return undefined

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', handleEscape)

    return () => {
      window.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen, onClose])

  useEffect(() => {
    if (!isOpen) {
      setQuery('')
    }
  }, [isOpen])

  const searchItems = useMemo(() => {
    const staticItems = [
      ...mainNavLinks.map((item) => normalizeStaticItem(item, 'Page')),
      ...whatWeDoLinks.map((item) => normalizeStaticItem(item, 'Service')),
      ...resourceLinks.map((item) => normalizeStaticItem(item, 'Resource'))
    ]

    const startupItems = startups.map((startup) => ({
      title: startup.name,
      type: 'Startup',
      description: startup.description || startup.category,
      href: startup.href,
      ...getExternalLinkProps(startup.href)
    }))

    const uniqueItems = [...staticItems, ...startupItems, ...getBlogSearchItems()]

    return uniqueItems.filter((item, index, items) => {
      return items.findIndex((candidate) => candidate.title === item.title && candidate.href === item.href) === index
    })
  }, [startups])

  const filteredResults = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()

    if (!normalizedQuery) return []

    return searchItems
      .filter((item) => {
        return [item.title, item.type, item.description]
          .filter(Boolean)
          .some((value) => value.toLowerCase().includes(normalizedQuery))
      })
      .slice(0, 8)
  }, [query, searchItems])

  if (!isOpen) return null

  return (
    <div className="search-overlay" role="dialog" aria-modal="true" aria-labelledby="site-search-title" onMouseDown={onClose}>
      <div className="search-panel" onMouseDown={(event) => event.stopPropagation()}>
        <div className="search-panel-head">
          <div>
            <p className="search-kicker">Site Search</p>
            <h2 id="site-search-title">Find pages, tutorials, and startups</h2>
          </div>
          <button type="button" className="search-close" onClick={onClose} aria-label="Close search">
            <X size={20} strokeWidth={2.2} aria-hidden="true" />
          </button>
        </div>

        <label className="search-field">
          <Search size={20} strokeWidth={2.2} aria-hidden="true" />
          <span className="sr-only">Search website content</span>
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search AningDesign..."
            autoComplete="off"
          />
        </label>

        <div className="search-results" aria-live="polite">
          {!query.trim() && <p className="search-empty">Start typing to search.</p>}
          {query.trim() && filteredResults.length === 0 && <p className="search-empty">No matching results found.</p>}
          {filteredResults.map((result) => (
            <a
              key={`${result.type}-${result.href}-${result.title}`}
              href={result.href}
              target={result.target}
              rel={result.rel}
              className="search-result"
              onClick={onClose}
            >
              <span className="search-result-type">{result.type}</span>
              <strong>{result.title}</strong>
              <small>{result.description}</small>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SearchOverlay
