export type ProjectCategory =
  | "All"
  | "AI / ML"
  | "Research"
  | "Robotics"
  | "Software Engineering"
  | "Web Development";

export interface ProfileData {
  name: string;
  shortName: string;
  role: string;
  specialization: string;
  tagline: string;
  shortBio: string;
  fullBio: string[];
  photoUrl: string;
  photoAlt: string;
  location: string;
  email: string;
  universityEmail: string;
  university: string;
  degree: string;
  duration: string;
  cgpa: string;
  availability: string;
  statusBadge: string;
  resumeUrl: string;
  socialLinks: {
    github: string;
    linkedin: string;
    leetcode?: string;
    email: string;
    universityEmail: string;
  };
  metrics: Array<{
    label: string;
    value: string;
    sublabel?: string;
  }>;
  focusAreas: string[];
}

export interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  specialization?: string;
  period: string;
  status: "Completed" | "In Progress";
  location?: string;
  score: string;
  scoreType: "CGPA" | "Percentage";
  coursework?: string[];
  highlights?: string[];
  description?: string;
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  type: string;
  summary: string;
  deliverables: Array<{
    title: string;
    description: string;
    metrics?: string;
    technologies?: string[];
  }>;
}

export interface SkillCategoryGroup {
  id: string;
  title: string;
  categoryNumber: string;
  description: string;
  skills: Array<{
    name: string;
    isKeySkill?: boolean;
    levelTag?: string;
  }>;
}

export interface ProjectItem {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  category: Exclude<ProjectCategory, "All">;
  featured: boolean;
  thumbnail?: string;
  problemStatement: string;
  solution: string;
  contribution: string;
  technologies: string[];
  keyFeatures: string[];
  metrics?: Array<{
    label: string;
    value: string;
  }>;
  githubUrl?: string;
  liveUrl?: string;
  docsUrl?: string;
  status: string;
  year: string;
  reportedNote?: string;
}

export interface ResearchItem {
  id: string;
  slug: string;
  title: string;
  researchProblem: string;
  proposedApproach: string;
  experimentalMethodology: string;
  implementationStatus: string;
  technologies: string[];
  keyFindings: string[];
  githubUrl: string;
  paperUrl?: string;
  note?: string;
}

export interface AchievementItem {
  id: string;
  categoryLabel: string;
  title: string;
  organization: string;
  period: string;
  description: string;
  keyPoints: string[];
  badge?: string;
  proofLink?: string;
}

export interface CodingProfileItem {
  id: string;
  platform: "GitHub" | "LinkedIn" | "LeetCode";
  username: string;
  profileUrl: string;
  handleOrRank: string;
  tagline: string;
  metrics: Array<{
    label: string;
    value: string;
  }>;
  highlightColor?: string;
  isConfigurable?: boolean;
}

export type CertificateStatus = "Completed" | "Participation" | "Award";

export interface CertificateItem {
  id: string;
  title: string;
  /** organisation that issued / awarded the certificate */
  issuer: string;
  /** e.g. "Authorized by DeepLearning.AI and Stanford Online", exactly as the document states */
  authority?: string;
  /** human-readable date as printed on the certificate */
  date: string;
  /** ISO date (YYYY-MM-DD) of the certificate, for sorting and <time> */
  isoDate: string;
  description: string;
  status: CertificateStatus;
  /** facts printed on the certificate (duration, score, credits, ...) */
  details: Array<{ label: string; value: string }>;
  /** the original, unmodified document as uploaded (served from /public) */
  original: { href: string; type: "pdf" | "image" };
  /** full-size image used in the lightbox (a render of the PDF, or the original image itself) and a card thumbnail */
  preview: { full: string; thumb: string; width: number; height: number };
  verificationUrl?: string;
  featured: boolean;
  /** featured-card treatment: the eyebrow label and a quiet accent colour */
  highlight?: { label: string; accent: "cardinal" | "evergreen" };
}
