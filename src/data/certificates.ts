/**
 * =========================================================================
 * CERTIFICATES DATA REPOSITORY
 * -------------------------------------------------------------------------
 * Verified authentic certifications for Sandesh Ganpati Waghmare.
 * Categories:
 *  - Internship (Cognifyz IT Solutions)
 *  - Research & Publication (ISJEM Journal Publication)
 *  - Course Completion (Udemy & MindLuster)
 * =========================================================================
 */

export type CertificateCategory =
  | "Internship"
  | "Research & Publication"
  | "Course Completion";

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
  { id: "Internship", label: "Internships" },
  { id: "Research & Publication", label: "Research & Publication" },
  { id: "Course Completion", label: "Course Completion" },
] as const;

export const CERTIFICATES: readonly Certificate[] = [
  // =========================================================================
  // 1. Internship Certificates (Cognifyz IT Solutions Pvt. Ltd.)
  // =========================================================================
  {
    id: "cognifyz-swe-internship-cert",
    title: "Software Development Internship Certificate",
    issuer: "Cognifyz IT Solutions Pvt. Ltd.",
    date: "06/07/2026",
    duration: "05/06/2026 – 05/07/2026",
    image: "/images/certificates/cognifyz-swe-internship-cert.jpg",
    pdfUrl: "/certificates/cognifyz-swe-internship-cert.pdf",
    credentialUrl: "https://www.cognifyz.com",
    credentialId: "CTI/A1/C368416",
    category: "Internship",
    skills: ["Software Development", "Algorithm Implementation", "Code Quality", "Testing & Debugging"],
  },
  {
    id: "cognifyz-web-internship-cert",
    title: "Web Development Internship Certificate",
    issuer: "Cognifyz IT Solutions Pvt. Ltd.",
    date: "09/07/2026",
    duration: "09/06/2026 – 09/07/2026",
    image: "/images/certificates/cognifyz-web-internship-cert.jpg",
    pdfUrl: "/certificates/cognifyz-web-internship-cert.pdf",
    credentialUrl: "https://www.cognifyz.com",
    credentialId: "CTI/A1/C371547",
    category: "Internship",
    skills: ["Web Development", "Frontend & Backend Integration", "Responsive UI", "REST APIs"],
  },
  {
    id: "cognifyz-swe-offer-letter",
    title: "Software Development Intern — Offer Letter",
    issuer: "Cognifyz IT Solutions Pvt. Ltd.",
    date: "05/06/2026",
    duration: "Offer of Internship",
    image: "/images/certificates/cognifyz-swe-offer-letter.jpg",
    pdfUrl: "/certificates/cognifyz-swe-offer-letter.pdf",
    credentialUrl: "https://www.cognifyz.com",
    credentialId: "CTI/A1/C368416",
    category: "Internship",
    skills: ["Software Engineering", "Technical Selection", "Problem Solving", "Professional Development"],
  },
  {
    id: "cognifyz-web-offer-letter",
    title: "Web Development Intern — Offer Letter",
    issuer: "Cognifyz IT Solutions Pvt. Ltd.",
    date: "08/06/2026",
    duration: "Offer of Internship",
    image: "/images/certificates/cognifyz-web-offer-letter.jpg",
    pdfUrl: "/certificates/cognifyz-web-offer-letter.pdf",
    credentialUrl: "https://www.cognifyz.com",
    credentialId: "CTI/A1/C371547",
    category: "Internship",
    skills: ["Web Architecture", "Frontend Development", "Backend Development", "Technical Onboarding"],
  },

  // =========================================================================
  // 2. Research Paper & Publication Certificates (ISJEM Journal)
  // =========================================================================
  {
    id: "isjem-ai-research-paper-cert",
    title: "Research Paper Acceptance: 'Impact of AI on Social Life'",
    issuer: "International Scientific Journal of Engineering & Management (ISJEM)",
    date: "Dec 2025",
    duration: "Peer-Reviewed Journal",
    image: "/images/certificates/isjem-ai-research-paper-cert.jpg",
    credentialUrl: "https://www.isjem.com",
    credentialId: "ISSN: 2583-6129 | Vol 04 Issue 12",
    category: "Research & Publication",
    skills: ["Artificial Intelligence", "Academic Research", "Paper Publication", "Social Impact of AI", "Peer Review"],
  },

  // =========================================================================
  // 3. Course Completion Certificates (Udemy & MindLuster)
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
] as const;
