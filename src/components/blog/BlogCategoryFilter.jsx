import './BlogCategoryFilter.css'

function BlogCategoryFilter({ categories, activeCategory, onChange }) {
  return (
    <div className="blog-category-filter" aria-label="Filter blog posts by category">
      {categories.map((category) => (
        <button
          type="button"
          className={activeCategory === category ? 'is-active' : ''}
          aria-pressed={activeCategory === category}
          onClick={() => onChange(category)}
          key={category}
        >
          {category}
        </button>
      ))}
    </div>
  )
}

export default BlogCategoryFilter
