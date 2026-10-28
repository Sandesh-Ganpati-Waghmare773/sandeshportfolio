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
    description: "Core languages and runtime platforms for building robust software, solving algorithmic challenges, and engineering backend logic.",
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
        name: "C",
        level: "Working Knowledge",
        description: "Low-level memory management, pointers, and fundamental systems architecture.",
        icon: "C",
        badge: "Systems Basis",
      },
      {
        name: "Python",
        level: "Proficient",
        description: "Scripting, rapid prototyping, data manipulation, automation, and backend logic.",
        icon: "Python",
        badge: "Versatile Logic",
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
        name: "Node.js",
        level: "Proficient",
        description: "Event-driven asynchronous runtime, server-side development, npm ecosystem, and RESTful APIs.",
        icon: "Nodejs",
        badge: "Backend Runtime",
        featured: true,
      },
      {
        name: "Express.js",
        level: "Proficient",
        description: "Lightweight backend web framework, middleware pipelines, routing, and REST API services.",
        icon: "Express",
        badge: "Backend Framework",
      },
      {
        name: "TypeScript",
        level: "Proficient",
        description: "Static typing, generics, strict type safety, and scalable full-stack applications.",
        icon: "TypeScript",
        badge: "Type Safety",
        featured: true,
      },
    ],
  },
  {
    id: "frontend",
    title: "Frontend",
    description: "Modern frameworks, client-side languages, and mobile UI toolkits for responsive, performant user interfaces.",
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
        name: "JavaScript (ES6+)",
        level: "Proficient",
        description: "Asynchronous programming, modern ES6+ syntax, DOM manipulation, and interactive web architecture.",
        icon: "JavaScript",
        badge: "Web Core",
        featured: true,
      },
      {
        name: "HTML5 & Modern CSS3",
        level: "Proficient",
        description: "Semantic web standards, CSS Grid, Flexbox, accessible markup, modern styling, and animations.",
        icon: "HtmlCss",
        badge: "Core Web",
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
        name: "Flutter",
        level: "Working Knowledge",
        description: "Cross-platform mobile and desktop UI toolkit, reactive state management, and native rendering.",
        icon: "Flutter",
        badge: "Cross-Platform UI",
        featured: true,
      },
      {
        name: "Dart",
        level: "Working Knowledge",
        description: "Client-optimized language for multi-platform apps, strong typing, and asynchronous programming.",
        icon: "Dart",
        badge: "Flutter Language",
      },
      {
        name: "Kotlin",
        level: "Working Knowledge",
        description: "Modern Android UI development, null safety, coroutines, and Jetpack Compose foundations.",
        icon: "Kotlin",
        badge: "Android Frontend",
      },
      {
        name: "Swift",
        level: "Working Knowledge",
        description: "Modern iOS application development, clean syntax, Apple ecosystem, and SwiftUI foundations.",
        icon: "Swift",
        badge: "iOS Frontend",
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
    description: "Modern developer workflow tools, version control, design software, CMS, and deployment utilities.",
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
        name: "Figma",
        level: "Proficient",
        description: "UI/UX wireframing, high-fidelity prototyping, design systems, and developer handoff.",
        icon: "Figma",
        badge: "UI/UX Design",
        featured: true,
      },
      {
        name: "WordPress",
        level: "Working Knowledge",
        description: "CMS architecture, theme customization, plugin integration, SEO optimization, and content management.",
        icon: "WordPress",
        badge: "CMS & Web Publishing",
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
