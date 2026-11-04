/**
 * =========================================================================
 * PROJECTS DATA REPOSITORY
 * -------------------------------------------------------------------------
 * To add a new project, simply append an object to the `PROJECTS` array below.
 * The UI will automatically render your new project card, apply responsive
 * grid styling, and include it in category filters.
 * =========================================================================
 */

export type ProjectCategory =
  | "websites"
  | "apps"
  | "ai-agents"
  | "google-business-profile";

export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  image: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured?: boolean;
  category: ProjectCategory;
  stats?: string;
}

/**
 * PROJECTS DATA REPOSITORY
 * -------------------------------------------------------------------------
 * Currently blank as requested. Projects will be populated later.
 * When adding projects, specify category as "websites" | "apps" | "ai-agents" | "google-business-profile".
 */
export const PROJECTS: readonly Project[] = [
  {
    id: "personal-portfolio",
    title: "Personal Portfolio Website",
    tagline: "Next.js 16 • React 19 • TypeScript • Tailwind CSS",
    description:
      "Modern, animated personal portfolio website showcasing engineering skills, interactive 3D perspective decks, verified certifications, and academic achievements with a refined Charcoal + Orange theme.",
    image: "/images/projects/portfolio-website.jpg",
    technologies: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "Canvas API",
    ],
    githubUrl: "https://github.com/Sandesh-Ganpati-Waghmare773/sandeshportfolio",
    liveUrl: "https://sandeshportfolio-sandy.vercel.app",
    featured: true,
    category: "websites",
    stats: "Production Live",
  },
  {
    id: "pune-air-action-hub",
    title: "Pune Air Action Hub",
    tagline: "Air-Quality Initiative Platform for Parisar",
    description:
      "Environmental initiative website developed for Parisar to drive clean air advocacy across Pune. Features custom Astra & Elementor layouts, real-time AQI awareness dashboards, citizen engagement forms, and responsive layouts.",
    image: "/images/projects/pune-air-action-hub.jpg",
    technologies: [
      "WordPress",
      "Elementor",
      "Astra Theme",
      "HTML5",
      "CSS3",
      "JavaScript",
    ],
    githubUrl: "https://github.com/Sandesh-Ganpati-Waghmare773/Pune-Air-Action-Hub",
    liveUrl: "https://puneairhub.org/",
    featured: true,
    category: "websites",
    stats: "Live Platform",
  },
  {
    id: "product-comparison-website",
    title: "Product Comparison Website",
    tagline: "Multi-Platform E-Commerce Price Analyzer",
    description:
      "First-year engineering project inspired by BuyHatke that compares product pricing from multiple shopping websites on a single unified page, saving consumers search effort and highlighting optimal deals.",
    image: "/images/projects/product-comparison.jpg",
    technologies: [
      "HTML5",
      "CSS3",
      "JavaScript",
      "DOM Manipulation",
      "Responsive UI",
    ],
    featured: false,
    category: "websites",
    stats: "First-Year Project",
  },
  {
    id: "skilled-connect",
    title: "SkilledConnect",
    tagline: "Local Trades & Home Services Marketplace",
    description:
      "Current-semester full-stack service marketplace connecting users with verified local skilled professionals such as electricians, plumbers, and mechanics with portfolio galleries, booking workflows, and multi-portal administration.",
    image: "/images/projects/skilled-connect.jpg",
    technologies: [
      "React",
      "Vite",
      "FastAPI",
      "Python",
      "Supabase",
      "Tailwind CSS",
    ],
    featured: true,
    category: "websites",
    stats: "In Development",
  },
] as const;
