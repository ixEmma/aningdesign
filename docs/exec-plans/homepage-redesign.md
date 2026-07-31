# Homepage Redesign Handoff

This file records the approved homepage direction so later phases preserve completed work.

## Phase 3: Services and Tools

The homepage Services and Tools implementation lives in:

- `src/components/Blueprint.jsx` and `Blueprint.css` for Services.
- `src/components/Skills.jsx` and `Skills.css` for Tools.

### Services rules

- Keep the three approved offers in their current order: Strategic Business Websites,
  Website Redesign and Performance, and Digital Products and MVPs.
- Use the shared 1280px homepage content width and a 40/60 introduction-to-list split.
- Present all services inside one shared editorial surface. Do not turn them into separate
  floating cards or restore the previous skills-style treatment.
- Each row keeps the order: number, title, audience and description, selected scope,
  outcome, then the service link.
- Use the shared typography and button tokens. Service links remain restrained text actions;
  the introduction owns the single primary `Start a Project` action.
- Verified routes are `/services/wordpress-websites`,
  `/services/ai-wordpress-debugging`, and `/services/react-web-apps`.

### Tools rules

- Keep the four verified groups: Design, Websites, Products, and Workflow.
- Use one compact, green-tinted AningDesign panel with no software icons, pills, or
  individual tool cards.
- Tool names remain body-sized text separated by middle dots.
- Use four columns on desktop and two columns on tablet and supported mobile widths.
- Keep a deliberate visual pause between the Tools panel and the existing About section;
  do not change About to create that spacing.

### Responsive behavior

- The Services introduction stacks above the shared list at 1100px and below.
- Service-row content becomes one column at 820px and scope lists become one column at
  560px.
- Tools use two columns at 1024px and below, falling to one column only below 340px.
- Preserve practical 44px minimum action targets and prevent horizontal overflow.

Lensora, the supporting case studies, hero, proof, About, and all later homepage sections
remain outside Phase 3.

## Phase 4: Working Process and About Authority

The homepage Process and About implementation lives in:

- `src/components/Process.jsx` and `Process.css` for the five-step working process.
- `src/components/About.jsx` and `About.css` for the authority-led founder introduction.

### Process rules

- Keep Process directly after Tools and before About.
- Preserve the five approved stages in this order: Discovery and direction, Structure and
  strategy, Design and development, Review and refinement, and Launch and handover.
- Use an editorial sequence with one shared divider system, not separate cards.
- Desktop uses a left introduction and right process list. Tablet and mobile stack the
  introduction above the steps.
- The introduction owns one shared primary `Start a Project` action to `/contact`.

### About rules

- Use the approved heading `Design strategy backed by practical development` and the
  concise three-paragraph biography in `About.jsx`.
- Keep the existing local portrait at `/images/papi.webp` in a restrained 4:5 frame with
  its descriptive alt text. Do not replace it with a generic or externally hosted image.
- Authority proof is limited to the five approved points: Aning Design Lab, Lensora Events,
  the Client-Ready WordPress Blueprint, WordPress/React/Firebase implementation, and the
  Graphic Design background at Takoradi Technical University.
- No standalone About route currently exists. The section therefore uses only the verified
  `/contact` primary action and preserves `#about` for existing homepage links.
- On mobile the order is heading, portrait, biography, authority list, then action.

### Responsive and spacing behavior

- Both sections share the homepage 1280px maximum content width and global typography,
  button, spacing, color, and focus tokens.
- Process changes from two columns to one at 1100px. About changes from its portrait/content
  split to one column at 860px; authority proof changes to one column at 560px.
- Tools-to-Process, Process-to-About, and About-to-Client-Results spacing use the shared
  section tokens. Do not add empty spacer elements or change neighboring approved sections.

Phase 4 is implemented. Hero, proof, case studies, Services, Tools, Client Results, YouTube,
Blog, Contact, navigation, and footer remain outside its scope.

## Phase 5: Client Results and Educational Authority

The homepage Client Results and Aning Design Lab implementation lives in:

- `src/components/Testimonials.jsx` and `Testimonials.css`, with the retained testimonial
  set in `src/data/homepageTestimonials.js`.
- `src/components/YoutubeShowcase.jsx` and `YoutubeShowcase.css`, with the curated video
  set in `src/data/youtubeAuthority.js`.

### Client Results rules

- Show exactly three featured testimonials: Opong Bediako, Dr. Olie Kareem, and Nana
  Kwaku. Preserve their existing quote wording.
- Use one large featured testimonial and two supporting testimonials in a stacked right
  column. Do not restore the previous five-card review grid or masonry layout.
- Ratings are removed because no review source is currently documented. Missing companies
  and review-platform details remain omitted.
- Keep the remaining two testimonials in data for a later approved testimonial surface.
  No testimonial archive route currently exists, so this section has no invented action.

### Aning Design Lab rules

- Use a finite, centred swipe carousel with the active video at full emphasis and partial
  previous and next cards visible. The three verified video IDs remain `4YFOaUq6xVE`,
  `jcW0TtM5Zf4`, and `jcEqcDRm0jo`.
- Preserve native touch and trackpad scrolling, mouse drag, keyboard ArrowLeft/ArrowRight,
  finite previous/next controls, and clickable pagination. Neighbouring cards centre first;
  only the active card links directly to YouTube. Do not autoplay.
- Reuse the verified 1280×720 local YouTube thumbnails at
  `/images/blog/what-is-wordpress-beginner-guide-thumbnail.webp`,
  `/images/blog/xampp-wordpress-localhost-tutorial-thumbnail.webp`, and
  `/images/blog/wordpress-dashboard-tutorial-thumbnail.webp`.
- The related guides use `/blog/wordpress-com-vs-wordpress-org-explained-for-beginners`,
  `/blog/how-to-install-wordpress-locally-using-xampp`, and
  `/blog/wordpress-dashboard-tutorial-for-beginners`.
- The channel action uses `https://www.youtube.com/@Aningdesignlab` with safe external-link
  handling. The active thumbnail links directly to YouTube; there is no autoplay, embedded
  player, or API-key-dependent empty state.

### Responsive and spacing behavior

- Client Results and YouTube share the 1280px homepage width and global typography,
  spacing, button, and focus tokens.
- Testimonials stack by 900px. The YouTube active slide is 72% wide on desktop, 80% wide at
  intermediate widths, and 84% wide at 768px and below. Mobile slides remove the inactive
  scale reduction so the neighbouring-card cue remains visible without crowding the active
  video content. Carousel arrows hide below 768px while touch swipe and pagination remain.
- About-to-Client-Results, Client-Results-to-YouTube, and YouTube-to-Blog spacing use the
  shared section tokens. Blog and all later homepage content remain unchanged.

Phase 5 is implemented. Hero through About, Blog, Contact, navigation, and footer remain
outside its scope.

## Phase 6: Editorial Blog and Final Project Enquiry

The homepage Blog and final Contact implementation lives in:

- `src/components/blog/LatestBlogTutorials.jsx` and `LatestBlogTutorials.css`, with the
  curated article order in `src/data/homepageArticles.js`.
- `src/components/Contact.jsx` and `Contact.css`, with the existing FormSubmit workflow
  preserved for both the homepage and `/contact` route.

### Blog rules

- Show one featured article and two supporting articles using one shared homepage article
  card structure. Keep the section editorial and text-led rather than copying the media-led
  Aning Design Lab layout.
- Use these published guides in order: WordPress Dashboard Tutorial for Beginners,
  Install WordPress on Localhost Using XAMPP, and What Is WordPress.
- Verified routes are `/blog/wordpress-dashboard-tutorial-for-beginners`,
  `/blog/how-to-install-wordpress-locally-using-xampp`, and
  `/blog/wordpress-com-vs-wordpress-org-explained-for-beginners`.
- Use the corresponding local 1280x720 thumbnails from `/images/blog/` and metadata from
  the existing blog system. Card actions use `Read the Guide`; the archive action uses
  `View All Guides` at `/blog`.

### Contact rules

- The homepage heading is `Have a website or digital product that needs a clearer
  direction?` with the approved supporting copy and a clearly dominant form.
- Retain Full name, Email, Business or project name, Project type, and Project summary.
  Preserve their field names, required states, FormSubmit action, honeypot, email subject,
  table template, and `/thank-you` redirect.
- The homepage submit label is `Send Project Enquiry` and uses the shared primary button.
- The supporting panel contains the five approved project-fit points, the expectation note,
  and a quiet `Send a Direct Message` action using the existing verified WhatsApp URL.
- The `/contact` route retains its page-specific heading, labels, submit wording, direct
  options and responsive card treatment.

### Responsive behavior

- Blog uses the 1.15/0.85 featured/supporting split on desktop, stacks the featured article
  first by 1100px, and stacks every card by 720px.
- Homepage Contact uses the 1.3/0.7 form/support split and stacks by 1024px. At mobile
  widths all cards, fields, actions and support content remain one column without horizontal
  overflow.
- Both sections use the shared 1280px width, typography, spacing, button and focus systems.

Phase 6 is implemented. Hero through YouTube, Footer, navigation, article pages, and all
other routes remain outside its scope.

## Phase 7: Final Homepage Polish and Quality Assurance

Phase 7 is complete. Navigation, Hero, capability reel, proof row, Selected Work, Lensora,
supporting case studies, Services, Tools, Process, About, Client Results, Aning Design Lab,
Blog, Contact, and Footer are approved and locked against redesign.

### Final consistency corrections

- The primary homepage content boundary remains 1280px. The intentional exceptions are the
  1120px proof rail, 1240px navigation shell, and 1500px YouTube visual stage. Footer content
  now uses the same 1280px boundary as the main homepage sections.
- Duplicate transition padding was removed. At 1440px, Selected Work to Services and Blog to
  Contact now measure 120px; Contact content to Footer content measures 144px.
- Shared buttons now use the registered Switzer Semibold 600 weight. The Footer availability
  label uses Bold 700 instead of the unregistered 800 weight.
- Header icon controls, carousel pagination, floating feedback, back-to-top, and mobile close
  controls retain at least 44px interactive targets. Pagination keeps its small visual dots
  inside the larger semantic button area.
- The header availability message is supporting text rather than a false heading. Homepage
  heading order remains one H1 followed by logical H2, H3, and contextual H4 levels.
- Reduced-motion behavior now covers shared buttons, Footer interactions, feedback controls,
  and back-to-top scrolling in addition to the existing reel, Lensora, project, and carousel
  behavior.
- YouTube mobile sizing was refined to preserve a visible neighbouring-card cue while keeping
  the active title and 44px watch action legible.

### Verification completed

- Responsive widths checked: 1600, 1440, 1280, 1024, 900, 768, 430, 390, 375, and 360px.
- No horizontal overflow was found at any required width.
- Keyboard and interaction checks covered navigation/menu/search, hash navigation, Lensora
  selectors, YouTube arrows/pagination/keyboard/drag/native scroll behavior, form validity,
  feedback dialog focus return, and back-to-top.
- The capability reel exposed all eight items and looped during a 25-second normal-motion
  check. Reduced motion reported true when emulated, kept the reel static, and removed motion
  transition durations.
- Homepage images use local assets with explicit intrinsic dimensions. Below-the-fold project,
  portrait, and article images remain lazy-loaded; YouTube uses local 1280x720 thumbnails.
  No image recompression was required in this phase.
- The final production build completed with 2148 modules and no Vite warnings. The main entry
  is 363.58kB (107.88kB gzip); the lazy BlogPost chunk is 171.46kB (52.47kB gzip). The project
  defines no lint or automated test script.

### Final screenshot paths

Full-page captures:

- `artifacts/phase-7/final/homepage-1440.png`
- `artifacts/phase-7/final/homepage-1024.png`
- `artifacts/phase-7/final/homepage-768.png`
- `artifacts/phase-7/final/homepage-390.png`
- `artifacts/phase-7/final/homepage-360.png`

Focused desktop captures:

- `artifacts/phase-7/final/focus-hero-1440.png`
- `artifacts/phase-7/final/focus-selected-work-1440.png`
- `artifacts/phase-7/final/focus-services-1440.png`
- `artifacts/phase-7/final/focus-process-1440.png`
- `artifacts/phase-7/final/focus-about-1440.png`
- `artifacts/phase-7/final/focus-client-results-1440.png`
- `artifacts/phase-7/final/focus-youtube-1440.png`
- `artifacts/phase-7/final/focus-blog-1440.png`
- `artifacts/phase-7/final/focus-contact-1440.png`
- `artifacts/phase-7/final/focus-footer-1440.png`

Focused mobile captures are also available for YouTube, Contact, and Footer at 390px.

### Unresolved review item

The Phase 7 brief calls the healthcare project `Dr Oliver Reale`, while the repository data,
image filenames, visible website content, service references, and verified live destination
all identify it as `Dr Oliver Rabie`. The verified existing name was preserved. Emmanuel should
confirm before any site-wide client-name change.
