export interface StoryPillar {
  id: string;
  badge: string;
  title: string;
  summary: string;
  icon: string;
  accent: string;
}

export interface EducationJourneyItem {
  id: string;
  degree: string;
  institution: string;
  period: string;
  status: string;
  description: string;
  highlights: string[];
}

export const STORY_PILLARS: readonly StoryPillar[] = [
  {
    id: "identity",
    badge: "01 / Who I Am",
    title: "Curious Developer & Creative Problem Solver",
    summary:
      "I'm Sandesh Waghmare, a developer and undergraduate engineer who loves turning complex challenges into clean, accessible digital experiences with intuitive design.",
    icon: "User",
    accent: "from-blue-500/20 to-indigo-500/20 border-blue-500/30",
  },
  {
    id: "engineering",
    badge: "02 / Academic Rigor",
    title: "Computer Engineering Background",
    summary:
      "Pursuing my Bachelor of Engineering in Computer Engineering. Grounded in computational theory, data structures, algorithms, and systems design principles.",
    icon: "GraduationCap",
    accent: "from-indigo-500/20 to-purple-500/20 border-indigo-500/30",
  },
  {
    id: "craft",
    badge: "03 / Development Passion",
    title: "Software & Web Engineering",
    summary:
      "Fascinated by modern frontend ecosystems and responsive design architectures. I focus on creating fast, interactive, and aesthetic web interfaces that feel alive.",
    icon: "Code2",
    accent: "from-purple-500/20 to-pink-500/20 border-purple-500/30",
  },
  {
    id: "impact",
    badge: "04 / Practical Solutions",
    title: "Building Real-World Impact",
    summary:
      "Technology is most meaningful when it solves actual problems. I strive to build practical tools, usable workflows, and interactive applications that genuinely benefit people.",
    icon: "Rocket",
    accent: "from-emerald-500/20 to-teal-500/20 border-emerald-500/30",
  },
  {
    id: "growth",
    badge: "05 / Mindset",
    title: "Continuous Learning & Exploration",
    summary:
      "Engineering is a lifelong journey. I continuously explore modern tools, refine my algorithmic thinking, study clean code patterns, and turn learnings into tangible projects.",
    icon: "Flame",
    accent: "from-amber-500/20 to-orange-500/20 border-amber-500/30",
  },
] as const;

export const EDUCATION_JOURNEY: readonly EducationJourneyItem[] = [
  {
    id: "undergrad",
    degree: "Bachelor of Engineering in Computer Engineering",
    institution: "Pimpri Chinchwad College of Engineering (PCCOE), Pune",
    period: "2022 – 2026",
    status: "In Progress",
    description:
      "In-depth studies covering Data Structures & Algorithms, Object-Oriented Programming, Operating Systems, Database Management Systems, Computer Networks, and Software Engineering methodologies.",
    highlights: [
      "Rigorous CS Fundamentals",
      "Hands-on Project Development",
      "Algorithmic Problem Solving",
    ],
  },
  {
    id: "hsc",
    degree: "Higher Secondary Certificate (Class XII - Science)",
    institution: "Junior College Education",
    period: "Completed",
    status: "Distinction",
    description:
      "Specialized in Physics, Chemistry, and Higher Mathematics. Built a strong foundational aptitude in logical deduction, quantitative reasoning, and scientific inquiry.",
    highlights: [
      "Advanced Mathematics",
      "Scientific Foundations",
      "Analytical Thinking",
    ],
  },
] as const;

export const QUICK_STATS = [
  { label: "Academic Focus", value: "Computer Engg." },
  { label: "Core Stack", value: "Next.js & C++" },
  { label: "Design Style", value: "Modern & Interactive" },
  { label: "Philosophy", value: "Build & Learn Daily" },
] as const;
