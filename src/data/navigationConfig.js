export const mainNavLinks = [
  {label: 'Home',href: '/#home'},
  {label: 'Services',href: '/services'},
  {label: 'Projects',href: '/#projects'},
  {label: 'Pricing',href: '/pricing'},
  {label: 'Blog',href: '/blog'},
  {label: 'Contact',href: '/contact'}
]

export const projectLinks = [
  {label: 'Website Design',href: '/#projects'},
  {
    label: 'Graphic Design',
    href: 'https://www.behance.net/emmaaning',
    target: '_blank',
    rel: 'noopener noreferrer'
  },
  {label: 'Startups',href: '/startups'},
  {
    label: 'Books',
    href: '/books'
  }
]

export const serviceMegaMenuGroups = [
  {
    title: 'Core Services',
    links: [
      {title: 'Website Design',href: '/services/website-design',description: 'Clean business websites built for clarity and leads.'},
      {title: 'WordPress Websites',href: '/services/wordpress-websites',description: 'Flexible WordPress sites for service businesses.'},
      {title: 'React Web Apps',href: '/services/react-web-apps',description: 'Fast custom interfaces and web app experiences.'},
      {title: 'Startup MVPs',href: '/services/startup-websites',description: 'Launch-focused MVPs for founders and product ideas.'}
    ]
  },
  {
    title: 'Brand & Content',
    links: [
      {title: 'Graphic Design',href: '/services/graphic-design',description: 'Campaign, launch, and brand visuals.'},
      {title: 'Branding',href: '/services/branding',description: 'Visual identity systems for stronger recognition.'},
      {title: 'Social Media Design',href: '/services/social-media-design',description: 'Scroll-ready graphics for consistent content.'},
      {title: 'UI/UX Design',href: '/services/ui-ux-design',description: 'Clearer screens, flows, and digital experiences.'}
    ]
  }
]

export const whatWeDoLinks = serviceMegaMenuGroups.flatMap((group) => group.links)

export const serviceLinks = whatWeDoLinks.map((service) => ({
  label: service.title,
  href: service.href
}))

export const resourceLinks = [
  {title: 'Blog',href: '/blog',description: 'Tutorials and website-building notes.'},
  {title: 'Pricing',href: '/pricing',description: 'View website, design, and project pricing options.'},
  {title: 'Books',href: '/books',description: 'Practical website-building books and digital resources.'},
  {title: 'Tutorials',href: '/blog',description: 'Practical lessons for web design and AI workflows.'},
  {title: 'Case Studies',href: '/#projects',description: 'Selected website projects and builds.'},
  {title: 'Free Resources',href: '/blog',description: 'Guides, workflow notes, and implementation ideas.'}
]

export const quickLinks = [
  {title: 'Home',href: '/#home'},
  {title: 'About',href: '/#about'},
  {title: 'Projects',href: '/#projects'},
  {title: 'Contact',href: '/contact'},
  {title: 'Startups',href: '/startups'},
  {title: 'Services',href: '/services'},
  {title: 'Pricing',href: '/pricing'},
  {title: 'Blog',href: '/blog'}
]

export const fallbackBlogTopics = [
  'Web Design',
  'UI/UX',
  'Branding',
  'React',
  'Firebase',
  'SEO',
  'Business Websites',
  'Design Systems'
]

export const mobileActionLinks = [
  {title: 'Home',href: '/#home'},
  {title: 'Services',href: '/services'},
  {title: 'Projects',href: '/#projects'},
  {title: 'Pricing',href: '/pricing'},
  {title: 'Blog',href: '/blog'},
  {title: 'Contact',href: '/contact'}
]

export const socialLinks = [
  {label: 'X (Twitter)',href: 'https://x.com/Aningdesigns'},
  {label: 'YouTube',href: 'https://www.youtube.com/channel/UCUBBcAJYllM2DVZ46Wkepxg'}
]
