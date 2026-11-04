/**
 * =========================================================================
 * CERTIFICATES DATA REPOSITORY
 * -------------------------------------------------------------------------
 * Verified authentic certifications for Sandesh Ganpati Waghmare.
 * Categories:
 *  - Internship (Cognifyz IT Solutions)
 *  - Research & Publication (ISJEM Journal Publication)
 *  - Course Completion (IBM SkillsBuild, Infosys Springboard, iTronix Solutions,
 *    KnowledgeGate, Udemy, MindLuster, Eduonix)
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
    title: "Certificate of Publication: 'Impact of AI on Social life'",
    issuer: "International Scientific Journal of Engineering & Management (ISJEM)",
    date: "December 2025",
    duration: "Peer-Reviewed Journal (Impact Factor: 7.839)",
    image: "/images/certificates/isjem-ai-research-paper-cert.jpg",
    pdfUrl: "/certificates/isjem-ai-research-paper-cert.pdf",
    credentialUrl: "https://www.isjem.com",
    credentialId: "DOI: 10.55041/ISJEM05314 | Vol 04 Issue 12",
    category: "Research & Publication",
    skills: ["Artificial Intelligence", "Academic Research", "Paper Publication", "Social Impact of AI", "Peer Review"],
  },

  // =========================================================================
  // 3. Course Completion Certificates (Grouped by Organization / Industry)
  // =========================================================================

  // --- Group A: IBM SkillsBuild (6 Certificates) ---
  {
    id: "ibm-ai-intro",
    title: "Introduction to Artificial Intelligence (MDL-211)",
    issuer: "IBM SkillsBuild",
    date: "17 Sep 2025",
    duration: "1 hr 15 mins",
    image: "/images/certificates/ibm-ai-intro.jpg",
    pdfUrl: "/certificates/ibm-ai-intro.pdf",
    credentialUrl: "https://skillsbuild.org",
    credentialId: "MDL-211",
    category: "Course Completion",
    skills: ["Artificial Intelligence", "AI Foundations", "Machine Learning Concepts", "Cognitive Computing"],
  },
  {
    id: "ibm-ml-dl",
    title: "Machine Learning and Deep Learning (MDL-212)",
    issuer: "IBM SkillsBuild",
    date: "18 Sep 2025",
    duration: "2 hrs 20 mins",
    image: "/images/certificates/ibm-ml-dl.jpg",
    pdfUrl: "/certificates/ibm-ml-dl.pdf",
    credentialUrl: "https://skillsbuild.org",
    credentialId: "MDL-212",
    category: "Course Completion",
    skills: ["Machine Learning", "Deep Learning", "Neural Networks", "Model Training", "Data Science"],
  },
  {
    id: "ibm-future-ai-jobs",
    title: "Your Future in AI: The Job Landscape (MDL-213)",
    issuer: "IBM SkillsBuild",
    date: "28 Oct 2025",
    duration: "50 mins",
    image: "/images/certificates/ibm-future-ai-jobs.jpg",
    pdfUrl: "/certificates/ibm-future-ai-jobs.pdf",
    credentialUrl: "https://skillsbuild.org",
    credentialId: "MDL-213",
    category: "Course Completion",
    skills: ["Artificial Intelligence", "AI Job Roles", "Tech Industry Pathways", "Career Strategy"],
  },
  {
    id: "ibm-nlp-cv",
    title: "Natural Language Processing and Computer Vision (MDL-214)",
    issuer: "IBM SkillsBuild",
    date: "18 Sep 2025",
    duration: "1 hr 30 mins",
    image: "/images/certificates/ibm-nlp-cv.jpg",
    pdfUrl: "/certificates/ibm-nlp-cv.pdf",
    credentialUrl: "https://skillsbuild.org",
    credentialId: "MDL-214",
    category: "Course Completion",
    skills: ["Natural Language Processing", "Computer Vision", "Text Processing", "Image Recognition", "AI Architectures"],
  },
  {
    id: "ibm-watson-studio",
    title: "Run AI Models with IBM Watson Studio (MDL-219)",
    issuer: "IBM SkillsBuild",
    date: "18 Oct 2025",
    duration: "1 hr 45 mins",
    image: "/images/certificates/ibm-watson-studio.jpg",
    pdfUrl: "/certificates/ibm-watson-studio.pdf",
    credentialUrl: "https://skillsbuild.org",
    credentialId: "MDL-219",
    category: "Course Completion",
    skills: ["IBM Watson Studio", "Model Deployment", "Cloud AI", "Model Training", "Data Science"],
  },
  {
    id: "ibm-ai-ethics",
    title: "AI Ethics (MDL-220)",
    issuer: "IBM SkillsBuild",
    date: "07 Nov 2025",
    duration: "1 hr 45 mins",
    image: "/images/certificates/ibm-ai-ethics.jpg",
    pdfUrl: "/certificates/ibm-ai-ethics.pdf",
    credentialUrl: "https://skillsbuild.org",
    credentialId: "MDL-220",
    category: "Course Completion",
    skills: ["AI Ethics", "Algorithmic Fairness", "Responsible AI", "Transparency & Governance"],
  },

  // --- Group B: Infosys Springboard (3 Certificates) ---
  {
    id: "infosys-python-part-1",
    title: "Programming Fundamentals using Python - Part 1",
    issuer: "Infosys Springboard",
    date: "March 10, 2026",
    duration: "Course Completion",
    image: "/images/certificates/infosys-python-part-1.jpg",
    pdfUrl: "/certificates/infosys-python-part-1.pdf",
    credentialUrl: "https://verify.onwingspan.com",
    credentialId: "Infosys Springboard Verified",
    category: "Course Completion",
    skills: ["Python", "Programming Fundamentals", "Data Structures", "Control Flow", "Algorithms"],
  },
  {
    id: "infosys-python-part-2",
    title: "Programming Fundamentals using Python - Part 2",
    issuer: "Infosys Springboard",
    date: "March 11, 2026",
    duration: "Course Completion",
    image: "/images/certificates/infosys-python-part-2.jpg",
    pdfUrl: "/certificates/infosys-python-part-2.pdf",
    credentialUrl: "https://verify.onwingspan.com",
    credentialId: "Infosys Springboard Verified",
    category: "Course Completion",
    skills: ["Python", "Object-Oriented Programming", "Algorithm Optimization", "Problem Solving", "File Handling"],
  },
  {
    id: "infosys-c-programming",
    title: "Programming in C",
    issuer: "Infosys Springboard",
    date: "November 18, 2025",
    duration: "Course Completion",
    image: "/images/certificates/infosys-c-programming.jpg",
    pdfUrl: "/certificates/infosys-c-programming.pdf",
    credentialUrl: "https://verify.onwingspan.com",
    credentialId: "Infosys Springboard Verified",
    category: "Course Completion",
    skills: ["C Programming", "Core Syntax", "Memory & Pointers", "Algorithms", "Functions & Arrays"],
  },

  // --- Group C: iTronix Solutions (2 Certificates) ---
  {
    id: "itronix-c-cpp",
    title: "C & C++ Programming Language Certification",
    issuer: "iTronix Solutions",
    date: "25 October 2025",
    duration: "Course Completion",
    image: "/images/certificates/itronix-c-cpp.jpg",
    pdfUrl: "/certificates/itronix-c-cpp.pdf",
    credentialUrl: "https://itronixsolutions.com/courses/certificate/dc5c24858e",
    credentialId: "#00092509",
    category: "Course Completion",
    skills: ["C Programming", "C++", "Object-Oriented Programming", "Memory Management", "Algorithms"],
  },
  {
    id: "itronix-python-dsa",
    title: "Python Foundation with Data Structures & Algorithms",
    issuer: "iTronix Solutions",
    date: "25 October 2025",
    duration: "Course Completion",
    image: "/images/certificates/itronix-python-dsa.jpg",
    pdfUrl: "/certificates/itronix-python-dsa.pdf",
    credentialUrl: "https://itronixsolutions.com/courses/certificate/93de2263c3",
    credentialId: "#00092511",
    category: "Course Completion",
    skills: ["Python", "Data Structures", "Algorithms", "Problem Solving", "Complexity Analysis"],
  },

  // --- Group D: KnowledgeGate (1 Certificate) ---
  {
    id: "knowledgegate-c-programming",
    title: "C Programming (Score: 95%)",
    issuer: "KnowledgeGate",
    date: "October 26, 2025",
    duration: "Course Completion",
    image: "/images/certificates/knowledgegate-c-programming.jpg",
    pdfUrl: "/certificates/knowledgegate-c-programming.pdf",
    credentialUrl: "https://www.knowledgegate.ai//certificate/EA29E329",
    credentialId: "CERT-1761471814501-D1DEC662",
    category: "Course Completion",
    skills: ["C Programming", "Core Syntax", "Pointers & Memory", "Data Structures", "Problem Solving"],
  },

  // --- Group E: Udemy (3 Certificates) ---
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

  // --- Group F: MindLuster (2 Certificates) ---
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
  {
    id: "digital-electronics-mindluster",
    title: "Digital Electronics Fundamentals",
    issuer: "MindLuster",
    date: "Dec 2025",
    duration: "1 hour",
    image: "/images/certificates/cert-digital-electronics.jpg",
    pdfUrl: "/certificates/cert-digital-electronics.pdf",
    credentialUrl: "https://www.mindluster.com",
    credentialId: "5f4b7885",
    category: "Course Completion",
    skills: ["Digital Electronics", "Logic Gates", "Circuit Design", "Boolean Algebra"],
  },

  // --- Group G: Eduonix Learning Solutions (1 Certificate) ---
  {
    id: "c-programming-eduonix",
    title: "Learn the Basics of C Programming Language",
    issuer: "Eduonix Learning Solutions",
    date: "Oct 18, 2025",
    duration: "Course Completion",
    image: "/images/certificates/cert-c-programming-eduonix.jpg",
    pdfUrl: "/certificates/cert-c-programming-eduonix.pdf",
    credentialUrl: "https://www.eduonix.com/certificate/a0b27098cd",
    credentialId: "a0b27098cd",
    category: "Course Completion",
    skills: ["C Programming", "Procedural Programming", "Pointers & Memory", "Data Types", "Core Logic"],
  },
] as const;
