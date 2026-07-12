# AningDesign Blog System Process

## 1. What Was Added

A Markdown-powered blog system was added beside the existing one-page React landing page.

The system includes:

- A Blog link in the main navigation and footer
- A homepage Latest Blog Tutorials preview section
- A blog archive page at `/blog`
- A single blog post route at `/blog/:slug`
- Markdown content stored in `src/content/blog/`
- Reusable blog components for cards, grids, filters, post headers, and video embeds
- SEO metadata updates for the blog archive and post pages
- Sitemap entries for the new blog URLs

## 2. Why the Blog System Was Added

The blog supports the SEO strategy in `aningdesign-seo-traffic-growth-plan.md`.

The main strategy is to turn YouTube tutorials into written blog posts. This gives each tutorial two traffic paths:

- YouTube search and recommendations
- Google search through written tutorial pages

The homepage remains a portfolio and landing page, while the blog becomes the written tutorial hub.

## 3. How the Homepage Blog Preview Works

The homepage uses `LatestBlogTutorials`.

File:

```txt
src/components/blog/LatestBlogTutorials.jsx
```

It gets the latest posts from:

```txt
src/utils/blogUtils.js
```

It shows up to 3 latest posts and links users to `/blog`.

## 4. How `/blog` Works

The archive page is:

```txt
src/pages/Blog.jsx
```

It reads lightweight metadata for every Markdown post, shows the page header and category filters, promotes the newest matching post, and renders 18 compact archive cards initially. Visitors can reveal 18 more tutorials with each use of the load-more control.

Each card links to:

```txt
/blog/post-slug
```

## 5. How `/blog/:slug` Works

The single post page is:

```txt
src/pages/BlogPost.jsx
```

It reads the slug from the URL, finds the matching metadata, then lazy-loads only that article's Markdown body. After loading, it displays the post header, embeds the YouTube video when `youtubeEmbedUrl` exists, and renders the Markdown content.

If the slug does not match a post, the visitor is redirected to `/blog`. Valid posts show an accessible loading state and provide retry and back-to-blog actions if the article chunk cannot load.

## 6. Where Blog Posts Are Stored

Blog posts live inside:

```txt
src/content/blog/
```

The first post is stored here:

```txt
src/content/blog/wordpress/how-to-create-a-blog-post-in-wordpress.md
```

Categories can be organized with folders, for example:

```txt
src/content/blog/wordpress/
src/content/blog/react/
src/content/blog/seo/
src/content/blog/ai-workflows/
```

## 7. How to Add a New Blog Post

Create a new Markdown file inside the correct category folder.

Example:

```txt
src/content/blog/wordpress/my-new-wordpress-tutorial.md
```

Add frontmatter at the top, then write the article below it.

After saving the file, the Vite blog metadata plugin automatically reads its frontmatter and adds it to the homepage preview, archive page, and category filters. The full Markdown body is emitted as a separate lazy-loaded article chunk.

## 8. Required Frontmatter Fields

Use this structure:

```md
---
title: "Post Title"
description: "Short SEO description for the post."
category: "WordPress"
date: "2026-05-17"
slug: "post-url-slug"
youtubeUrl: "https://youtu.be/video-id"
youtubeEmbedUrl: "https://www.youtube.com/embed/video-id"
tags:
  - WordPress
  - Tutorial
featured: false
---
```

Recommended required fields:

- `title`
- `description`
- `category`
- `date`
- `slug`
- `tags`

Use `youtubeUrl` and `youtubeEmbedUrl` when the article is connected to a YouTube video.

## 9. How to Connect a YouTube Video to a Blog Post

Add both YouTube fields:

```md
youtubeUrl: "https://youtu.be/bfHBX7sRPcQ"
youtubeEmbedUrl: "https://www.youtube.com/embed/bfHBX7sRPcQ"
```

`youtubeUrl` is used for the external YouTube CTA.

`youtubeEmbedUrl` is used to show the embedded video near the top of the post.

## Blog Post Types and Optional Fields

Use one Markdown blog system for both YouTube-support posts and SEO keyword-ranking posts.

For YouTube posts, use:

```md
type: "youtube"
youtubeUrl: "https://youtu.be/video-id"
youtubeEmbedUrl: "https://www.youtube.com/embed/video-id"
youtubeVideoId: "video-id"
thumbnail: "/images/blog/example.jpg"
thumbnailAlt: "Useful thumbnail description"
relatedService: "/services/website-design"
```

For SEO posts, use:

```md
type: "seo"
primaryKeyword: "small business website design services"
keywordCluster:
  - website design services
  - custom website design
servicePage: "/services/website-design"
thumbnail: "https://images.pexels.com/photos/example.jpeg"
thumbnailAlt: "Useful thumbnail description"
tags:
  - Web Design
  - SEO
```

Pexels workflow:

- Search with `/api/pexels-search?query=...`
- Copy the selected image URL into `thumbnail`
- Write a useful `thumbnailAlt`
- Optionally save photographer credit in `imageCredit` and `imageCreditUrl`

## 10. How to Group Blog Posts by Category

Set the `category` field in frontmatter:

```md
category: "WordPress"
```

The archive page reads all post categories and creates filter buttons automatically.

Use consistent category names so filters stay clean.

Recommended categories from the SEO plan:

- WordPress
- React
- SEO
- AI Workflows
- Web Design

## 11. How This Supports the SEO Growth Plan

The blog follows the guidance in `aningdesign-seo-traffic-growth-plan.md` by:

- Turning YouTube tutorials into written posts
- Giving each tutorial a crawlable URL
- Adding metadata for blog pages
- Embedding related YouTube videos
- Using tutorial titles, descriptions, timestamps, tools, steps, common mistakes, and CTAs
- Building topic authority around WordPress, React, SEO, AI workflows, and web design

## Batch Blog Post Workflow

New posts should be added as Markdown files inside `src/content/blog/`.

Group posts by category folder, such as `wordpress`, `react`, or `ai-workflows`, so the content stays organized as the blog grows.

Each post needs complete frontmatter, including title, description, category, date, slug, YouTube URL, embed URL, thumbnail, thumbnail alt text, tags, and featured status.

After adding new posts, update `public/sitemap.xml` with the new blog URLs while keeping all existing entries.

For best SEO, write each post from the actual video description and timestamps so the article matches the tutorial structure and answers what viewers are searching for.

## 12. How to Test the Blog Locally

Run:

```bash
npm run dev
```

Then check:

```txt
http://localhost:5173/
http://localhost:5173/blog
http://localhost:5173/blog/how-to-create-a-blog-post-in-wordpress
```

Also check:

- Homepage still loads
- Navbar anchor links still move to homepage sections
- Blog link opens `/blog`
- First blog card opens the correct post
- YouTube embed appears
- Markdown headings, lists, and links render correctly
- Mobile layout works

## 13. What to Check Before Deploying to Vercel

Before deploying, run:

```bash
npm run build
```

Then confirm:

- Build completes without errors
- `public/sitemap.xml` still exists
- Sitemap includes `/blog`
- Sitemap includes `/blog/how-to-create-a-blog-post-in-wordpress`
- `public/robots.txt` still points to the sitemap
- No existing landing page sections were removed
- The YouTube tutorials section still works
- New posts have complete frontmatter
- New post URLs are added to the sitemap when they should be indexed
