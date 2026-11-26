import { AchievementItem } from "@/types/portfolio";
import { LEETCODE_SOLVED_TOKEN } from "@/lib/leetcode/token";

export const achievementsData: AchievementItem[] = [
  {
    id: "ach-visionx-2026-excellence",
    categoryLabel: "PROJECT EXPO · TEAM AWARD",
    title: "Certificate of Excellence — VisionX 2026",
    organization: "Dept. of CSE (AI & ML), School of Engineering, Dayananda Sagar University",
    period: "November 23, 2026",
    description: "Our team's project was adjudged the best in its evaluation panel at VisionX 2026, the department's IPCV (Image Processing and Computer Vision) Project Expo.",
    keyPoints: [
      "Team award, shared by a four-member team that included N. P. Rahul Jain",
      "Excellence Award: best project in its evaluation panel",
      "B.Tech CSE (AI & ML), Semester V — certificate shown under Certifications & Learning"
    ],
    badge: "TEAM EXCELLENCE AWARD"
  },
  {
    id: "ach-leetcode-100",
    categoryLabel: "COMPETITIVE PROGRAMMING",
    title: "100 Days LeetCode Badge",
    organization: "LeetCode Platform",
    period: "Verified Milestone",
    description: "Awarded the official 100 Days Badge on LeetCode for disciplined daily algorithmic problem solving across data structures and computational paradigms.",
    keyPoints: [
      "Awarded official LeetCode 100 Days continuous consistency badge",
      `${LEETCODE_SOLVED_TOKEN} across arrays, trees, dynamic programming, and graphs (live count from LeetCode)`,
      "Continuous algorithmic optimization practice in Python and C++"
    ],
    badge: "100 DAYS BADGE",
    proofLink: "https://leetcode.com/u/RySCledatk/"
  },
  {
    id: "ach-class-representative",
    categoryLabel: "STUDENT LEADERSHIP",
    title: "Class Representative // B.Tech CSE (AI & ML)",
    organization: "Dayananda Sagar University",
    period: "2024 — Present",
    description: "Elected as Class Representative for the Computer Science & Engineering (Artificial Intelligence and Machine Learning) department cohort.",
    keyPoints: [
      "Representing the student cohort before faculty heads and academic coordinators",
      "Coordinating academic schedules, laboratory sessions, and technical project submissions",
      "Facilitating peer problem-solving circles and curriculum feedback channels"
    ],
    badge: "CLASS REPRESENTATIVE"
  },
  {
    id: "ach-sih-team-head",
    categoryLabel: "HACKATHON LEADERSHIP",
    title: "Team Head // Smart India Hackathon (SIH) Participation",
    organization: "Ministry of Education / AICTE & DSU",
    period: "2024",
    description: "Served as Team Head leading a collegiate engineering team participating in the prestigious nationwide Smart India Hackathon initiative.",
    keyPoints: [
      "Led the ideation, system architecture formulation, and problem breakdown for the team's proposal",
      "Directed collaborative software development sprints and technical presentation documentation",
      "Coordinated cross-functional tasks across AI model prototyping and web interface development"
    ],
    badge: "TEAM HEAD"
  }
];
