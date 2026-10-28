/**
 * =========================================================================
 * PROJECTS DATA REPOSITORY
 * -------------------------------------------------------------------------
 * To add a new project, simply append an object to the `PROJECTS` array below.
 * The UI will automatically render your new project card, apply responsive
 * grid styling, and include it in category filters.
 * =========================================================================
 */

export type ProjectCategory =
  | "websites"
  | "apps"
  | "ai-agents"
  | "google-business-profile";

export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  image: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured?: boolean;
  category: ProjectCategory;
  stats?: string;
}

/**
 * PROJECTS DATA REPOSITORY
 * -------------------------------------------------------------------------
 * Currently blank as requested. Projects will be populated later.
 * When adding projects, specify category as "websites" | "apps" | "ai-agents" | "google-business-profile".
 */
export const PROJECTS: readonly Project[] = [];
