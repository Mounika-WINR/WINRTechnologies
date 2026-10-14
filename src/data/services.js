export const NAV = [
  { label: "Home", href: "#home" },
  {
    label: "About", href: "#/who-we-are", hasMenu: true,
    drop: [
      { t: "Who We Are", d: "Team, mission & story", h: "#/who-we-are" },
      { t: "Leadership", d: "The people behind WINR", h: "#/leadership" },
      { t: "Partnerships", d: "Alliances that amplify", h: "#/partnerships" },
      { t: "Technology & Innovation", d: "How we build & deliver", h: "#/technology-innovation" },
    ],
  },
  {
    label: "Our Services", href: "#services", hasMenu: true,
    drop: [
      { t: "Web Development", d: "Sites, web apps, e-commerce", h: "#/services/web-development" },
      { t: "App Development", d: "Native + cross-platform", h: "#/services/app-development" },
      { t: "Software Development", d: "Systems, APIs, integrations", h: "#/services/software-development" },
      { t: "Strategic Staffing Solutions", d: "Talent that fits your roadmap", h: "#/services/training" },
    ],
  },
  {
    /* Industries dropdown hidden for now — single consolidated page.
       href still points to the consolidated Industries page. */
    label: "Industries", href: "#/industries",
  },
  /* "For Talent" menu hidden for now — kept out of the navbar.
     Routes (#/talent, #/talent/resume-portal) still exist if navigated directly. */
  { label: "Contact", href: "#/contact" },
];

export const HERO = {
  eyebrow: "WINR TECHNOLOGIES PVT LTD",
  titleTop: "IT Services & Digital",
  titleAccent: "Solutions That",
  titleBottom: "Power Business Growth",
  desc: "WINR Technologies builds websites, mobile apps, and custom software — and trains talent to use them. End-to-end IT services from a team with deep domain expertise and a focus on measurable outcomes.",
  primaryCta: { label: "GET FREE CONSULTATION", href: "#contact" },
  secondaryCta: { label: "EXPLORE OUR SERVICES", href: "#services" },
  tagline: "WE Build What Moves YOU Forward",
};

export const SERVICES_INTRO = {
  title: "Comprehensive IT & Digital Services",
  desc: "From websites and mobile apps to custom software and professional training, WINR Technologies delivers end-to-end technology services that drive business growth.",
};

// The 4 cards that go INSIDE the folder (replaces Framer template's 3 prints)
export const SERVICE_CARDS = [
  {
    id: "web",
    shape: "diamond",
    title: "Web Development",
    desc: "Responsive websites, web apps, and e-commerce platforms built for performance, SEO, and conversions.",
    cta: "EXPLORE SOLUTIONS",
    href: "#/services/web-development",
    accent: "#F97316",
  },
  {
    id: "app",
    shape: "circle",
    title: "App Development",
    desc: "Native and cross-platform mobile apps with clean UX, cloud backends, and scalable architecture.",
    cta: "LEARN MORE",
    href: "#/services/app-development",
    accent: "#F97316",
  },
  {
    id: "software",
    shape: "square",
    title: "Software Development",
    desc: "Custom business systems, APIs, and integrations engineered around how your organisation actually works.",
    cta: "VIEW CAPABILITIES",
    href: "#/services/software-development",
    accent: "#F97316",
  },
  {
    id: "training",
    shape: "hex",
    title: "Strategic Staffing Solutions",
    desc: "Flexible strategic staffing solutions that connect your team with technology talent aligned to your goals.",
    cta: "EXPLORE SOLUTIONS",
    href: "#/services/training",
    accent: "#F97316",
  },
];

// Folder = ONLY brand blue (no theme dots). Matches live-site blue cards.
export const FOLDER_THEMES = [
  { name: "WINR Blue", color: "#1E3A5F" },
];

export const CTA_SECTION = {
  // 5. 3rd PAGE content (matches sketch: tagline top-center, content below,
  // pillars as single lines left, ticks one-after-one right, quote btn center)
  tagline: "Transform Your Vision into a Powerful Digital Reality with Experts",
  title: "Transform Your Vision into a Powerful Digital Reality with Experts",
  desc: "Join 20+ clients who trust WINR Technologies for web, app, software, and training engagements. Get a free consultation and project roadmap today.",
  label: "WHAT WE'RE BUILDING TOWARD",
  pillars: [
    "Trusted IT partner for Indian SMEs",
    "Transparent, outcome-driven engagements",
    "A small team focused on measurable delivery",
  ],
  primary: { label: "GET YOUR FREE CONSULTATION", href: "#contact" },
  secondary: { label: "REQUEST A PROJECT QUOTE", href: "#quote" },
  ticks: [
    "No obligation consultation",
    "Clear scope & timeline",
    "Technical recommendations included",
  ],
};

export const FOOTER = {
  about:
    "IT services that build digital products and train the talent to run them — web, apps, software, and professional development.",
  address:
    "11-1-7, Meenakshi Manor, 2nd Floor, Above HDFC Bank, 3 Lights Junction, Ramarao Pet, Kakinada – 533004, Andhra Pradesh, India",
  phone: "+91-8074543183",
  newsletterTitle: "STAY CONNECTED",
  newsletterDesc:
    "Get practical IT, product, and training insights in your inbox.",
  copyright: "© 2026 WINR Technologies Pvt Ltd. All rights reserved.",
};
