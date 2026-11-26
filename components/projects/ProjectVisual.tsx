import React from "react";
import type { ProjectItem } from "@/types/portfolio";

type Category = ProjectItem["category"];

/** One accent per category, used for the visual, the eyebrow and hover light. */
export const CATEGORY_ACCENT: Record<Category, string> = {
  Research: "#e7b96f",
  "AI / ML": "#a9c48f",
  Robotics: "#e39468",
  "Software Engineering": "#93b6db",
  "Web Development": "#7fcbc1",
};

/**
 * Decorative, category-specific motion graphics (aria-hidden). They illustrate the *kind* of
 * work — they are not data and make no claims about results.
 */
export function ProjectVisual({ category, seed = 0 }: { category: Category; seed?: number }) {
  const c = CATEGORY_ACCENT[category];
  return (
    <svg viewBox="0 0 400 400" className="motif h-full w-full" aria-hidden="true" focusable="false">
      <defs>
        <radialGradient id={`glow-${seed}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={c} stopOpacity="0.28" />
          <stop offset="100%" stopColor={c} stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="400" height="400" fill={`url(#glow-${seed})`} />
      {category === "Research" && <Orbits c={c} />}
      {category === "AI / ML" && <Network c={c} seed={seed} />}
      {category === "Robotics" && <PathGrid c={c} />}
      {category === "Software Engineering" && <Layers c={c} />}
      {category === "Web Development" && <Browser c={c} />}
    </svg>
  );
}

function Orbits({ c }: { c: string }) {
  return (
    <g fill="none" stroke={c}>
      {[150, 115, 80, 45].map((r, i) => (
        <g key={r} style={{ animation: `${i % 2 ? "spin-rev" : "spin"} ${40 - i * 7}s linear infinite` }}>
          <circle cx="200" cy="200" r={r} strokeOpacity={0.25 + i * 0.12} strokeDasharray={i % 2 ? "2 7" : "40 12"} />
          <circle cx={200 + r} cy="200" r={4 - i * 0.5} fill={c} stroke="none" />
        </g>
      ))}
      <circle cx="200" cy="200" r="10" fill={c} stroke="none" style={{ animation: "pulse-dot 3s ease-in-out infinite" }} />
    </g>
  );
}

function Network({ c, seed }: { c: string; seed: number }) {
  const layers = [
    [90, 150, 210, 270, 330],
    [120, 200, 280],
    [160, 240],
  ];
  const xs = [80, 200, 320];
  const nodes = layers.flatMap((ys, li) => ys.map((y) => ({ x: xs[li], y, li })));
  return (
    <g>
      {nodes.map((a, i) =>
        nodes
          .filter((b) => b.li === a.li + 1)
          .map((b, j) => (
            <line key={`${i}-${j}`} x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke={c} strokeOpacity="0.22" strokeWidth="1" />
          ))
      )}
      {nodes.map((n, i) => (
        <circle
          key={i}
          cx={n.x}
          cy={n.y}
          r={n.li === 2 ? 10 : 7}
          fill={c}
          style={{ animation: `pulse-dot ${2.4 + ((i + seed) % 4) * 0.4}s ease-in-out ${(i * 0.23) % 2}s infinite` }}
        />
      ))}
    </g>
  );
}

function PathGrid({ c }: { c: string }) {
  const path = "M60 340 H140 V260 H220 V140 H300 V60 H340";
  return (
    <g>
      {Array.from({ length: 9 }, (_, i) => (
        <g key={i} stroke={c} strokeOpacity="0.12">
          <line x1={40 + i * 40} y1="40" x2={40 + i * 40} y2="360" />
          <line x1="40" y1={40 + i * 40} x2="360" y2={40 + i * 40} />
        </g>
      ))}
      {[
        [160, 300],
        [240, 220],
        [80, 180],
        [280, 120],
        [160, 100],
      ].map(([x, y], i) => (
        <rect key={i} x={x} y={y} width="40" height="40" fill={c} fillOpacity="0.16" />
      ))}
      <path d={path} fill="none" stroke={c} strokeWidth="3" strokeLinecap="round" strokeDasharray="760" strokeDashoffset="760" style={{ animation: "dash 4s ease-in-out infinite alternate" }} />
      <circle r="9" fill={c} style={{ offsetPath: `path("${path}")`, animation: "travel 4s ease-in-out infinite alternate" } as React.CSSProperties} />
      <circle cx="60" cy="340" r="6" fill="none" stroke={c} />
      <circle cx="340" cy="60" r="6" fill="none" stroke={c} />
    </g>
  );
}

function Layers({ c }: { c: string }) {
  return (
    <g>
      {[0, 1, 2, 3].map((i) => (
        <g key={i} style={{ animation: `float-y 4s ease-in-out ${i * 0.35}s infinite` }}>
          <path
            d={`M200 ${110 + i * 55} L320 ${165 + i * 55} L200 ${220 + i * 55} L80 ${165 + i * 55} Z`}
            fill={c}
            fillOpacity={0.08 + i * 0.05}
            stroke={c}
            strokeOpacity="0.55"
          />
        </g>
      ))}
    </g>
  );
}

function Browser({ c }: { c: string }) {
  return (
    <g>
      <rect x="60" y="80" width="280" height="240" rx="14" fill="none" stroke={c} strokeOpacity="0.6" />
      <line x1="60" y1="112" x2="340" y2="112" stroke={c} strokeOpacity="0.4" />
      {[0, 1, 2].map((i) => (
        <circle key={i} cx={80 + i * 14} cy="96" r="4" fill={c} fillOpacity="0.6" />
      ))}
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <rect
          key={i}
          x={80 + (i % 3) * 85}
          y={130 + Math.floor(i / 3) * 90}
          width="70"
          height="76"
          rx="8"
          fill={c}
          fillOpacity="0.18"
          stroke={c}
          strokeOpacity="0.45"
          style={{ animation: `slide-in-card 5s ease-in-out ${i * 0.25}s infinite` }}
        />
      ))}
    </g>
  );
}
