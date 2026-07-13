import { Search, X } from 'lucide-react'
import './BlogArchiveSearch.css'

function BlogArchiveSearch({
  value,
  onChange,
  id = 'blog-archive-search-input',
  label = 'Search the blog',
  placeholder = 'Search insights, guides, and tutorials'
}) {
  return (
    <div className="blog-archive-search">
      <label htmlFor={id}>{label}</label>
      <div className="blog-archive-search__control">
        <Search size={19} strokeWidth={2.2} aria-hidden="true" />
        <input
          id={id}
          type="search"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          autoComplete="off"
        />
        {value && (
          <button type="button" onClick={() => onChange('')} aria-label={`Clear ${label.toLowerCase()}`}>
            <X size={17} strokeWidth={2.2} aria-hidden="true" />
          </button>
        )}
      </div>
    </div>
  )
}

export default BlogArchiveSearch
