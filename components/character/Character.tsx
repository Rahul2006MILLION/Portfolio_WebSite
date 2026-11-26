"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useCallback, useState, useSyncExternalStore } from "react";
import { cn } from "@/lib/utils/cn";
import { checkWebGLSupport } from "@/lib/utils/device";
import rig from "./characterRig.json";

// three.js + shader are only fetched in the browser, after the static portrait is on screen
const CharacterCanvas = dynamic(() => import("./CharacterCanvas"), { ssr: false });

const REDUCED = "(prefers-reduced-motion: reduce)";
let webgl: boolean | null = null;

function subscribe(cb: () => void) {
  const mq = window.matchMedia(REDUCED);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}
function canAnimate() {
  if (webgl === null) webgl = checkWebGLSupport();
  return webgl && !window.matchMedia(REDUCED).matches;
}

interface CharacterProps {
  className?: string;
  /** rendered alt text for the static portrait */
  alt?: string;
}

/**
 * The hero character. Server-renders the approved render as a normal image (fast LCP, works
 * without JS / WebGL / with reduced motion), then swaps in the live WebGL version that blinks
 * and follows the pointer with its eyes.
 */
export function Character({ className, alt = "Illustrated 3D portrait of N. P. Rahul Jain" }: CharacterProps) {
  const animate = useSyncExternalStore(subscribe, canAnimate, () => false);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const onReady = useCallback(() => setReady(true), []);
  const onFail = useCallback(() => setFailed(true), []);
  const live = animate && !failed;

  return (
    <div
      className={cn("relative", className)}
      style={{ aspectRatio: `${rig.width} / ${rig.height}` }}
      data-character-state={live ? (ready ? "live" : "loading") : "static"}
    >
      <Image
        src="/character/rahul-character.webp"
        alt={alt}
        width={rig.width}
        height={rig.height}
        fetchPriority="high"
        loading="eager"
        unoptimized
        draggable={false}
        className={cn(
          "absolute inset-0 h-full w-full select-none transition-opacity duration-500",
          live && ready ? "opacity-0" : "opacity-100"
        )}
      />
      {live && <CharacterCanvas onReady={onReady} onFail={onFail} />}
    </div>
  );
}
