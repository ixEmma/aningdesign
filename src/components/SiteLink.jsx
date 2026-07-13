import { Link } from 'react-router-dom'
import { getExternalLinkProps, isExternalLink } from '../utils/links'

export function SiteLink({ href, target, rel, children, ...props }) {
  const isRouterLink = href?.startsWith('/') && !isExternalLink(href) && !target

  if (!isRouterLink) {
    const externalProps = getExternalLinkProps(href)

    return (
      <a
        href={href}
        target={target || externalProps.target}
        rel={rel || externalProps.rel}
        {...props}
      >
        {children}
      </a>
    )
  }

  return (
    <Link to={href} {...props}>
      {children}
    </Link>
  )
}
