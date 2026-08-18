
export type ProjectFromAPI = {
  id?: string;
  name: string;
  description: string;
  link?: string;
  image?: string;
  stack?: string[];
  projectType?: "personal" | "client";
};

export const DEMO_PROJECTS: ProjectFromAPI[] = [
  {
    id: "1",
    name: "TAMU NATURAL PRODUCTS",
    description: "Custom admin engine and interactive product showcase with UGX currency integration.",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80",
    projectType: "client",
  },
  {
    id: "2",
    name: "IMANI VET SOLUTIONS",
    description: "Veterinary consultation & e-commerce suite optimized for Play Store deployment.",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80",
    projectType: "client",
  },
  {
    id: "3",
    name: "MUZUGU MARKETPLACE",
    description: "Next-gen online classifieds ecosystem with custom exchange branding.",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80",
    projectType: "client",
  },
  {
    id: "4",
    name: "CAREZZA INTERNATIONAL",
    description: "Floating responsive portal & interactive school program structure.",
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80",
    projectType: "client",
  },
  {
    id: "5",
    name: "VARAM FOUNDATION",
    description: "High-performance dynamic gallery component built on Next.js.",
    image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1200&q=80",
    projectType: "client",
  },
];