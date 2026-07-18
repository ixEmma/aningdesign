/**
 * Get the canonical domain from environment or default to production domain
 * @returns {string} The domain URL without trailing slash
 */
export const getDomain = () => {
  return import.meta.env.VITE_DOMAIN || 'https://www.aningdesign.com'
}

/**
 * Get the full URL for a path
 * @param {string} path - The path (e.g., '/blog', '/blog/my-post')
 * @returns {string} The full URL
 */
export const getUrl = (path = '') => {
  return getDomain() + path
}
