export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  tagline: string;
  description: string;
  icon: string;
  deliverables: string[];
  technologies: string[];
  gradient: string;
  accentBorder: string;
}

export const SERVICES: readonly ServiceItem[] = [
  {
    id: "web-dev",
    number: "01",
    title: "Website Development",
    tagline: "Modern, performant, and standards-compliant websites",
    description:
      "End-to-end development of fast, accessible, and responsive websites tailored to specific personal or business requirements. Built with clean code architecture, modern SEO fundamentals, and cross-browser reliability.",
    icon: "Globe",
    deliverables: [
      "Custom multi-page & single-page websites",
      "Semantic HTML5 & clean modular styling",
      "Fast load performance & Core Web Vitals optimization",
      "SEO-friendly metadata and structured layout",
    ],
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "HTML5/CSS3"],
    gradient: "from-blue-500/15 via-indigo-500/10 to-transparent",
    accentBorder: "group-hover:border-blue-500/40",
  },
  {
    id: "frontend-dev",
    number: "02",
    title: "Frontend Development",
    tagline: "Dynamic, scalable, and reactive web applications",
    description:
      "Engineering modern user interfaces with React and Next.js. Structured around reusable component hierarchies, predictable state flows, strict TypeScript typings, and fluid interactivity.",
    icon: "Code2",
    deliverables: [
      "Component-driven architecture with React & Next.js",
      "Type-safe development with TypeScript",
      "State management & custom hook integration",
      "Client & Server Component optimization",
    ],
    technologies: ["React.js", "Next.js", "TypeScript", "JavaScript (ES6+)", "Tailwind CSS"],
    gradient: "from-indigo-500/15 via-purple-500/10 to-transparent",
    accentBorder: "group-hover:border-indigo-500/40",
  },
  {
    id: "wordpress-dev",
    number: "03",
    title: "WordPress Development",
    tagline: "Custom CMS setups, theme customization, and content architecture",
    description:
      "Building and tailoring custom WordPress solutions for clients and projects. From custom theme integrations and block patterns to plugin configurations and intuitive content management.",
    icon: "FileCode",
    deliverables: [
      "Custom theme configuration & layout styling",
      "Gutenberg block implementation & layout design",
      "Responsive mobile-first page layouts",
      "CMS workflow configuration for effortless content updates",
    ],
    technologies: ["WordPress", "PHP", "CSS3", "JavaScript", "CMS Architecture"],
    gradient: "from-sky-500/15 via-blue-500/10 to-transparent",
    accentBorder: "group-hover:border-sky-500/40",
  },
  {
    id: "ui-implementation",
    number: "04",
    title: "UI Implementation",
    tagline: "Pixel-perfect translation from Figma & UI designs into code",
    description:
      "Transforming visual design mockups and wireframes into interactive, accessible, and fluid web interfaces. Focused on micro-interactions, layout precision, and motion design.",
    icon: "Layout",
    deliverables: [
      "High-fidelity design-to-code translation",
      "Fluid micro-animations with Framer Motion",
      "Accessible markup following WCAG standards",
      "Polished dark mode & glassmorphism aesthetics",
    ],
    technologies: ["Framer Motion", "Tailwind CSS", "CSS Grid / Flexbox", "Figma to Code"],
    gradient: "from-purple-500/15 via-pink-500/10 to-transparent",
    accentBorder: "group-hover:border-purple-500/40",
  },
  {
    id: "responsive-design",
    number: "05",
    title: "Responsive & Adaptive UI",
    tagline: "Flawless user experiences across phones, tablets, and desktops",
    description:
      "Crafting interfaces that look exceptional and function effortlessly on any screen size. Prioritizing mobile-first ergonomics, touch targets, dynamic typography, and adaptive layouts.",
    icon: "Smartphone",
    deliverables: [
      "Mobile-first responsive layout engineering",
      "Touch-friendly navigation & mobile menus",
      "Fluid typography and scalable vector graphics",
      "Cross-browser and multi-device QA testing",
    ],
    technologies: ["Tailwind CSS", "Responsive Design", "Modern CSS", "Mobile UX"],
    gradient: "from-emerald-500/15 via-teal-500/10 to-transparent",
    accentBorder: "group-hover:border-emerald-500/40",
  },
  {
    id: "api-integration",
    number: "06",
    title: "REST API & Data Integration",
    tagline: "Connecting client interfaces with backend endpoints and services",
    description:
      "Integrating frontend views with RESTful web services and external APIs. Handling asynchronous data fetching, loading states, error boundaries, and payload verification.",
    icon: "Server",
    deliverables: [
      "RESTful API consumption & asynchronous handling",
      "Loading skeletons, empty states & error feedback",
      "Data formatting and payload mapping",
      "Postman testing and endpoint verification",
    ],
    technologies: ["REST APIs", "Fetch / Axios", "JSON", "Postman", "TypeScript"],
    gradient: "from-amber-500/15 via-orange-500/10 to-transparent",
    accentBorder: "group-hover:border-amber-500/40",
  },
] as const;
