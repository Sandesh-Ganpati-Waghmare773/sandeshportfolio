export interface SocialLink {
  name: string;
  label: string;
  href: string;
  username: string;
  icon: "Github" | "Linkedin" | "LeetCode" | "Mail";
  color: string;
  badge: string;
  ariaLabel: string;
}

export interface ContactInfo {
  email: string;
  location: string;
  timezone: string;
  status: string;
  statusDetail: string;
}

export const CONTACT_INFO: ContactInfo = {
  email: "wsandesh560@gmail.com",
  location: "Pune, Maharashtra, India",
  timezone: "IST (UTC+05:30)",
  status: "Available for Opportunities",
  statusDetail: "Open for developer internships, freelance web projects, and technical collaborations.",
};

export const SOCIAL_PROFILES: readonly SocialLink[] = [
  {
    name: "LinkedIn",
    label: "Professional Network",
    href: "https://www.linkedin.com/in/sandesh-waghmare-b8525338b",
    username: "in/sandesh-waghmare-b8525338b",
    icon: "Linkedin",
    color: "from-blue-600 to-indigo-600",
    badge: "Connect & Network",
    ariaLabel: "Visit Sandesh Waghmare on LinkedIn",
  },
  {
    name: "GitHub",
    label: "Code & Open Source",
    href: "https://github.com/Sandesh-Ganpati-Waghmare773",
    username: "Sandesh-Ganpati-Waghmare773",
    icon: "Github",
    color: "from-zinc-700 to-zinc-900",
    badge: "Repositories",
    ariaLabel: "View Sandesh Waghmare's GitHub",
  },
  {
    name: "LeetCode",
    label: "Algorithmic Problem Solving",
    href: "https://leetcode.com/u/Sandesh_Ganpati_Waghmare/",
    username: "Sandesh_Ganpati_Waghmare",
    icon: "LeetCode",
    color: "from-amber-600 to-yellow-600",
    badge: "Problems Solved",
    ariaLabel: "View Sandesh Waghmare's LeetCode",
  },
  {
    name: "Email",
    label: "Direct Inquiries",
    href: "mailto:wsandesh560@gmail.com",
    username: "wsandesh560@gmail.com",
    icon: "Mail",
    color: "from-indigo-600 to-purple-600",
    badge: "Direct Email",
    ariaLabel: "Email Sandesh Waghmare",
  },
] as const;

export const INQUIRY_TYPES = [
  "General Inquiry",
  "Website Development",
  "Frontend / UI Project",
  "WordPress Development",
  "Internship / Job Opportunity",
  "Open Source Collaboration",
] as const;
