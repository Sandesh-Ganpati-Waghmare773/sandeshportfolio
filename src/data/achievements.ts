/**
 * =========================================================================
 * ACHIEVEMENTS DATA REPOSITORY
 * -------------------------------------------------------------------------
 * Add your competition results, recognition, coding milestones, and leadership
 * accomplishments here. The UI will render them automatically with category
 * badges and metric highlights.
 * =========================================================================
 */

export interface Achievement {
  id: string;
  title: string;
  category: "Competition" | "Coding Milestone" | "Project Recognition" | "Leadership" | "Selection";
  organization: string;
  period: string;
  metric: string;
  description: string;
  badge: string;
  featured?: boolean;
}

export const ACHIEVEMENTS: readonly Achievement[] = [
  {
    id: "hackathon-finalist",
    title: "Finalist — State Engineering Hackathon",
    category: "Competition",
    organization: "Inter-College Tech Symposium",
    period: "2024",
    metric: "Top 5 of 120+ Teams",
    description:
      "Conceptualized and developed an interactive campus navigation and resource reservation platform in a 36-hour sprint, presenting full architectural prototypes to industry evaluators.",
    badge: "Top 5 Finalist",
    featured: true,
  },
  {
    id: "dsa-milestone",
    title: "400+ Algorithmic Problems Solved",
    category: "Coding Milestone",
    organization: "LeetCode & Competitive Platforms",
    period: "2023 – Present",
    metric: "400+ Problems",
    description:
      "Consistent problem solving covering Dynamic Programming, Graph Traversals, Binary Trees, and Backtracking to reinforce algorithmic efficiency and low-level optimization.",
    badge: "Continuous Practice",
    featured: true,
  },
  {
    id: "project-recognition",
    title: "Best Technical Innovation Award",
    category: "Project Recognition",
    organization: "Department of Computer Engineering",
    period: "2023",
    metric: "Dept. Award",
    description:
      "Awarded best student project for developing an interactive algorithm visualizer that helped peers understand complex graph traversals and sorting procedures.",
    badge: "Innovation Award",
    featured: true,
  },
  {
    id: "tech-lead",
    title: "Technical Event Lead & Workshop Coordinator",
    category: "Leadership",
    organization: "Computer Engineering Student Body",
    period: "2023 – 2024",
    metric: "500+ Participants",
    description:
      "Organized and mentored hands-on developer workshops on Git/GitHub fundamentals, modern web architectures, and collaborative coding workflows.",
    badge: "Student Leadership",
    featured: false,
  },
  {
    id: "innovation-cohort",
    title: "Selected for Department Innovation Lab",
    category: "Selection",
    organization: "Institutional Research & Innovation Hub",
    period: "2023",
    metric: "Selective Cohort",
    description:
      "Selected among department peers to participate in specialized project teams tackling applied digital tooling and web application engineering.",
    badge: "Special Selection",
    featured: false,
  },
] as const;
