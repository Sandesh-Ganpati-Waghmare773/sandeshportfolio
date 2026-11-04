/**
 * =========================================================================
 * ACHIEVEMENTS DATA REPOSITORY
 * -------------------------------------------------------------------------
 * Verified authentic competition, hackathon, and departmental honors
 * for Sandesh Ganpati Waghmare.
 * =========================================================================
 */

export interface Achievement {
  id: string;
  title: string;
  category: "Hackathon" | "Competitive Coding" | "Institutional Recognition" | "Competition";
  organization: string;
  period: string;
  metric: string;
  description: string;
  badge: string;
  image: string;
  pdfUrl?: string;
  credentialId?: string;
  skills: string[];
  featured?: boolean;
}

export const ACHIEVEMENTS: readonly Achievement[] = [
  {
    id: "sih-ignite-2026",
    title: "PCCOE SIH Ignite 2026 — Smart India Hackathon",
    category: "Hackathon",
    organization: "Smart India Hackathon 2026 & PCET's PCCOE Pune",
    period: "12th September, 2026",
    metric: "National Hackathon Initiative",
    description:
      "Successfully competed in 'PCCOE SIH Ignite 2026' (Internal Smart India Hackathon), Software and Hardware Edition, organized at Pimpri Chinchwad College of Engineering to architect applied digital and hardware-integrated software solutions.",
    badge: "Smart India Hackathon",
    image: "/images/achievements/sih-ignite-2026-hackathon.jpg",
    pdfUrl: "/certificates/sih-ignite-2026-hackathon.pdf",
    credentialId: "SIH 2026 Internal",
    skills: [
      "Hackathon Sprint",
      "Rapid Prototyping",
      "System Architecture",
      "Problem Solving",
      "Team Engineering",
    ],
    featured: true,
  },
  {
    id: "codigo-techfest-2026",
    title: "CODIGO — Techfest 2026 ANANTYA",
    category: "Competitive Coding",
    organization: "Department of Computer Engineering, PCCOE (ACM / OWASP / CESA)",
    period: "09/10/2026 – 10/10/2026",
    metric: "Department Techfest Flagship",
    description:
      "Successfully competed in CODIGO, the signature competitive programming and algorithmic problem-solving challenge held under Techfest 2026 – ANANTYA at the Department of Computer Engineering, PCCOE.",
    badge: "Algorithmic Challenge",
    image: "/images/achievements/codigo-techfest-2026.jpg",
    pdfUrl: "/certificates/codigo-techfest-2026.pdf",
    credentialId: "PCCOE / CODIGO 2026",
    skills: [
      "Competitive Programming",
      "Data Structures",
      "Algorithm Optimization",
      "Time Complexity",
      "Debugging under Pressure",
    ],
    featured: true,
  },
  {
    id: "pccoe-know-japan-2025",
    title: "Know Japan 2025 — Certificate of Participation",
    category: "Institutional Recognition",
    organization: "PCCOE & Consulate-General of Japan in Mumbai",
    period: "10th – 11th Oct 2025",
    metric: "International Relations Cell",
    description:
      "Awarded for participating in 'Know Japan 2025' organized by The International Relations Cell & Japan Facilitation Centre at PCCOE in collaboration with the Consulate-General of Japan in Mumbai, fostering global engineering perspectives and cross-cultural technical exchange.",
    badge: "Global Relations",
    image: "/images/achievements/pccoe-know-japan-2025.jpg",
    pdfUrl: "/certificates/pccoe-know-japan-2025.pdf",
    credentialId: "PCCOE/KJ/048",
    skills: [
      "International Relations",
      "Cross-Cultural Collaboration",
      "Global Engineering Perspectives",
      "Technical Exchange",
    ],
    featured: true,
  },
] as const;
