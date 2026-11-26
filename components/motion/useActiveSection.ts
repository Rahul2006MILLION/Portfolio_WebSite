"use client";

import { useEffect, useState } from "react";

/** The section (by "#id") currently crossing the middle of the viewport. */
export function useActiveSection(hrefs: string[]): string | null {
  const [active, setActive] = useState<string | null>(null);
  const key = hrefs.join("|");
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          const id = `#${e.target.id}`;
          if (e.isIntersecting) setActive(id);
          else setActive((cur) => (cur === id ? null : cur)); // left the watched section
        }
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    key.split("|").forEach((h) => {
      const el = h ? document.querySelector(h) : null;
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, [key]);
  return active;
}
