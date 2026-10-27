export interface SkillItem {
  name: string;
  level: "Advanced" | "Proficient" | "Working Knowledge" | "Familiar";
  description: string;
  icon: string; // Identifier for icon rendering
  badge?: string;
  featured?: boolean;
}

export interface SkillCategory {
  id: string;
  title: string;
  description: string;
  icon: string;
  skills: SkillItem[];
}

export const SKILL_CATEGORIES: readonly SkillCategory[] = [
  {
    id: "programming",
    title: "Programming",
    description: "Core languages for building robust software, solving algorithmic challenges, and engineering scalable logic.",
    icon: "Code2",
    skills: [
      {
        name: "C++",
        level: "Proficient",
        description: "Data structures, algorithms, STL, and performance-critical problem solving.",
        icon: "Cpp",
        badge: "DSA & Problem Solving",
        featured: true,
      },
      {
        name: "Python",
        level: "Proficient",
        description: "Scripting, rapid prototyping, data manipulation, and backend logic.",
        icon: "Python",
        badge: "Versatile Logic",
        featured: true,
      },
      {
        name: "JavaScript (ES6+)",
        level: "Proficient",
        description: "Asynchronous programming, closures, event-driven web architecture, and DOM.",
        icon: "JavaScript",
        badge: "Web Core",
        featured: true,
      },
      {
        name: "TypeScript",
        level: "Proficient",
        description: "Static typing, generics, strict type safety, and scalable full-stack applications.",
        icon: "TypeScript",
        badge: "Type Safety",
        featured: true,
      },
      {
        name: "Java",
        level: "Working Knowledge",
        description: "Object-oriented design patterns, multithreading basics, and enterprise concepts.",
        icon: "Java",
        badge: "OOP Foundations",
      },
      {
        name: "C",
        level: "Working Knowledge",
        description: "Low-level memory management, pointers, and fundamental systems architecture.",
        icon: "C",
        badge: "Systems Basis",
      },
    ],
  },
  {
    id: "frontend",
    title: "Frontend",
    description: "Modern frameworks and design engineering tools for responsive, performant user interfaces.",
    icon: "Layout",
    skills: [
      {
        name: "React.js",
        level: "Proficient",
        description: "Component lifecycle, custom hooks, state management, and modern component design.",
        icon: "React",
        badge: "Component Architecture",
        featured: true,
      },
      {
        name: "Next.js",
        level: "Proficient",
        description: "App Router, Server & Client Components, SSR, static generation, and Turbopack.",
        icon: "Nextjs",
        badge: "Production Web",
        featured: true,
      },
      {
        name: "Tailwind CSS",
        level: "Proficient",
        description: "Utility-first design systems, custom configuration, responsive design, and CSS variables.",
        icon: "Tailwind",
        badge: "Modern Styling",
        featured: true,
      },
      {
        name: "HTML5 & Modern CSS3",
        level: "Proficient",
        description: "Semantic web standards, CSS Grid, Flexbox, accessible markup, and animations.",
        icon: "HtmlCss",
        badge: "Core Foundations",
      },
      {
        name: "Framer Motion",
        level: "Proficient",
        description: "Fluid micro-animations, physics-based gesture controls, and layout transitions.",
        icon: "FramerMotion",
        badge: "Fluid UI Motion",
      },
      {
        name: "Responsive & Adaptive UI",
        level: "Proficient",
        description: "Mobile-first paradigms, touch interactions, fluid typography, and viewport optimization.",
        icon: "Smartphone",
        badge: "Cross-Device UX",
      },
    ],
  },
  {
    id: "tools",
    title: "Tools & Technologies",
    description: "Modern developer workflow tools, version control, environments, and testing utilities.",
    icon: "Wrench",
    skills: [
      {
        name: "Git & GitHub",
        level: "Proficient",
        description: "Branching workflows, pull requests, version tracking, and collaborative open source.",
        icon: "Git",
        badge: "Version Control",
        featured: true,
      },
      {
        name: "VS Code",
        level: "Proficient",
        description: "Optimized development environment, debugging, extensions, and task automation.",
        icon: "VSCode",
        badge: "Primary Editor",
      },
      {
        name: "Linux & Terminal",
        level: "Working Knowledge",
        description: "Command-line scripting, bash navigation, file permissions, and process management.",
        icon: "Terminal",
        badge: "CLI & Bash",
      },
      {
        name: "Postman",
        level: "Working Knowledge",
        description: "API testing, endpoint debugging, payload verification, and documentation.",
        icon: "Postman",
        badge: "API Testing",
      },
      {
        name: "Vercel & Cloud Deploy",
        level: "Proficient",
        description: "Continuous deployment, preview environments, DNS, and edge deployments.",
        icon: "Cloud",
        badge: "Deployment & CI/CD",
      },
      {
        name: "Docker (Basics)",
        level: "Familiar",
        description: "Container fundamentals, Dockerfiles, and reproducible development runtimes.",
        icon: "Docker",
        badge: "Containerization",
      },
    ],
  },
  {
    id: "core-cs",
    title: "Other Technical Skills",
    description: "Foundational computer science principles, database architecture, and software engineering rigor.",
    icon: "Cpu",
    skills: [
      {
        name: "Data Structures & Algorithms",
        level: "Proficient",
        description: "Arrays, trees, graphs, dynamic programming, hashing, recursion, and time complexity.",
        icon: "Binary",
        badge: "Algorithmic Rigor",
        featured: true,
      },
      {
        name: "Object-Oriented Programming (OOP)",
        level: "Proficient",
        description: "Encapsulation, abstraction, inheritance, polymorphism, and clean design patterns.",
        icon: "Boxes",
        badge: "Clean Architecture",
        featured: true,
      },
      {
        name: "Database Systems & SQL",
        level: "Working Knowledge",
        description: "Relational schema design, normalization, complex queries, joins, and indexing.",
        icon: "Database",
        badge: "Data Management",
      },
      {
        name: "Computer Networks (CN)",
        level: "Working Knowledge",
        description: "TCP/IP protocol stack, HTTP/HTTPS, DNS, routing, sockets, and network security basics.",
        icon: "Network",
        badge: "Network Protocols",
      },
      {
        name: "Operating Systems (OS)",
        level: "Working Knowledge",
        description: "Process scheduling, concurrency, virtual memory, threads, and system calls.",
        icon: "Laptop",
        badge: "System Concepts",
      },
      {
        name: "RESTful API Design",
        level: "Proficient",
        description: "HTTP verbs, stateless communication, structured error handling, and JSON payloads.",
        icon: "Server",
        badge: "Web Architecture",
      },
    ],
  },
] as const;
