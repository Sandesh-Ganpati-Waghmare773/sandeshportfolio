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
  highlights?: string[];
}

export const STORY_PILLARS: readonly StoryPillar[] = [
  {
    id: "identity",
    badge: "01 / Who I Am",
    title: "Curious Developer & Creative Problem Solver",
    summary:
      "I'm Sandesh Waghmare, a developer and undergraduate engineer who loves turning complex challenges into clean, accessible digital experiences with intuitive design.",
    icon: "User",
    accent: "from-[#FF8A00]/15 to-[#FFB020]/10 border-[#FF8A00]/30",
  },
  {
    id: "engineering",
    badge: "02 / Academic Rigor",
    title: "Computer Engineering Background",
    summary:
      "Pursuing my Bachelor of Engineering in Computer Engineering. Grounded in computational theory, data structures, algorithms, and systems design principles.",
    icon: "GraduationCap",
    accent: "from-[#FF8A00]/15 to-[#FFB020]/10 border-[#FF8A00]/30",
  },
  {
    id: "craft",
    badge: "03 / Development Passion",
    title: "Software & Web Engineering",
    summary:
      "Fascinated by modern frontend ecosystems and responsive design architectures. I focus on creating fast, interactive, and aesthetic web interfaces that feel alive.",
    icon: "Code2",
    accent: "from-[#FF8A00]/15 to-[#FFB020]/10 border-[#FF8A00]/30",
  },
  {
    id: "impact",
    badge: "04 / Practical Solutions",
    title: "Building Real-World Impact",
    summary:
      "Technology is most meaningful when it solves actual problems. I strive to build practical tools, usable workflows, and interactive applications that genuinely benefit people.",
    icon: "Rocket",
    accent: "from-[#FF8A00]/15 to-[#FFB020]/10 border-[#FF8A00]/30",
  },
  {
    id: "growth",
    badge: "05 / Mindset",
    title: "Continuous Learning & Exploration",
    summary:
      "Engineering is a lifelong journey. I continuously explore modern tools, refine my algorithmic thinking, study clean code patterns, and turn learnings into tangible projects.",
    icon: "Flame",
    accent: "from-[#FF8A00]/15 to-[#FFB020]/10 border-[#FF8A00]/30",
  },
] as const;

export const EDUCATION_JOURNEY: readonly EducationJourneyItem[] = [
  {
    id: "engineering",
    degree: "Bachelor of Engineering in Computer Engineering",
    institution: "Pimpri Chinchwad College of Engineering (PCCOE), Pune",
    period: "Expected 2029",
    status: "Expected 2029",
    description:
      "Comprehensive study of computer engineering fundamentals, data structures, algorithms, systems architecture, operating systems, and scalable software design.",
  },
  {
    id: "hsc",
    degree: "Higher Secondary Certificate (Class XII - Science, PCM)",
    institution: "Gayatri International College, Charholi, Pune",
    period: "Completed",
    status: "Completed",
    description:
      "Higher secondary education specializing in Physics, Chemistry, and Mathematics (PCM Group). Developed analytical thinking and foundational science expertise.",
  },
  {
    id: "ssc",
    degree: "Secondary School Certificate (Class X - SSC Board)",
    institution: "Shree Ram Madhyamik Vidyalay, Bhosari, Pune - 411039",
    period: "Completed",
    status: "Completed",
    description:
      "Completed secondary education under Maharashtra State Board (SSC) with strong academic foundations in science, mathematics, and core academic subjects.",
  },
] as const;

export const QUICK_STATS = [
  { label: "Academic Focus", value: "Computer Engg." },
  { label: "Design Style", value: "Modern & Interactive" },
  { label: "Philosophy", value: "Build & Learn Daily" },
] as const;
