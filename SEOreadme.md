# Ville-Ann Website README

This file documents the SEO work completed on this website, what it does for search visibility, and how to reproduce the same setup in WordPress.

## 1) SEO Work Implemented on This Website

### A. On-page metadata on key pages
Applied to `index.html`, `about.html`, `services.html`, `industries.html`, `booking.html`, and `contact.html`:

- Unique `<title>` tags
- Unique `<meta name="description">` tags
- `<meta name="robots" content="index,follow,max-image-preview:large">`
- Canonical URLs with `<link rel="canonical" ...>`
- Open Graph tags for social sharing (`og:title`, `og:description`, `og:url`, `og:image`)
- Twitter Card tags (`twitter:card`, `twitter:title`, `twitter:description`, `twitter:image`)

### B. Indexation control for non-SEO pages
Used `noindex,follow` where appropriate:

- `index-clean.html`
- `services-page-only.html`
- `thank-you.html`

This prevents thin/utility pages from competing with core pages in Google.

### C. Crawl and discovery files

- `robots.txt` allows crawling and points to sitemap:
  - `Sitemap: https://villeann.com/sitemap.xml`
- `sitemap.xml` includes core URLs with:
  - `<loc>`
  - `<lastmod>`
  - `<changefreq>`
  - `<priority>`

### D. Strong internal architecture

- Main nav links all core pages.
- Footer links reinforce crawl paths.
- Service and industry pages include topical internal linking.

### E. Image and accessibility support (SEO-adjacent)

- Meaningful `alt` attributes are present on key branded images (for accessibility and image search context).
- Responsive layout and mobile usability are maintained, which supports UX signals.

## 2) Why This Matters

- Better click-through rate from Google results due to clear titles/descriptions.
- Lower duplicate-content risk due to canonical tags.
- Better social previews when links are shared.
- Faster page discovery through sitemap + robots.
- Cleaner index quality by excluding non-conversion support pages from SERPs.

## 3) Files Used for SEO in This Project

- `/index.html`
- `/about.html`
- `/services.html`
- `/industries.html`
- `/booking.html`
- `/contact.html`
- `/thank-you.html`
- `/services-page-only.html`
- `/index-clean.html`
- `/robots.txt`
- `/sitemap.xml`

## 4) How To Do This Again in WordPress

Use this process to reproduce the same SEO setup on a WordPress site.

### Step 1: Install required plugins

Recommended stack:

1. Rank Math SEO (or Yoast SEO)
2. Redirection (optional, for URL changes)
3. Site Kit by Google (optional, for Search Console + Analytics)

### Step 2: Set global WordPress SEO settings

1. Go to `Settings > Reading` and ensure "Discourage search engines from indexing this site" is unchecked.
2. Go to `Settings > Permalinks` and use `Post name`.
3. Set Site Title and Tagline in `Settings > General`.

### Step 3: Configure SEO plugin basics

In Rank Math or Yoast:

1. Connect Search Console if available.
2. Enable XML sitemap.
3. Set title templates (home, pages, posts).
4. Enable Open Graph + Twitter metadata.
5. Ensure canonical URLs are enabled.

### Step 4: Optimize each core page (manual pass)

For every key page (Home, About, Services, Industries, Booking, Contact):

1. Set a unique SEO title (roughly 50-60 chars).
2. Set a unique meta description (roughly 140-160 chars).
3. Confirm one clear H1 per page.
4. Add internal links to related pages.
5. Set page-level social title/description/image.
6. Verify canonical URL points to the preferred final URL.

### Step 5: Handle non-ranking pages properly

Set pages like thank-you, duplicate landing variants, and utility pages to:

- `noindex,follow`

In WordPress editors, this is usually in the SEO plugin page settings.

### Step 6: Robots and sitemap checks

1. Confirm sitemap is live (example: `/sitemap_index.xml` in Rank Math/Yoast).
2. Confirm `robots.txt` does not block key content.
3. Submit sitemap in Google Search Console.

### Step 7: Technical basics

1. Ensure HTTPS works and preferred domain version is consistent.
2. Improve Core Web Vitals (image compression, caching, lightweight theme).
3. Test mobile UX and tap targets.

### Step 8: Post-launch verification

1. Inspect URLs in Google Search Console.
2. Check index coverage for excluded/duplicate pages.
3. Validate social preview by sharing test URLs.
4. Monitor impressions, clicks, and queries monthly.

## 5) Reusable SEO Checklist (Quick Copy)

For each new page:

1. Unique title
2. Unique meta description
3. One H1
4. Canonical URL set
5. OG + Twitter tags
6. Internal links added
7. Image alt text present
8. Included in sitemap if indexable
9. `noindex` if utility/duplicate page

## 6) Recommended Ongoing SEO Maintenance

- Monthly:
  - Update `lastmod` for pages with meaningful content changes.
  - Check Search Console for indexing errors.
  - Refresh top service/location pages with real proof (photos, testimonials, FAQs).
- Quarterly:
  - Expand location/service intent pages.
  - Improve internal linking to high-conversion pages.
  - Re-check metadata for CTR improvements.

## 7) Notes for This Website

- Current site is static HTML, so metadata is edited directly in each `.html` file.
- In WordPress, the same outcomes are done mostly through page editor + SEO plugin fields instead of direct HTML edits.
