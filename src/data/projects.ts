/**
 * =========================================================================
 * PROJECTS DATA REPOSITORY
 * -------------------------------------------------------------------------
 * To add a new project, simply append an object to the `PROJECTS` array below.
 * The UI will automatically render your new project card, apply responsive
 * grid styling, and include it in category filters.
 * =========================================================================
 */

export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  image: string;
  technologies: string[];
  githubUrl: string;
  liveUrl?: string;
  featured?: boolean;
  category: "Full-Stack" | "Frontend" | "Systems & Algorithms";
  stats?: string;
}

export const PROJECTS: readonly Project[] = [
  {
    id: "algoflow",
    title: "AlgoFlow — Algorithm Visualizer",
    tagline: "Interactive DSA & Pathfinding Visualizer",
    description:
      "A high-performance interactive algorithm visualizer demonstrating Dijkstra's, A*, Binary Search Trees, and sorting algorithms with step-by-step state animations and execution metrics.",
    image: "/images/projects/algo-visualizer.jpg",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Canvas API"],
    githubUrl: "https://github.com/Sandesh-Ganpati-Waghmare773",
    liveUrl: "https://example.com/algoflow",
    featured: true,
    category: "Systems & Algorithms",
    stats: "10+ Algorithms",
  },
  {
    id: "devflow",
    title: "DevFlow — Developer Analytics Hub",
    tagline: "Team Velocity & Code Insights Platform",
    description:
      "A modern developer productivity dashboard tracking git commit velocity, code review turnaround times, and pull request statuses with real-time interactive charting and glassmorphic UI.",
    image: "/images/projects/dev-analytics.jpg",
    technologies: ["React", "TypeScript", "Next.js", "Tailwind CSS", "Lucide Icons"],
    githubUrl: "https://github.com/Sandesh-Ganpati-Waghmare773",
    liveUrl: "https://example.com/devflow",
    featured: true,
    category: "Full-Stack",
    stats: "Real-time Metrics",
  },
  {
    id: "smartcampus",
    title: "SmartCampus — Student Resource Portal",
    tagline: "Centralized Academic Utility & Notes Hub",
    description:
      "A collaborative portal tailored for engineering students to organize semester coursework, share peer-reviewed study materials, and access timetable schedules with offline-first caching.",
    image: "/images/projects/algo-visualizer.jpg",
    technologies: ["React", "Next.js", "Tailwind CSS", "TypeScript", "REST APIs"],
    githubUrl: "https://github.com/Sandesh-Ganpati-Waghmare773",
    liveUrl: "https://example.com/smartcampus",
    featured: false,
    category: "Frontend",
    stats: "Campus Tool",
  },
  {
    id: "codecraft",
    title: "CodeCraft — Browser Component Sandbox",
    tagline: "Instant Code Testing & Markdown Workspace",
    description:
      "An in-browser code editor and interactive component testing environment featuring real-time preview, AST-based syntax linting, and dark theme UI controls.",
    image: "/images/projects/dev-analytics.jpg",
    technologies: ["TypeScript", "Next.js", "Tailwind CSS", "Monaco Editor"],
    githubUrl: "https://github.com/Sandesh-Ganpati-Waghmare773",
    featured: false,
    category: "Frontend",
    stats: "Live Sandbox",
  },
] as const;
