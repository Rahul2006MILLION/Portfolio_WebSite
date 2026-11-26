import { CodingProfileItem } from "@/types/portfolio";

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
    username: "Configurable Profile",
    profileUrl: "https://leetcode.com/Rahul2006MILLION", // Configurable handle
    handleOrRank: "100 Days Badge Milestone",
    tagline: "Algorithmic problem-solving foundation with historical record of 146 solved problems and verified 100 Days consistency badge.",
    metrics: [
      { label: "Historical Solved", value: "146 Problems" },
      { label: "Badge Earned", value: "100 Days Badge" },
      { label: "Status", value: "Historical Verified" }
    ],
    highlightColor: "#FFA116",
    isConfigurable: true
  }
];
