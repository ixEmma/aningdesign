const mainWebsiteHosts = ['aningdesign.com', 'www.aningdesign.com']

export const isExternalLink = (href) => {
  if (!/^https?:\/\//.test(href || '')) return false

  try {
    return !mainWebsiteHosts.includes(new URL(href).hostname)
  } catch {
    return false
  }
}

export const getExternalLinkProps = (href) =>
  isExternalLink(href)
    ? { target: '_blank', rel: 'noopener noreferrer' }
    : {}
