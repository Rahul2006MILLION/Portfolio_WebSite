/** Shape served by /api/leetcode and cached in the browser. Source-agnostic on purpose. */
export interface SolvedStats {
  source: "leetcode";
  username: string;
  /** total accepted (solved) problems, straight from the live response */
  solved: number;
  breakdown: { easy: number; medium: number; hard: number };
  /** ISO time the upstream value was fetched */
  fetchedAt: string;
  /** true when served from the last good value because the upstream call failed */
  stale: boolean;
}

/** A swappable data source (LeetCode GraphQL today; could be another API later). */
export interface SolvedCountSource {
  fetchSolved(username: string): Promise<Omit<SolvedStats, "stale">>;
}

/** How long a fetched value is considered fresh, server and client side (6 hours). */
export const SOLVED_TTL_MS = 6 * 60 * 60 * 1000;

/** Runtime validation shared by the server (upstream data) and the client (API response). */
export function isValidSolvedStats(v: unknown): v is SolvedStats {
  if (!v || typeof v !== "object") return false;
  const s = v as Record<string, unknown>;
  const b = s.breakdown as Record<string, unknown> | undefined;
  const int = (n: unknown) => typeof n === "number" && Number.isInteger(n) && n >= 0 && n < 100_000;
  return (
    s.source === "leetcode" &&
    typeof s.username === "string" &&
    int(s.solved) &&
    !!b &&
    int(b.easy) &&
    int(b.medium) &&
    int(b.hard) &&
    (b.easy as number) + (b.medium as number) + (b.hard as number) === s.solved &&
    typeof s.fetchedAt === "string" &&
    !Number.isNaN(Date.parse(s.fetchedAt)) &&
    typeof s.stale === "boolean"
  );
}
