import { codingProfilesData } from "@/data/codingProfiles";

/** The LeetCode username comes from the existing profile data, so there is one place to change it. */
export const LEETCODE_USERNAME =
  codingProfilesData.find((p) => p.platform === "LeetCode")?.username ?? "";

export { LEETCODE_SOLVED_TOKEN } from "./token";
