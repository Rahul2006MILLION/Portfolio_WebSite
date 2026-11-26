import { LEETCODE_USERNAME } from "@/lib/leetcode/config";
import { leetcodeGraphqlSource } from "@/lib/leetcode/leetcodeGraphql";
import { SOLVED_TTL_MS, type SolvedCountSource, type SolvedStats } from "@/lib/leetcode/types";

/**
 * GET /api/leetcode → live solved-problem count for the portfolio's LeetCode profile.
 *
 * - Fresh value cached in memory for 6 h (and for CDNs via Cache-Control), so LeetCode is hit
 *   at most a few times a day per server instance.
 * - If LeetCode fails, the last successfully fetched value is returned with `stale: true`.
 * - With no successful fetch yet, it answers 503 — never a made-up number.
 * Rendered per request (not at build time), so a LeetCode outage can't break a deploy.
 */
export const dynamic = "force-dynamic";

const source: SolvedCountSource = leetcodeGraphqlSource;
const RETRY_AFTER_FAILURE_MS = 10 * 60 * 1000;

let lastGood: Omit<SolvedStats, "stale"> | null = null;
let lastFailureAt = 0;
let inFlight: Promise<Omit<SolvedStats, "stale">> | null = null;

function json(body: unknown, status: number, maxAgeSeconds: number) {
  return Response.json(body, {
    status,
    headers: {
      "Cache-Control":
        maxAgeSeconds > 0
          ? `public, max-age=0, s-maxage=${maxAgeSeconds}, stale-while-revalidate=${maxAgeSeconds * 2}`
          : "no-store",
    },
  });
}

export async function GET() {
  if (!LEETCODE_USERNAME) return json({ error: "No LeetCode profile configured" }, 500, 0);

  const now = Date.now();
  const age = lastGood ? now - Date.parse(lastGood.fetchedAt) : Infinity;
  const ttlLeft = Math.max(0, Math.floor((SOLVED_TTL_MS - age) / 1000));

  if (lastGood && age < SOLVED_TTL_MS) return json({ ...lastGood, stale: false }, 200, ttlLeft);

  // after a failure, don't hammer LeetCode on every request
  const coolingDown = now - lastFailureAt < RETRY_AFTER_FAILURE_MS;
  if (!coolingDown) {
    try {
      inFlight ??= source.fetchSolved(LEETCODE_USERNAME);
      lastGood = await inFlight;
      return json({ ...lastGood, stale: false }, 200, SOLVED_TTL_MS / 1000);
    } catch (err) {
      lastFailureAt = now;
      console.warn("[api/leetcode] upstream fetch failed:", err instanceof Error ? err.message : err);
    } finally {
      inFlight = null;
    }
  }

  if (lastGood) return json({ ...lastGood, stale: true }, 200, 600);
  return json({ error: "LeetCode statistics are temporarily unavailable" }, 503, 0);
}
