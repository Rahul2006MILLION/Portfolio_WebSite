import { CodingProfileItem } from "@/types/portfolio";
import { LEETCODE_SOLVED_TOKEN } from "@/lib/leetcode/token";

export const codingProfilesData: CodingProfileItem[] = [
  {
    id: "profile-github",
    platform: "GitHub",
    username: "Rahul2006MILLION",
    profileUrl: "https://github.com/Rahul2006MILLION",
    handleOrRank: "@Rahul2006MILLION",
    tagline: "Active open-source repositories spanning multilingual LLM confidence calibration, decentralized multi-robot coordination, and deterministic full-stack financial systems.",
    metrics: [
      { label: "Repositories", value: "11+" },
      { label: "Core Stack", value: "Python · PyTorch · TS" },
      { label: "Verified Repos", value: "100% Public" }
    ],
    highlightColor: "#F8FAFC"
  },
  {
    id: "profile-linkedin",
    platform: "LinkedIn",
    username: "rahul-jain-437a06322",
    profileUrl: "https://linkedin.com/in/rahul-jain-437a06322",
    handleOrRank: "N. P. Rahul Jain",
    tagline: "Professional updates, engineering project deep-dives, academic milestones at Dayananda Sagar University, and technical network collaboration.",
    metrics: [
      { label: "Network", value: "Active Connection" },
      { label: "University", value: "Dayananda Sagar Univ" },
      { label: "Focus", value: "AI / ML & Systems" }
    ],
    highlightColor: "#0A66C2"
  },
  {
    id: "profile-leetcode",
    platform: "LeetCode",
    username: "RySCledatk",
    profileUrl: "https://leetcode.com/u/RySCledatk/",
    handleOrRank: "@RySCledatk",
    tagline: `Algorithmic problem-solving foundation — ${LEETCODE_SOLVED_TOKEN} (live from LeetCode) — and a verified 100 Days consistency badge.`,
    metrics: [
      { label: "Solved", value: LEETCODE_SOLVED_TOKEN },
      { label: "Badge Earned", value: "100 Days Badge" },
      { label: "Status", value: "Verified Profile" }
    ],
    highlightColor: "#FFA116",
    isConfigurable: false
  }
];
