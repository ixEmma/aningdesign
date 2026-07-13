import { useEffect } from 'react'
import { ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { getUrl } from '../../utils/domain'
import './Breadcrumbs.css'

function Breadcrumbs({ items, schemaId = 'breadcrumb-schema' }) {
  useEffect(() => {
    let script = document.getElementById(schemaId)

    if (!script) {
      script = document.createElement('script')
      script.id = schemaId
      script.type = 'application/ld+json'
      document.head.appendChild(script)
    }

    script.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: items.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.label,
        item: item.schemaPath ? getUrl(item.schemaPath) : getUrl(item.href || '')
      }))
    })

    return () => script.remove()
  }, [items, schemaId])

  return (
    <nav className="resource-breadcrumbs" aria-label="Breadcrumb">
      <ol>
        {items.map((item, index) => {
          const isCurrent = index === items.length - 1

          return (
            <li key={`${item.label}-${index}`}>
              {index > 0 && <ChevronRight size={14} strokeWidth={2} aria-hidden="true" />}
              {isCurrent ? (
                <span aria-current="page">{item.label}</span>
              ) : (
                <Link to={item.href}>{item.label}</Link>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

export default Breadcrumbs
