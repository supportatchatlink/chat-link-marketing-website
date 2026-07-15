/**
 * Global site configuration: identity, nav structure, contact details, SEO.
 * Anything environment-specific comes from `.env.local` (see `.env.example`).
 */

export const siteConfig = {
  name: "Chat-Link",
  legalName: "Chat-Link Communication Limited",
  domain: "chat-link.net",
  founded: 2014,
  // Used for canonical URLs, OG tags, and sitemap. Override per-environment.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://chat-link.net",
  tagline: "Wholesale voice termination and A2P SMS",
  description:
    "Chat-Link Communication Limited is a wholesale telecom carrier delivering A-Z voice termination and bidirectional A2P SMS across Africa, the Middle East, South Asia, and Europe. Direct routes, real-time monitoring, and 24/7 support.",

  contact: {
    email: "interconnection@chat-link.net",
    phoneUsa: "+1 754 736 6826",
  },

  offices: [
    {
      country: "USA",
      address: "1931 NW 150th Avenue, Pembroke Pines, FL 33028",
    },
    {
      country: "Turkey",
      address:
        "Kocatepe Mah. Şehit Muhtar Bey Cad., Sait Şakir Apartmanı No: 18 İç, Kapı No: 3, Beyoğlu, İstanbul",
    },
  ],

  // TODO: confirm — social profiles exist but the URLs weren't supplied.
  // Replace these with the real profile links.
  social: {
    instagram: "https://instagram.com/",
    facebook: "https://facebook.com/",
    linkedin: "https://linkedin.com/",
  },
} as const;

export type NavItem = {
  label: string;
  href: string;
};

/** Primary navigation, shared by the navbar and the mobile menu. */
export const mainNav: NavItem[] = [
  { label: "About us", href: "/about" },
  { label: "Our Services", href: "/services" },
  { label: "Blog", href: "/blog" },
  { label: "Contact Us", href: "/contact" },
];

/** Footer link groups. */
export const footerNav: { title: string; items: NavItem[] }[] = [
  {
    title: "Quick Links",
    items: [
      { label: "Home", href: "/" },
      { label: "About us", href: "/about" },
      { label: "Our Services", href: "/services" },
      { label: "Blog", href: "/blog" },
      { label: "Contact Us", href: "/contact" },
    ],
  },
  {
    title: "Services",
    items: [
      { label: "Wholesale Voice Termination", href: "/services#voice" },
      { label: "SMS Services", href: "/services#sms" },
      { label: "Tailored Telecom Solutions", href: "/services#tailored" },
      { label: "Global Coverage", href: "/#coverage" },
    ],
  },
  {
    title: "Legal",
    items: [
      // TODO: confirm — the privacy policy page doesn't exist yet.
      { label: "Privacy Policy", href: "/privacy" },
    ],
  },
];
