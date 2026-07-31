export const homepageTestimonials = [
  {
    id: 1,
    context: 'Website redesign',
    quote:
      'Emmanuel completely redesigned our restaurant website. Bookings increased by 45% in the first month. The site loads fast and customers love the menu integration.',
    name: 'Opong Bediako',
    role: 'Restaurant Owner',
    service: 'Restaurant website redesign',
    rating: 4.9,
    source: null,
    featured: true
  },
  {
    id: 2,
    context: 'Search visibility',
    quote:
      'My e-commerce store went from barely ranking to page one for all my target keywords. SEO work was technical but the results speak for themselves.',
    name: 'Kyekyeku Mensah',
    role: 'E-commerce Founder',
    service: 'E-commerce SEO',
    rating: 5,
    source: null,
    featured: false
  },
  {
    id: 3,
    context: 'Performance and migration',
    quote:
      'Migrated our WordPress site to a faster platform. Page speed improved dramatically and our conversion rate went up 32%. Highly recommend.',
    name: 'Dr. Olie Kareem',
    role: 'Medical Consultant',
    service: 'WordPress migration and performance',
    rating: 4.9,
    source: null,
    featured: true
  },
  {
    id: 4,
    context: 'E-commerce redesign',
    quote:
      'The Shopify redesign transformed how we present our products. Mobile experience is smooth, checkout is optimized, and sales have increased consistently.',
    name: 'Miss Thelma Addo',
    role: 'Fashion Brand Owner',
    service: 'Shopify redesign',
    rating: 4.8,
    source: null,
    featured: false
  },
  {
    id: 5,
    context: 'Project delivery',
    quote:
      'Professional, responsive, and delivered exactly what we needed. Our real estate website now generates quality leads automatically.',
    name: 'Nana Kwaku',
    role: 'Real Estate Agency',
    service: 'Real estate website development',
    rating: 5,
    source: null,
    featured: true
  }
]

export const featuredHomepageTestimonials = homepageTestimonials.filter(
  (testimonial) => testimonial.featured
)
