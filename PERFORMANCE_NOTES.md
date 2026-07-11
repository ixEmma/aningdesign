# Performance Notes - Aning Design Website

## Safe Branches

- main: stable/live reference branch.
- blog-services-update: current updated website state before animation recovery.
- restore-original-background-animation: trial branch for animation recovery.

## Current Lighthouse Baseline

Record the latest production-preview Lighthouse result:

- Performance: 88
- Accessibility: 100
- Best Practices: 100
- SEO: 100
- First Contentful Paint: 2.1s
- Largest Contentful Paint: 2.9s
- Total Blocking Time: 230ms
- Cumulative Layout Shift: 0.002
- Speed Index: 2.5s

Note:
The test should be run from production preview using npm run build and npm run preview, not npm run dev.

## What Helped Page Speed

1. Tested with production preview instead of Vite dev server.
2. Avoided judging speed from unminified development files.
3. Reduced or delayed heavy background animation work.
4. Kept animation canvas lighter.
5. Avoided adding heavy third-party animation libraries.
6. Used WebP image versions for work/project images.
7. Avoided bringing back Font Awesome CDN.
8. Kept icons inline/local instead of adding external icon CSS.
9. Avoided loading YouTube iframe too early where applicable.
10. Kept route/content structure cleaner.
11. Preserved lazy loading for non-critical images.
12. Avoided unnecessary global scripts.

## Rules for Future Animation Fixes

- Do not remove the animation completely.
- Do not freeze the animation just for Lighthouse.
- Do not increase particles blindly.
- Do not add Three.js unless absolutely necessary.
- Use requestAnimationFrame.
- Use refs, not React state, inside the animation loop.
- Cap devicePixelRatio for canvas rendering.
- Reduce mobile animation first before reducing desktop.
- Keep prefers-reduced-motion support.
- Pause or reduce animation when document.hidden is true.
- Use passive listeners for pointer and scroll events.

## If Animation Hurts Speed Again

Try these in order:

1. Reduce mobile particle count.
2. Cap devicePixelRatio.
3. Reduce glow/shadow blur.
4. Reduce connection distance.
5. Reduce pointer interaction radius.
6. Disable pointer interaction on mobile.
7. Delay animation start slightly after first paint.
8. Pause animation when tab is hidden.

Do not remove the entire background unless there is no other option.
