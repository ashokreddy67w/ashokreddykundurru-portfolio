"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

// A soft ring that trails the pointer and grows over links. The native cursor stays visible.
// Skipped on touch screens and when the visitor prefers reduced motion.
export function Cursor() {
  const ring = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!matchMedia("(pointer: fine)").matches || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = ring.current!;
    const x = gsap.quickTo(el, "x", { duration: 0.35, ease: "power3" });
    const y = gsap.quickTo(el, "y", { duration: 0.35, ease: "power3" });

    const move = (e: PointerEvent) => {
      if (el.style.display !== "grid") {
        gsap.set(el, { x: e.clientX, y: e.clientY });
        el.style.display = "grid"; // show only once we know where the pointer is
      }
      x(e.clientX);
      y(e.clientY);
    };
    const over = (e: PointerEvent) => {
      const t = (e.target as HTMLElement).closest<HTMLElement>("a, button, [data-cursor]");
      const text = t?.dataset.cursor ?? "";
      label.current!.textContent = text;
      gsap.to(el, { scale: t ? (text ? 3.2 : 1.8) : 1, backgroundColor: text ? "var(--accent)" : "transparent", duration: 0.3 });
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerover", over);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", over);
    };
  }, []);

  return (
    <div
      ref={ring}
      aria-hidden
      className="border-accent/70 pointer-events-none fixed top-0 left-0 z-[65] -mt-4 -ml-4 hidden size-8 place-items-center rounded-full border mix-blend-difference"
    >
      <span ref={label} className="text-accent-fg font-mono text-[4px] font-semibold tracking-wider uppercase" />
    </div>
  );
}
