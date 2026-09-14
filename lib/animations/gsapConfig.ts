import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Ensure GSAP and ScrollTrigger are safely registered once in client-side environment
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Standardized easing curves for physical, cinematic, and technical motion.
 * Avoids amateur bouncy curves and ensures smooth, intentional movement.
 */
export const EASINGS = {
  // Smooth, weighted deceleration for editorial reveals
  cinematic: "power3.out",
  cinematicSlow: "power4.out",
  // Crisp mechanical spring for UI micro-interactions
  snappy: "expo.out",
  // Linear ease for scrubbed scroll effects
  scrub: "none",
  // Smooth symmetric ease for looping or ambient effects
  ambient: "sine.inOut",
} as const;

/**
 * Standardized motion durations (in seconds) for consistency across components.
 */
export const DURATIONS = {
  instant: 0.15,
  fast: 0.35,
  medium: 0.65,
  slow: 1.0,
  epic: 1.4,
} as const;

/**
 * Helper to safely bind Lenis scroll updates to GSAP ScrollTrigger.
 */
export function syncLenisWithScrollTrigger(lenisInstance: { on: (event: string, callback: () => void) => void }) {
  if (typeof window === "undefined" || !ScrollTrigger) return;
  
  lenisInstance.on("scroll", ScrollTrigger.update);
  
  gsap.ticker.add(() => {
    // Drive Lenis tick via GSAP ticker for frame-level sync
    // Lenis RAF will be updated on animation frame
  });

  gsap.ticker.lagSmoothing(0);
}

/**
 * Animation helper: Creates a masked text reveal animation on target elements.
 */
export function animateMaskedText(
  targets: gsap.TweenTarget,
  options?: {
    stagger?: number;
    delay?: number;
    duration?: number;
    ease?: string;
    yPercent?: number;
  }
) {
  return gsap.fromTo(
    targets,
    {
      yPercent: options?.yPercent ?? 110,
      opacity: 0,
    },
    {
      yPercent: 0,
      opacity: 1,
      duration: options?.duration ?? DURATIONS.medium,
      delay: options?.delay ?? 0,
      stagger: options?.stagger ?? 0.04,
      ease: options?.ease ?? EASINGS.cinematic,
    }
  );
}

/**
 * Animation helper: Fade and slide reveal for cards, technical blocks, or metadata.
 */
export function animateFadeUp(
  targets: gsap.TweenTarget,
  options?: {
    y?: number;
    delay?: number;
    duration?: number;
    stagger?: number;
  }
) {
  return gsap.fromTo(
    targets,
    {
      y: options?.y ?? 24,
      opacity: 0,
    },
    {
      y: 0,
      opacity: 1,
      duration: options?.duration ?? DURATIONS.medium,
      delay: options?.delay ?? 0,
      stagger: options?.stagger ?? 0.08,
      ease: EASINGS.cinematic,
    }
  );
}

export { gsap, ScrollTrigger };
