"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const reduced = () => matchMedia("(prefers-reduced-motion: reduce)").matches;

// Splits text into words that slide up from a mask. Screen readers get the plain text.
export function RevealText({
  text,
  as: Tag = "h2",
  className = "",
  delay = 0,
  onLoad = false,
  accent = [],
}: {
  text: string;
  as?: "h1" | "h2" | "p";
  className?: string;
  delay?: number;
  onLoad?: boolean;
  accent?: string[]; // words drawn in the italic serif accent
}) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const words = ref.current!.querySelectorAll("[data-word]");
    // y: 0 clears the offset GSAP reads from the CSS start state, so only yPercent animates.
    if (reduced() || onLoad) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        words,
        { y: 0, yPercent: 110 },
        {
          yPercent: 0,
          duration: 1.1,
          delay,
          ease: "expo.out",
          stagger: 0.04,
          scrollTrigger: onLoad ? undefined : { trigger: ref.current, start: "top 85%" },
        },
      );
    });
    return () => ctx.revert();
  }, [delay, onLoad]);

  return (
    <Tag ref={ref as never} className={className} data-reveal-line>
      <span className="sr-only">{text}</span>
      {text.split(" ").map((w, i) => (
        <span key={i} className="line-mask" aria-hidden>
          <span data-word className={accent.includes(w.replace(/[.,]/g, "")) ? "serif text-accent" : undefined}>
            {w}&nbsp;
          </span>
        </span>
      ))}
    </Tag>
  );
}

// Fades and lifts children into view once.
export function FadeIn({ children, className = "", y = 40 }: { children: React.ReactNode; className?: string; y?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (reduced()) return;
    const ctx = gsap.context(() => {
      gsap.from(ref.current, { opacity: 0, y, duration: 1.2, ease: "expo.out", scrollTrigger: { trigger: ref.current, start: "top 88%" } });
    });
    return () => ctx.revert();
  }, [y]);
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
