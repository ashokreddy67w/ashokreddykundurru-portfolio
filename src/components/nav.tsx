"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { nav, site } from "@/lib/site";

export function Nav() {
  const path = usePathname();
  // Remember which page the menu was opened on, so navigating closes it without an effect.
  const [openOn, setOpenOn] = useState<string | null>(null);
  const open = openOn === path;
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpenOn(null);
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);
  const active = (href: string) => path === href || path.startsWith(href + "/");

  return (
    <header className="from-bg via-bg/80 fixed inset-x-0 top-0 z-50 bg-gradient-to-b to-transparent">
      <nav aria-label="Main" className="flex items-center justify-between px-5 py-5 mix-blend-difference sm:px-8">
        <Link href="/" className="font-mono text-xs tracking-[0.08em] text-white sm:tracking-[0.15em]">
          {site.name}
        </Link>
        <ul className="hidden items-center gap-7 lg:flex">
          {nav.map((n) => (
            <li key={n.href}>
              <Link
                href={n.href}
                aria-current={active(n.href) ? "page" : undefined}
                className={`link-u font-mono text-xs tracking-[0.2em] uppercase ${active(n.href) ? "text-white" : "text-white/60 hover:text-white"}`}
              >
                {n.label}
              </Link>
            </li>
          ))}
        </ul>
        <button
          className="font-mono text-xs tracking-[0.2em] text-white uppercase lg:hidden"
          onClick={() => setOpenOn(open ? null : path)}
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          {open ? "Close" : "Menu"}
        </button>
      </nav>
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
            className="bg-bg fixed inset-0 -z-10 flex flex-col justify-end px-5 pb-12 lg:hidden"
          >
            <ul>
              {nav.map((n, i) => (
                <motion.li key={n.href} initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.15 + i * 0.05 }}>
                  <Link href={n.href} className="display block py-1 text-6xl text-white">
                    {n.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
