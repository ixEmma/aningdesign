export const selectedWork = [
  {
    id: 'lensora-events',
    title: 'Lensora Events',
    category: 'Event technology / Product design and development',
    summary:
      'A QR-based event media platform that lets guests upload photos and videos while organizers manage one shared event gallery.',
    challenge:
      'Make guest uploads immediate without requiring an app or account, while preserving organizer control.',
    role: 'Product strategy, UI/UX design and React implementation.',
    outcome:
      'A working event workflow with uploads, galleries, organizer controls and paid plan upgrades.',
    technologies: ['React', 'Firebase', 'Paystack', 'Vite'],
    showcaseIntro:
      'A QR-based event photo-sharing platform that lets guests upload photos while organizers manage live galleries, event access, storage and paid plans.',
    features: [
      {
        id: 'guest-uploads',
        title: 'Guest uploads',
        description:
          'Guests join through a QR code or event link and upload media without installing an application.',
        image: '/images/projects/lensora-browser-upload-gallery.webp',
        imageAlt:
          'Lensora mobile browser screens showing a guest photo upload and the event gallery.',
        width: 892,
        height: 939,
        visualLayout: 'phones',
        detailFocus: 'upload',
        detailTitle: 'Browser upload',
        detailText: 'Guests can add photos or videos without installing an app or creating an account.'
      },
      {
        id: 'live-gallery',
        title: 'Live event gallery',
        description:
          'Approved event photos appear inside one shared gallery as guests contribute.',
        image: '/images/projects/lensora-browser-upload-gallery.webp',
        imageAlt:
          'Lensora mobile event gallery filled with photos contributed during an event.',
        width: 892,
        height: 939,
        visualLayout: 'phones',
        detailFocus: 'gallery',
        detailTitle: 'Shared gallery',
        detailText: 'Approved moments can appear in the gallery while the event is still active.'
      },
      {
        id: 'event-workflow',
        title: 'QR-to-gallery workflow',
        description:
          'One organizer setup prepares the upload link, QR, gallery and slideshow for the event.',
        image: '/images/projects/lensora-landing-page-1600.webp',
        imageSrcSet:
          '/images/projects/lensora-landing-page-768.webp 768w, /images/projects/lensora-landing-page-1200.webp 1200w, /images/projects/lensora-landing-page-1600.webp 1600w',
        imageAlt:
          'Lensora Events product overview connecting one QR upload link with a shared live event gallery.',
        width: 1600,
        height: 900,
        visualLayout: 'overview',
        detailFocus: 'overview',
        detailTitle: 'One shared event',
        detailText: 'One QR upload link connects guest photos and videos to the live gallery.'
      }
    ],
    image: '/images/projects/lensora-landing-page-1600.webp',
    imageSrcSet:
      '/images/projects/lensora-landing-page-768.webp 768w, /images/projects/lensora-landing-page-1200.webp 1200w, /images/projects/lensora-landing-page-1600.webp 1600w',
    imageAlt:
      'Lensora Events landing page showing QR guest uploads and a live event gallery.',
    width: 1600,
    height: 900,
    href: 'https://lensoraevents.com/',
    status: 'Live beta',
    actionLabel: 'Explore the Product',
    featured: true,
  },
  {
    id: 'aburi-sweetmother',
    title: 'Aburi Sweetmother Guesthouse',
    category: 'Hospitality website · WordPress design and development',
    summary:
      'A hospitality website designed to present the guesthouse experience clearly, showcase the property and guide visitors toward rooms, enquiries and bookings.',
    challenge:
      'Present the guesthouse as a credible destination while keeping rooms, amenities, location and booking actions easy to understand.',
    role:
      'Website strategy, visual design, responsive WordPress development and content presentation.',
    outcome:
      'A clearer hospitality experience that combines strong property imagery, essential visitor information and direct booking paths.',
    technologies: ['WordPress', 'Elementor', 'Responsive design'],
    image: '/images/projects/aburi-sweetmother-homepage-preview.webp',
    imageAlt:
      'Aburi Sweetmother Guesthouse homepage showing navigation, welcome headline, rating and property photography.',
    width: 1440,
    height: 900,
    href: 'https://aburisweetmother.com/',
    status: 'Launched',
    actionLabel: 'Visit Website',
  },
  {
    id: 'dr-oliver-rabie',
    title: 'Dr Oliver Rabie',
    category: 'Healthcare website · Service and booking journeys',
    summary:
      'A private healthcare website that explains GP and lifestyle medicine services and gives patients direct booking paths.',
    challenge:
      'Organize a broad clinical offer so visitors can understand services and move from trust-building content to appointments.',
    role: 'Website structure, interface design and service-page implementation.',
    outcome:
      'A live service website connecting health checks, GP appointments, coaching and specialist support to booking and contact routes.',
    technologies: ['Squarespace', 'Responsive design', 'Booking integration'],
    image: '/images/projects/dr-oliver-rabie-homepage-preview.webp',
    imageAlt:
      'Dr Oliver Rabie website services section showing the My Services heading and three healthcare service cards.',
    width: 1440,
    height: 900,
    href: 'https://www.droliverrabie.co.uk/',
    status: 'Launched',
    actionLabel: 'Visit Website',
  },
]
