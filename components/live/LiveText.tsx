import React from "react";
import { LEETCODE_SOLVED_TOKEN } from "@/lib/leetcode/token";
import { LeetCodeSolved } from "./LeetCodeSolved";

/**
 * Renders a content string, swapping live-data tokens (e.g. {{leetcode.solved}}) for live
 * components. Plain strings pass through unchanged.
 */
export function LiveText({ text }: { text: string }) {
  if (!text.includes(LEETCODE_SOLVED_TOKEN)) return <>{text}</>;
  const parts = text.split(LEETCODE_SOLVED_TOKEN);
  return (
    <>
      {parts.map((part, i) => (
        <React.Fragment key={i}>
          {part}
          {i < parts.length - 1 && <LeetCodeSolved />}
        </React.Fragment>
      ))}
    </>
  );
}
