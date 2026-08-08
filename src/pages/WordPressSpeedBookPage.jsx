import { useState, useEffect } from 'react'
import { ArrowRight, CheckCircle2, Download, ExternalLink, ShieldCheck, X } from 'lucide-react'
import { useSeo } from '../utils/seo'
import { getDomain } from '../utils/domain'
import './Books.css'

const previewPages = [
  {
    id: 'ai-assisted-reading',
    title: 'AI-Assisted Reading Guide',
    src: '/images/books/wordpress-speed-with-ai-agent/preview-ai-assisted-reading.png',
    alt: 'Preview page showing AI-assisted reading instructions from the guide.'
  },
  {
    id: 'cycle-outcomes',
    title: 'Cycle Outcomes & Statuses',
    src: '/images/books/wordpress-speed-with-ai-agent/preview-cycle-outcomes.png',
    alt: 'Preview page explaining cycle outcome statuses and decision checkpoints.'
  },
  {
    id: 'novamira-prompt',
    title: 'Plug-and-Play Agent Prompt',
    src: '/images/books/wordpress-speed-with-ai-agent/preview-novamira-prompt.png',
    alt: 'Preview page showing the copy-ready NovaMira agent prompt.'
  },
  {
    id: 'weak-baseline',
    title: 'Weak Baseline Audit',
    src: '/images/books/wordpress-speed-with-ai-agent/preview-weak-baseline.png',
    alt: 'Preview page showing a weak baseline performance audit example.'
  },
  {
    id: 'comparable-improvement',
    title: 'Comparable Speed Improvement',
    src: '/images/books/wordpress-speed-with-ai-agent/preview-comparable-improvement.png',
    alt: 'Preview page showing verified speed improvements after controlled fixes.'
  }
]

const workflowSteps = [
  ['01', 'Connect', 'Establish a secure, authorized connection between your WordPress site and the AI agent.'],
  ['02', 'Safeguard', 'Confirm backups, priority pages, and safety boundaries before touching any setting.'],
  ['03', 'Audit', 'Run a performance diagnostic to pinpoint the single strongest confirmed bottleneck.'],
  ['04', 'Fix', 'Apply one isolated, safe, and fully reversible setting or code optimization.'],
  ['05', 'Verify', 'Re-test page speed and compare empirical metrics directly against the baseline.'],
  ['06', 'Continue / Stop', 'Keep the fix if performance improved, or revert immediately if metrics did not improve.'],
  ['07', 'Report', 'Document the verified change and move systematically to the next bottleneck.']
]

const novamiraSteps = [
  ['1', 'Install & Activate NovaMira', 'Install NovaMira on your WordPress site and enable AI Abilities.'],
  ['2', 'Create Application Password', 'Generate a secure WordPress Application Password for authorization.'],
  ['3', 'Send Setup & Guide Prompt', 'Copy NovaMira setup prompt + Chapter 2 instructions to your agent.'],
  ['4', 'Verify & Start Optimizing', 'Reload agent workspace and verify tools, domain, and auth status.']
]

const audienceList = [
  'WordPress freelancers',
  'Elementor designers',
  'Small web agencies',
  'Junior developers',
  'WordPress maintenance providers',
  'Technically confident site owners'
]

const faqs = [
  {
    q: 'Do I need to be a developer?',
    a: 'No. The guide is written in plain language for freelancers, designers, and site owners. It provides clear, copy-paste prompts and step-by-step rules so you do not need to write code or configure servers manually.'
  },
  {
    q: 'Which AI agents can I use?',
    a: 'You can use any modern AI agent or assistant capable of calling tools or following structured system prompts, including Claude, Cursor, Antigravity, or similar agentic AI tools.'
  },
  {
    q: 'Is NovaMira required for the exact workflow in this edition?',
    a: 'Yes. NovaMira provides the secure bridge and AI abilities required for the agent to inspect, test, and apply changes safely inside WordPress.'
  },
  {
    q: 'Does the guide guarantee a specific Lighthouse score?',
    a: 'No. The guide teaches an evidence-based workflow. Real-world performance results depend on your host, server resources, theme, and site complexity. The guide guarantees a safe, measurable process—not a fixed score.'
  },
  {
    q: 'What is a WordPress speed optimization guide?',
    a: 'A WordPress speed optimization guide is a structured way to diagnose why a WordPress site feels slow, separate real bottlenecks from noise, apply one controlled fix at a time, and verify the result with evidence instead of guesswork.'
  },
  {
    q: 'How do I find out why my WordPress site is slow?',
    a: 'The process starts with a baseline audit, a clear checklist of what to test, and a look at the biggest user-facing bottlenecks such as large images, unneeded scripts, plugin overhead, caching gaps, and slow server response. The guide focuses on one confirmed bottleneck at a time so the cause of a slowdown is easier to isolate.'
  },
  {
    q: 'Does the guide cover Core Web Vitals and Lighthouse testing?',
    a: 'Yes. The guide explains how to use Lighthouse, PageSpeed Insights, and Core Web Vitals as part of a broader WordPress performance testing process, while keeping the workflow centered on evidence and repeatable comparisons.'
  },
  {
    q: 'Can I use this process on client websites?',
    a: 'Yes, provided you have explicit permission, an active restorable backup, and clear safety limits established before initiating optimization cycles.'
  },
  {
    q: 'Is this an official WordPress publication?',
    a: 'No. This is an independent professional workflow guide created by Emmanuel Kwabena Aning for designers, builders, and website owners.'
  },
  {
    q: 'What format is the guide?',
    a: 'You will receive a 71-page fixed-layout PDF digital guide delivered instantly via Payhip upon purchase.'
  }
]

function SectionHeading({ eyebrow, title, id, intro }) {
  return (
    <div className="book-funnel__heading">
      <p className="type-eyebrow">{eyebrow}</p>
      <h2 id={id} className="type-h2">{title}</h2>
      {intro && <p className="type-body book-funnel__intro">{intro}</p>}
    </div>
  )
}

export default function WordPressSpeedBookPage({ book }) {
  const domain = getDomain()
  const [activePreview, setActivePreview] = useState(null)
  const payhipUrl = 'https://payhip.com/b/UMfoY'

  useSeo({
    title: 'WordPress Speed Optimization Guide with AI Agent | AningDesign',
    description: 'A practical WordPress speed optimization guide using AI agents, safe reversible fixes, Lighthouse testing, Core Web Vitals, and evidence-based verification.',
    canonical: `${domain}/books/wordpress-speed-with-ai-agent`,
    image: `${domain}/images/books/wordpress-speed-with-ai-agent/cover.png`,
    keywords: 'wordpress speed optimization guide, wordpress performance optimization, slow wordpress website, wordpress speed audit, core web vitals, lighthouse, wordpress ai agent, ai agent for wordpress, wordpress performance testing',
    type: 'product'
  })

  useEffect(() => {
    const schemaId = 'wordpress-speed-book-schema'
    let script = document.getElementById(schemaId)

    if (!script) {
      script = document.createElement('script')
      script.id = schemaId
      script.type = 'application/ld+json'
      document.head.appendChild(script)
    }

    script.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Book',
      name: 'WordPress Speed with AI Agent',
      description: 'A practical WordPress speed optimization guide using AI agents, safe reversible fixes, Lighthouse testing, Core Web Vitals, and evidence-based verification.',
      image: `${domain}/images/books/wordpress-speed-with-ai-agent/cover.png`,
      url: `${domain}/books/wordpress-speed-with-ai-agent`,
      inLanguage: 'en',
      bookFormat: 'https://schema.org/PDFFormat',
      numberOfPages: 71,
      author: {
        '@type': 'Person',
        name: 'Emmanuel Kwabena Aning'
      },
      offers: {
        '@type': 'Offer',
        url: payhipUrl,
        price: '24',
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock'
      }
    })

    return () => script.remove()
  }, [domain, payhipUrl])

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setActivePreview(null)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const teaserPdfUrl = '/pdf/wordpress-speed-with-ai-agent-teaser-preview.pdf'

  return (
    <main className="book-detail-page book-detail-page--rhythm book-funnel book-funnel--speed">
      {/* HERO SECTION */}
      <section className="book-funnel__hero" aria-labelledby="speed-hero-title">
        <div className="books-shell book-funnel__hero-grid">
          <div className="book-funnel__hero-copy">
            <p className="type-eyebrow">WordPress Performance + AI</p>
            <h1 id="speed-hero-title" className="type-h1">WordPress Speed with AI Agent</h1>
            <p className="type-body-large book-funnel__hero-intro">
              A practical WordPress speed optimization guide for diagnosing slow WordPress websites, identifying the strongest confirmed performance bottleneck, applying one safe reversible change at a time, and verifying the result with an AI agent.
            </p>

            <div className="speed-hero-pricing">
              <span className="speed-price-was" aria-label="Regular price $39">$39</span>
              <strong className="speed-price-now">$24 USD</strong>
              <span className="book-edition-label">Launch Edition</span>
            </div>

            <div className="book-funnel__hero-actions">
              <a
                href={payhipUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="aning-button aning-button--primary aning-button--large"
                aria-label="Get the WordPress Speed with AI Agent guide on Payhip (opens in new tab)"
              >
                Get the Guide
                <ArrowRight size={17} aria-hidden="true" />
              </a>
              <a
                href={teaserPdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="aning-button aning-button--secondary aning-button--large"
                aria-label="Preview 15 sample pages from the guide (opens in new tab)"
              >
                Preview the Guide
                <Download size={17} aria-hidden="true" />
              </a>
            </div>

            <p className="type-small speed-hero-meta-note">
              <ShieldCheck size={16} aria-hidden="true" />
              <span>71-Page Fixed-Layout PDF • Immediate Digital Download</span>
            </p>
          </div>

          <figure className="book-funnel__hero-visual">
            <img
              src="/images/books/wordpress-speed-with-ai-agent-transparent.png"
              alt="WordPress Speed with AI Agent 3D book mockup by Emmanuel Kwabena Aning."
              width="947"
              height="1135"
              loading="eager"
              decoding="async"
            />
          </figure>
        </div>
      </section>

      <div className="books-shell book-detail-content">
        {/* SUMMARY / VALUE STRIP */}
        <section className="book-summary-strip" aria-label="Product Summary">
          <dl>
            <div><dt>Format</dt><dd>Digital PDF guide</dd></div>
            <div><dt>Pages</dt><dd>71 fixed-layout pages</dd></div>
            <div><dt>Price</dt><dd>$24 USD Launch Edition</dd></div>
            <div><dt>Delivery</dt><dd>Immediate Payhip download</dd></div>
          </dl>
        </section>

        {/* WHY THIS GUIDE EXISTS */}
        <section className="book-section book-funnel__outcome" aria-labelledby="speed-problem-title">
          <div className="book-funnel__outcome-copy">
            <SectionHeading eyebrow="Why this guide exists" title="Stop guessing why your WordPress site is slow." id="speed-problem-title" />
          </div>
          <div className="book-funnel__outcome-detail">
            <p className="type-body-large">Optimizing WordPress speed is often frustrating because standard advice relies on trial and error, and a slow WordPress website rarely has only one obvious cause.</p>
            <p className="type-body">A WordPress speed optimization workflow becomes unreliable when a site owner changes plugins, theme settings, and caching rules all at once without a baseline. That makes it difficult to know which adjustment improved performance and which one made the site worse, especially when PageSpeed Insights or Lighthouse reports are read without context.</p>
          </div>
        </section>

        {/* 7-STEP WORKFLOW */}
        <section className="book-section" aria-labelledby="speed-workflow-title">
          <SectionHeading
            eyebrow="The 7-step evidence workflow"
            title="One safe, reversible fix at a time."
            id="speed-workflow-title"
            intro="A disciplined WordPress performance optimization workflow where every change is tested against a baseline, measured with comparable data, and kept only when evidence supports the result."
          />
          <div className="book-funnel__workflow-layout">
            <ol className="book-funnel__steps">
              {workflowSteps.map(([number, name, detail]) => (
                <li key={number}>
                  <span aria-hidden="true">{number}</span>
                  <div>
                    <h3 className="type-h3">{name}</h3>
                    <p className="type-small">{detail}</p>
                  </div>
                </li>
              ))}
            </ol>
            <figure className="book-funnel__media-card">
              <img
                src="/images/books/wordpress-speed-with-ai-agent/inside-guide-page-fan.png"
                alt="Inside pages from WordPress Speed with AI Agent."
                width="1600"
                height="1000"
                loading="lazy"
                decoding="async"
              />
            </figure>
          </div>
        </section>

        {/* INSIDE THE GUIDE & PREVIEW GALLERY */}
        <section className="book-section section-space--spacious" id="book-preview" aria-labelledby="speed-inside-title">
          <SectionHeading
            eyebrow="Inside the guide"
            title="Practical rules, prompts, and evidence checklists."
            id="speed-inside-title"
            intro="Step-by-step instructions, plug-and-play prompts, and decision trees designed for a WordPress speed optimization checklist that helps you verify what changed before and after each performance fix."
          />
          <div className="book-funnel__preview-grid speed-preview-cards-grid">
            {previewPages.map((page) => (
              <button
                type="button"
                key={page.id}
                className="book-funnel__media-card speed-preview-thumb-btn"
                onClick={() => setActivePreview(page)}
                aria-label={`Enlarge preview: ${page.title}`}
              >
                <img src={page.src} alt={page.alt} width="600" height="400" loading="lazy" decoding="async" />
                <span className="speed-preview-thumb-caption">{page.title}</span>
              </button>
            ))}
          </div>
        </section>

        {/* NOVAMIRA SECTION */}
        <section className="book-section" aria-labelledby="speed-novamira-title">
          <SectionHeading
            eyebrow="Beginner-first connection"
            title="Connect your AI agent in minutes."
            id="speed-novamira-title"
            intro="No command-line code, no custom JSON editing, and no server configuration. This workflow is designed for a WordPress AI agent setup that helps with guided testing, not for magical performance gains. NovaMira and the guide's prompt handle private setup automatically."
          />
          <div className="book-funnel__workflow-layout">
            <ol className="book-funnel__steps">
              {novamiraSteps.map(([num, title, detail]) => (
                <li key={num}>
                  <span aria-hidden="true">0{num}</span>
                  <div>
                    <h3 className="type-h3">{title}</h3>
                    <p className="type-small">{detail}</p>
                  </div>
                </li>
              ))}
            </ol>
            <div className="speed-novamira-info-card">
              <h3 className="type-h3">Safe & Private Authorization</h3>
              <p className="type-body">NovaMira provides the secure bridge and AI abilities required for an AI agent for WordPress to inspect, test, and apply performance fixes within defined boundaries. The guide explains how that connection works as part of a broader WordPress MCP-style workflow, while keeping the actual performance decisions grounded in measured evidence rather than automation alone.</p>
              <ul className="book-simple-list">
                <li><CheckCircle2 size={16} aria-hidden="true" /><span>Strict capability boundaries</span></li>
                <li><CheckCircle2 size={16} aria-hidden="true" /><span>WordPress Application Password security</span></li>
                <li><CheckCircle2 size={16} aria-hidden="true" /><span>Full rollback safety for every setting change</span></li>
              </ul>
            </div>
          </div>
        </section>

        {/* EVIDENCE SECTION */}
        <section className="book-section section-space--spacious" aria-labelledby="speed-evidence-title">
          <SectionHeading
            eyebrow="Evidence & verification"
            title="Verify with evidence—don't guess."
            id="speed-evidence-title"
            intro="Measure baseline performance, run a WordPress performance testing pass, apply one isolated change, retest under comparable conditions, and only keep the change if the data supports the improvement. Lighthouse, PageSpeed Insights, and Core Web Vitals are useful signals, but they work best when interpreted alongside the actual site context."
          />
          <figure className="book-funnel__media-card speed-evidence-media">
            <img
              src="/images/books/wordpress-speed-with-ai-agent/performance-evidence-comparison.png"
              alt="Performance evidence comparison showing baseline audit versus comparable speed improvement."
              width="1600"
              height="900"
              loading="lazy"
              decoding="async"
            />
          </figure>
          <p className="type-small speed-evidence-note">
            <em>Note:</em> The scores above illustrate actual test sequence outputs documented inside the guide. Performance metrics vary based on hosting, theme, and site configuration.
          </p>
        </section>

        {/* WHAT YOU GET & OFFER SECTION */}
        <section className="book-section book-funnel__purchase section-space--spacious" id="editions" aria-labelledby="speed-offer-title">
          <SectionHeading eyebrow="Launch Edition" title="Get the guide & start optimizing." id="speed-offer-title" />
          <div className="book-edition-grid">
            <article className="book-edition-card book-edition-card--featured">
              <div className="book-edition-card-heading">
                <div>
                  <p className="book-edition-label">Launch Edition</p>
                  <h3 className="type-h3">WordPress Speed with AI Agent</h3>
                </div>
                <div className="speed-card-price-stack">
                  <span className="speed-price-was">$39</span>
                  <strong>$24 USD</strong>
                </div>
              </div>
              <p className="type-body">The complete 71-page fixed-layout digital guide for diagnosing slow WordPress sites, applying safe reversible fixes, and verifying speed with an AI agent.</p>
              <ul>
                <li><CheckCircle2 size={18} aria-hidden="true" /><span>71-page fixed-layout PDF digital guide</span></li>
                <li><CheckCircle2 size={18} aria-hidden="true" /><span>Reusable NovaMira setup & audit prompts</span></li>
                <li><CheckCircle2 size={18} aria-hidden="true" /><span>Checklists, workflow templates, & appendix tools</span></li>
                <li><CheckCircle2 size={18} aria-hidden="true" /><span>Immediate PDF download via Payhip</span></li>
              </ul>
              <p className="book-edition-note">15-page free preview available before purchase.</p>
              <a href={payhipUrl} target="_blank" rel="noopener noreferrer" className="aning-button aning-button--primary">
                Get the Guide
                <ExternalLink size={17} aria-hidden="true" />
              </a>
            </article>

            <article className="book-edition-card">
              <div className="book-edition-card-heading">
                <div>
                  <h3 className="type-h3">Free Book Preview</h3>
                </div>
                <strong>Free</strong>
              </div>
              <p className="type-body">Inspect the teaching style, structure, and selected pages before purchasing the full guide.</p>
              <ul>
                <li><CheckCircle2 size={18} aria-hidden="true" /><span>15 sample pages from the guide</span></li>
                <li><CheckCircle2 size={18} aria-hidden="true" /><span>Table of contents & workflow overview</span></li>
                <li><CheckCircle2 size={18} aria-hidden="true" /><span>Direct PDF download</span></li>
              </ul>
              <a href={teaserPdfUrl} target="_blank" rel="noopener noreferrer" className="aning-button aning-button--secondary">
                Download Free Preview
                <Download size={17} aria-hidden="true" />
              </a>
            </article>
          </div>
        </section>

        {/* WHO IT IS FOR */}
        <section className="book-section" aria-labelledby="speed-audience-title">
          <SectionHeading eyebrow="Who it is for" title="Built for WordPress professionals and site owners." id="speed-audience-title" />
          <ul className="book-funnel__audience-list">
            {audienceList.map((item) => (
              <li className="type-body" key={item}>{item}</li>
            ))}
          </ul>
        </section>

        {/* AUTHOR */}
        <section className="book-section book-funnel__author" aria-labelledby="speed-author-title">
          <SectionHeading eyebrow="Author" title="Emmanuel Kwabena Aning" id="speed-author-title" />
          <p className="type-body">Emmanuel Kwabena Aning created this guide to provide a controlled, evidence-first alternative to trial-and-error WordPress speed optimization.</p>
        </section>

        {/* FAQ SECTION */}
        <section className="book-section section-space--spacious" aria-labelledby="speed-faq-title">
          <SectionHeading eyebrow="FAQ" title="Questions before purchasing." id="speed-faq-title" />
          <div className="book-faq-list">
            {faqs.map((faq) => (
              <details key={faq.q}>
                <summary>{faq.q}</summary>
                <p className="type-body">{faq.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* FINAL CTA SECTION */}
        <section className="book-final-cta section-space--spacious" aria-labelledby="speed-final-cta-title">
          <p className="type-eyebrow">WordPress Performance + AI</p>
          <h2 id="speed-final-cta-title" className="type-h2">Optimize WordPress speed with evidence, not trial & error.</h2>
          <p className="type-body-large">Get instant access to the 71-page digital guide for $24 USD.</p>
          <div className="book-final-actions">
            <a href={payhipUrl} target="_blank" rel="noopener noreferrer" className="aning-button aning-button--primary">
              Get the Guide ($24 USD)
              <ExternalLink size={17} aria-hidden="true" />
            </a>
            <a href={teaserPdfUrl} target="_blank" rel="noopener noreferrer" className="aning-button aning-button--secondary">
              Preview the Guide
            </a>
          </div>
        </section>
      </div>

      {/* LIGHTBOX MODAL FOR PREVIEW PAGES */}
      {activePreview && (
        <div
          className="speed-lightbox-overlay"
          onClick={() => setActivePreview(null)}
          role="dialog"
          aria-modal="true"
          aria-label={activePreview.title}
        >
          <div className="speed-lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="speed-lightbox-close"
              onClick={() => setActivePreview(null)}
              aria-label="Close preview modal"
            >
              <X size={22} aria-hidden="true" />
            </button>
            <img src={activePreview.src} alt={activePreview.alt} />
            <p className="speed-lightbox-title">{activePreview.title}</p>
          </div>
        </div>
      )}
    </main>
  )
}
