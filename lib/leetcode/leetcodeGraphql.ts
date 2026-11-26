import type { SolvedCountSource } from "./types";

/**
 * Reads the public profile statistics from LeetCode's GraphQL endpoint (no credentials needed).
 * The browser can't call it directly (LeetCode rejects cross-origin preflights), so this only
 * runs on the server.
 */
const ENDPOINT = "https://leetcode.com/graphql";
const QUERY = `query userSolved($username: String!) {
  matchedUser(username: $username) {
    username
    submitStatsGlobal { acSubmissionNum { difficulty count } }
  }
}`;

export class UpstreamError extends Error {
  readonly status?: number;
  constructor(message: string, status?: number) {
    super(message);
    this.status = status;
  }
}

export const leetcodeGraphqlSource: SolvedCountSource = {
  async fetchSolved(username) {
    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Referer: "https://leetcode.com",
        "User-Agent": "portfolio-solved-count/1.0",
      },
      body: JSON.stringify({ query: QUERY, variables: { username } }),
      cache: "no-store", // caching is handled explicitly by the route
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) throw new UpstreamError(`LeetCode responded ${res.status}`, res.status);

    const json = (await res.json()) as {
      data?: { matchedUser?: { username?: string; submitStatsGlobal?: { acSubmissionNum?: { difficulty: string; count: number }[] } } | null };
      errors?: { message: string }[];
    };
    const user = json.data?.matchedUser;
    if (json.errors?.length || !user) throw new UpstreamError(json.errors?.[0]?.message ?? "User not found");
    if (user.username?.toLowerCase() !== username.toLowerCase()) throw new UpstreamError("Unexpected user in response");

    const rows = user.submitStatsGlobal?.acSubmissionNum ?? [];
    const pick = (d: string) => rows.find((r) => r.difficulty === d)?.count;
    const solved = pick("All");
    const easy = pick("Easy");
    const medium = pick("Medium");
    const hard = pick("Hard");
    if ([solved, easy, medium, hard].some((n) => typeof n !== "number" || !Number.isInteger(n) || n < 0)) {
      throw new UpstreamError("Malformed solved statistics");
    }
    if (easy! + medium! + hard! !== solved) throw new UpstreamError("Solved statistics do not add up");

    return {
      source: "leetcode",
      username: user.username!,
      solved: solved!,
      breakdown: { easy: easy!, medium: medium!, hard: hard! },
      fetchedAt: new Date().toISOString(),
    };
  },
};
