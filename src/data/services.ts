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
    id: "website-dev",
    number: "01",
    title: "Website Development",
    tagline: "Modern, performant, and standards-compliant websites & web apps",
    description:
      "End-to-end development of fast, accessible, and responsive websites tailored to specific personal or business requirements. Built with clean code architecture, modern SEO fundamentals, and cross-browser reliability.",
    icon: "Globe",
    deliverables: [
      "Custom responsive single-page & multi-page websites",
      "Semantic HTML5, modern CSS3 & modular styling",
      "Fast page load performance & Core Web Vitals optimization",
      "SEO-friendly metadata and structured layout",
    ],
    technologies: ["Next.js", "React.js", "TypeScript", "Tailwind CSS", "HTML5/CSS3"],
    gradient: "from-[#FF8A00]/10 via-[#FFB020]/5 to-transparent",
    accentBorder: "group-hover:border-[#FF8A00]/40",
  },
  {
    id: "app-dev",
    number: "02",
    title: "App Development",
    tagline: "Cross-platform mobile and responsive applications",
    description:
      "Engineering intuitive, high-performance mobile applications for Android and iOS using modern cross-platform frameworks. Focused on fluid touch gestures, native device performance, and seamless user experiences.",
    icon: "Smartphone",
    deliverables: [
      "Cross-platform iOS and Android mobile applications",
      "Fluid UI layouts, custom widgets & gesture controls",
      "State management, offline caching & API integrations",
      "Native performance optimization and store-ready builds",
    ],
    technologies: ["Flutter", "Dart", "Kotlin", "Swift", "React Native"],
    gradient: "from-[#FF8A00]/10 via-[#FFB020]/5 to-transparent",
    accentBorder: "group-hover:border-[#FF8A00]/40",
  },
  {
    id: "wordpress-website-dev",
    number: "03",
    title: "WordPress Website Development",
    tagline: "Custom CMS setups, theme customization, and content architecture",
    description:
      "Building and tailoring custom WordPress solutions for businesses and creators. From custom theme integrations and Gutenberg blocks to plugin configurations, speed optimization, and effortless content management.",
    icon: "FileCode",
    deliverables: [
      "Custom theme setup, layout styling & brand customization",
      "Gutenberg block patterns & custom page layouts",
      "Plugin configuration, security & caching setup",
      "Responsive mobile-first design and easy CMS management",
    ],
    technologies: ["WordPress", "PHP", "Custom Themes", "Elementor/Gutenberg", "SEO"],
    gradient: "from-[#FF8A00]/10 via-[#FFB020]/5 to-transparent",
    accentBorder: "group-hover:border-[#FF8A00]/40",
  },
  {
    id: "ai-agent-dev",
    number: "04",
    title: "AI Agent Development",
    tagline: "Intelligent autonomous agents, LLM integrations & workflow automation",
    description:
      "Designing and integrating custom AI agents, automated LLM-driven pipelines, and intelligent chatbots. Automating routine tasks, smart data retrieval, customer inquiries, and contextual business processes.",
    icon: "Bot",
    deliverables: [
      "Custom AI agent workflows & autonomous task execution",
      "LLM API integration (OpenAI, Gemini, Anthropic)",
      "Prompt engineering, function calling & retrieval (RAG)",
      "Chatbot interfaces, conversational UX & webhook triggers",
    ],
    technologies: ["Python", "Gemini API", "OpenAI API", "LangChain", "Node.js"],
    gradient: "from-[#FF8A00]/10 via-[#FFB020]/5 to-transparent",
    accentBorder: "group-hover:border-[#FF8A00]/40",
  },
  {
    id: "google-business-dev",
    number: "05",
    title: "Google Business Profile Development",
    tagline: "Local SEO optimization, business listing setup & Google presence",
    description:
      "Setting up, optimizing, and managing Google Business Profiles to maximize local search visibility, drive customer inquiries, collect authentic reviews, and dominate Google Maps local pack rankings.",
    icon: "MapPin",
    deliverables: [
      "Complete Google Business Profile setup, verification & branding",
      "Local SEO optimization for Google Maps & search rankings",
      "Categories, services, photo uploads & business attributes",
      "Review management strategy & customer inquiry optimization",
    ],
    technologies: ["Google Business Profile", "Google Maps", "Local SEO", "Citations", "Analytics"],
    gradient: "from-[#FF8A00]/10 via-[#FFB020]/5 to-transparent",
    accentBorder: "group-hover:border-[#FF8A00]/40",
  },
] as const;
