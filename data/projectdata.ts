export type ProjectCategory = "mobile-app" | "web-app" | "website" | "ai-ml";

export type ProjectPlatform = "web" | "android" | "ios" | "dashboard";

export type ProjectLinkKind =
  | "website"
  | "web-app"
  | "play-store"
  | "app-store"
  | "github";

export type ProjectLink = {
  kind: ProjectLinkKind;
  label: string;
  url: string;
};

export type Project = {
  id: string;
  slug: string;
  name: string;
  /** Small square mark, used on list cards and the detail header */
  logo?: string;
  /** Screenshots, shown in the gallery on the detail page */
  images?: string[];
  tagline: string;
  description: string;
  category: ProjectCategory;
  platforms: ProjectPlatform[];
  role: string;
  projectType: "personal" | "client";
  visibility: "public" | "private";
  featured?: boolean;
  order: number;
  /** Primary live URL, used for the main "Visit" button */
  url?: string;
  links: ProjectLink[];
  stack: string[];
};

export const categoryLabel: Record<ProjectCategory, string> = {
  "mobile-app": "Mobile App",
  "web-app": "Web App",
  website: "Website",
  "ai-ml": "AI / ML",
};

export const platformLabel: Record<ProjectPlatform, string> = {
  web: "Web",
  android: "Android",
  ios: "iOS",
  dashboard: "Dashboard",
};

export const linkKindLabel: Record<ProjectLinkKind, string> = {
  website: "Website",
  "web-app": "Web App",
  "play-store": "Android App",
  "app-store": "iOS App",
  github: "Source Code",
};

const play = (id: string): ProjectLink => ({
  kind: "play-store",
  label: "Google Play",
  url: `https://play.google.com/store/apps/details?id=${id}`,
});

const web = (domain: string, label = domain): ProjectLink => ({
  kind: "website",
  label,
  url: `https://${domain}`,
});

export const projects: Project[] = [
  // ── Apps ────────────────────────────────────────────────
  {
    id: "microsolvant",
    slug: "microsolvant",
    name: "Microsolvant",
    logo: "/projects/microsolvant.png",
    // images: ["/projects/microsolvant/dashboard.webp", "/projects/microsolvant/mobile-1.webp"],
    tagline: "Loan management platform for lenders",
    description:
      "Cloud-based money lending management platform for microfinance institutions, SACCOs and lenders, replacing spreadsheets with one system for borrowers, loans, repayments, expenses, teams, analytics and reporting. Includes a landing page, web dashboard and mobile app.",
    category: "mobile-app",
    platforms: ["web", "dashboard", "android"],
    role: "Founder & Lead Developer",
    projectType: "personal",
    visibility: "public",
    featured: true,
    order: 1,
    url: "https://microsolvant.com",
    links: [
      web("microsolvant.com"),
      { kind: "web-app", label: "Web dashboard", url: "https://app.microsolvant.com" },
      play("com.microsolvant"),
    ],
    stack: ["MongoDB", "Express.js", "React Native", "Next.js", "React.js", "TanStack React Query"],
  },
  {
    id: "imani-vet-solutions",
    slug: "imani-vet-solutions",
    name: "Imani Veterinary Solutions",
    logo: "/projects/imani.jpg",
    // images: [],
    tagline: "Vet care and agribusiness marketplace",
    description:
      "Veterinary and agribusiness platform giving farmers access to vet visits, animal drugs, feeds, breeds, farm equipment, farm workers, skilling and expert consultation. Includes a mobile app, public web store and an owner-only admin dashboard.",
    category: "mobile-app",
    platforms: ["web", "android"],
    role: "Lead Developer",
    projectType: "client",
    visibility: "public",
    featured: true,
    order: 2,
    url: "https://imanivetsolutions.com",
    links: [web("imanivetsolutions.com"), play("com.imanivetsolutions")],
    stack: [
      "Supabase", "Better Auth", "Express.js", "React Native", "Next.js", "React.js",
      "Resend", "DigitalOcean", "Cloudflare Workers", "Lucide Icons",
    ],
  },
  {
    id: "muzugu",
    slug: "muzugu",
    name: "Muzugu",
    logo: "/projects/muzugu.png",
    // images: [],
    tagline: "Buy and sell anything locally",
    description:
      "Online classifieds marketplace for buying and selling anything locally, including vehicles, property, phones, electronics, fashion and services. Available on web and Android.",
    category: "mobile-app",
    platforms: ["web", "android"],
    role: "Lead Developer",
    projectType: "client",
    visibility: "public",
    featured: true,
    order: 3,
    url: "https://muzugu.com",
    links: [web("muzugu.com"), play("com.muzugu")],
    stack: [
      "Supabase", "Better Auth", "Express.js", "React Native", "Next.js", "TanStack React Query",
      "Resend", "DigitalOcean", "Cloudflare Workers", "GCP", "Lucide Icons",
    ],
  },
  {
    id: "holy-battlefront",
    slug: "holy-battlefront",
    name: "Holy Battlefront",
    logo: "/projects/holy.png",
    // images: [],
    tagline: "A Bible quiz game for the whole family",
    description:
      "Family-friendly Bible quiz game with Scripture Mode, Story Mode, live events and leaderboards, playable in KJV, WEB, ASV and YLT translations and powered by a Bible API.",
    category: "mobile-app",
    platforms: ["web", "android"],
    role: "Founder & Lead Developer",
    projectType: "personal",
    visibility: "public",
    featured: true,
    order: 4,
    url: "https://holybattlefront.lukwagojoel.com",
    links: [web("holybattlefront.lukwagojoel.com"), play("com.holybattlefront")],
    stack: [
      "MongoDB", "Express.js", "React Native", "Next.js", "TanStack React Query",
      "Bible API", "Resend", "Render", "Lucide Icons",
    ],
  },

  // ── AI / Machine Learning ───────────────────────────────
  {
    id: "skin-disease-ai-detector",
    slug: "skin-disease-ai-detector",
    name: "Skin Disease AI Detector",
    // logo: "/projects/skin-disease-ai-detector.webp",
    // images: [],
    tagline: "Inclusive skin condition detection",
    description:
      "Machine learning diagnostic support tool that analyses uploaded images to detect potential skin conditions on darker skin tones, addressing bias in traditional datasets and improving early, inclusive detection.",
    category: "ai-ml",
    platforms: ["web"],
    role: "Developer",
    projectType: "personal",
    visibility: "public",
    order: 5,
    links: [
      {
        kind: "github",
        label: "GitHub",
        url: "https://github.com/lukwagojoel/Skin-Disease-CNN/tree/main",
      },
    ],
    stack: ["Python", "CNN", "Pandas", "Matplotlib", "TypeScript", "React.js", "Next.js"],
  },

  // ── Websites ────────────────────────────────────────────
  {
    id: "wealth-builders-academy",
    slug: "wealth-builders-academy",
    logo: "/projects/tce.png",
    name: "Wealth Builders Academy",
    tagline: "Financial education platform",
    description:
      "Financial education platform offering courses, literature and coaching, with Pesapal payment integration.",
    category: "website",
    platforms: ["web"],
    role: "Solo Developer & Lead",
    projectType: "client",
    visibility: "public",
    order: 6,
    url: "https://www.tcedigitalinvestments.com",
    links: [web("www.tcedigitalinvestments.com", "tcedigitalinvestments.com")],
    stack: ["React", "TypeScript", "JavaScript", "Git", "Pesapal"],
  },
  {
    id: "carezza-international-school",
    slug: "carezza-international-school",
    name: "Carezza International School",
    logo: "/projects/carezza.jpg",
    tagline: "Early-childhood school website",
    description:
      "Official website of a Christian early-childhood school, presenting its programmes, mission, facilities and contacts.",
    category: "website",
    platforms: ["web"],
    role: "Solo Developer & Lead",
    projectType: "client",
    visibility: "public",
    order: 7,
    url: "https://www.carezzainternational.com",
    links: [web("www.carezzainternational.com", "carezzainternational.com")],
    stack: ["React", "TypeScript", "JavaScript", "Git"],
  },
  {
    id: "tamu-natural-products",
    slug: "tamu-natural-products",
    name: "Tamu Natural Products",
    logo: "/projects/tamu.png",
    tagline: "Organic skincare e-commerce",
    description:
      "E-commerce platform for an organic skincare brand with product catalogue, cart, favourites and customer accounts. Built a custom CMS for managing content, with Firebase Auth for authentication and Firestore for data.",
    category: "website",
    platforms: ["web"],
    role: "Solo Developer & Lead",
    projectType: "client",
    visibility: "public",
    order: 8,
    url: "https://www.tamunaturalproducts.com",
    links: [web("www.tamunaturalproducts.com", "tamunaturalproducts.com")],
    stack: ["React", "TypeScript", "JavaScript", "Git", "Custom CMS", "Firebase", "Firestore", "Firebase Auth"],
  },
  {
    id: "varam-sickle-cell-foundation",
    slug: "varam-sickle-cell-foundation",
    logo: "/projects/varam.jpg",
    name: "Varam Sickle Cell Foundation",
    tagline: "Hope & healthcare for sickle cell patients",
    description:
      "Website for a Soroti-based foundation fighting sickle cell disease, presenting its programmes, events, volunteer sign-up and donations.",
    category: "website",
    platforms: ["web"],
    role: "Solo Developer & Lead",
    projectType: "client",
    visibility: "public",
    order: 9,
    url: "https://www.varamsicklecell.org",
    links: [web("www.varamsicklecell.org", "varamsicklecell.org")],
    stack: ["React", "TypeScript", "JavaScript", "Git"],
  },
  {
    id: "parpac-africa",
    slug: "parpac-africa",
    name: "PARPAC Africa",
    logo: "/projects/parpaca.jpg",
    tagline: "Organisation website with custom CMS",
    description:
      "Organisation website presenting its work, mission and contact information. Built a custom CMS for managing content, with Firebase Auth for authentication and Firestore for data.",
    category: "website",
    platforms: ["web"],
    role: "Solo Developer & Lead",
    projectType: "client",
    visibility: "public",
    order: 10,
    url: "https://www.parpacaafrica.org",
    links: [web("www.parpacaafrica.org", "parpacaafrica.org")],
    stack: ["React", "TypeScript", "JavaScript", "Git", "Custom CMS", "Firebase", "Firestore", "Firebase Auth"],
  },
  {
    id: "dorta-textiles",
    slug: "dorta-textiles",
    logo: "/projects/dorta.jpg",
    name: "Dorta Textiles",
    tagline: "Textiles company website",
    description:
      "Business website for a textiles company showcasing its products and brand.",
    category: "website",
    platforms: ["web"],
    role: "Solo Developer & Lead",
    projectType: "client",
    visibility: "public",
    order: 11,
    url: "https://www.dortatextiles.com",
    links: [web("www.dortatextiles.com", "dortatextiles.com")],
    stack: ["React", "TypeScript", "JavaScript", "Git"],
  },
];

// ── Helpers ───────────────────────────────────────────────
export const getPublicProjects = (): Project[] =>
  projects
    .filter((p) => p.visibility === "public")
    .sort((a, b) => a.order - b.order);

export const getFeaturedProjects = (): Project[] =>
  getPublicProjects().filter((p) => p.featured);

export const getProjectsByCategory = (category: ProjectCategory): Project[] =>
  getPublicProjects().filter((p) => p.category === category);

export const getProjectBySlug = (slug: string): Project | undefined =>
  getPublicProjects().find((p) => p.slug === slug);

export const getAdjacentProjects = (slug: string) => {
  const list = getPublicProjects();
  const i = list.findIndex((p) => p.slug === slug);
  return {
    prev: i > 0 ? list[i - 1] : undefined,
    next: i >= 0 && i < list.length - 1 ? list[i + 1] : undefined,
  };
};