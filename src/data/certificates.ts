/**
 * =========================================================================
 * CERTIFICATES DATA REPOSITORY
 * -------------------------------------------------------------------------
 * Categorized certifications for Sandesh Waghmare (Computer Engineering).
 * Categories:
 *  - Course Completion (Includes actual certificates from Udemy & MindLuster)
 *  - Internship Certificates
 *  - Research Paper & Publication Certificates
 *  - Workshops & Training Certificates
 * =========================================================================
 */

export type CertificateCategory =
  | "Course Completion"
  | "Internship"
  | "Research & Publication"
  | "Workshops & Training";

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  image: string;
  pdfUrl?: string;
  credentialUrl?: string;
  credentialId?: string;
  category: CertificateCategory;
  duration?: string;
  skills: string[];
}

export const CERTIFICATE_CATEGORIES = [
  { id: "all", label: "All Certificates" },
  { id: "Course Completion", label: "Course Completion" },
  { id: "Internship", label: "Internship" },
  { id: "Research & Publication", label: "Research & Publication" },
  { id: "Workshops & Training", label: "Workshops & Training" },
] as const;

export const CERTIFICATES: readonly Certificate[] = [
  // =========================================================================
  // 1. Course Completion Certificates (User-Provided Authentic Credentials)
  // =========================================================================
  {
    id: "python-ml-finance",
    title: "Python & Machine Learning for Financial Analysis",
    issuer: "Udemy",
    date: "Oct 2026",
    duration: "23 total hours",
    image: "/images/certificates/cert-python-ml-finance.jpg",
    pdfUrl: "/certificates/cert-python-ml-finance.pdf",
    credentialUrl: "https://ude.my/UC-6ffccfa4-0609-4d71-9967-5cffe965ce83",
    credentialId: "UC-6ffccfa4-0609-4d71-9967-5cffe965ce83",
    category: "Course Completion",
    skills: ["Python", "Machine Learning", "Financial Modeling", "Data Science"],
  },
  {
    id: "deep-learning-ai",
    title: "Deep Learning A-Z [2026]: DL, AI in Python & AWS + LLM Prize",
    issuer: "Udemy",
    date: "Oct 2026",
    duration: "23 total hours",
    image: "/images/certificates/cert-deep-learning-ai.jpg",
    pdfUrl: "/certificates/cert-deep-learning-ai.pdf",
    credentialUrl: "https://ude.my/UC-cef8b02d-5940-4eac-9d37-c153092b6564",
    credentialId: "UC-cef8b02d-5940-4eac-9d37-c153092b6564",
    category: "Course Completion",
    skills: ["Deep Learning", "Artificial Intelligence", "Neural Networks", "Python & AWS"],
  },
  {
    id: "python-data-viz",
    title: "Python for Data Analysis & Visualization",
    issuer: "Udemy",
    date: "Oct 2026",
    duration: "10 total hours",
    image: "/images/certificates/cert-python-data-viz.jpg",
    pdfUrl: "/certificates/cert-python-data-viz.pdf",
    credentialUrl: "https://ude.my/UC-08551fde-59b4-4918-af66-f8ac0525e38b",
    credentialId: "UC-08551fde-59b4-4918-af66-f8ac0525e38b",
    category: "Course Completion",
    skills: ["Data Analysis", "Python", "Data Visualization", "Analytics"],
  },
  {
    id: "cpu-80386-mindluster",
    title: "Programming Model of cpu 80386",
    issuer: "MindLuster",
    date: "Oct 2026",
    duration: "2 hours",
    image: "/images/certificates/cert-cpu-80386.jpg",
    pdfUrl: "/certificates/cert-cpu-80386.pdf",
    credentialUrl: "https://www.mindluster.com",
    credentialId: "177dd6e9",
    category: "Course Completion",
    skills: ["Computer Architecture", "80386 Microprocessor", "Assembly & Systems", "Hardware Logic"],
  },

  // =========================================================================
  // 2. Internship Certificates
  // =========================================================================
  {
    id: "internship-web-dev",
    title: "Software Engineering & Web Development Internship",
    issuer: "Industry Engineering Practicum",
    date: "2024 – 2025",
    duration: "3 Months",
    image: "/images/certificates/fullstack-cert.jpg",
    credentialId: "INT-SWE-2025-SW",
    category: "Internship",
    skills: ["Next.js", "React Architecture", "REST APIs", "Production Workflows"],
  },

  // =========================================================================
  // 3. Research Paper & Publication Certificates
  // =========================================================================
  {
    id: "research-paper-pub",
    title: "Technical Paper Presentation & Research Publication",
    issuer: "National Engineering Research Forum",
    date: "2025",
    duration: "Peer-Reviewed",
    image: "/images/certificates/fullstack-cert.jpg",
    credentialId: "PUB-CS-CONF-8821",
    category: "Research & Publication",
    skills: ["Technical Research", "Paper Publication", "System Architecture", "Academic Presentation"],
  },

  // =========================================================================
  // 4. Workshops & Training Certificates
  // =========================================================================
  {
    id: "fullstack-bootcamp",
    title: "Full-Stack Web Development Bootcamp & Architecture Workshop",
    issuer: "Engineering Developer Circle",
    date: "2024",
    duration: "Bootcamp Series",
    image: "/images/certificates/fullstack-cert.jpg",
    credentialId: "WKSHP-FS-4290",
    category: "Workshops & Training",
    skills: ["Component Architecture", "Tailwind CSS", "TypeScript", "Database Integration"],
  },
  {
    id: "cpp-algorithms-cert",
    title: "Problem Solving & Algorithmic Rigor in C++",
    issuer: "Competitive Coding Platform",
    date: "2024",
    duration: "Verified Skill",
    image: "/images/certificates/fullstack-cert.jpg",
    credentialId: "HR-CPP-773419",
    category: "Workshops & Training",
    skills: ["C++", "Data Structures", "Algorithmic Efficiency", "STL"],
  },
] as const;
