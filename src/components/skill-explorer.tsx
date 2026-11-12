"use client";

import Link from "next/link";
import { useState } from "react";
import { skillGroups } from "@/lib/skills";
import { projects } from "@/lib/projects";

export function SkillExplorer() {
  const [name, setName] = useState(skillGroups[0].skills[0].name);
  const skill = skillGroups.flatMap((g) => g.skills).find((s) => s.name === name)!;

  return (
    <div className="grid gap-8 sm:grid-cols-[1fr_1.2fr]">
      <div className="space-y-4">
        {skillGroups.map((g) => (
          <div key={g.group}>
            <h3 className="text-muted font-mono text-xs tracking-[0.15em] uppercase">{g.group}</h3>
            <div className="mt-1 flex flex-wrap gap-x-3 gap-y-1">
              {g.skills.map((s) => (
                <button
                  key={s.name}
                  aria-pressed={s.name === name}
                  onClick={() => setName(s.name)}
                  className={`text-left text-xl ${s.name === name ? "text-accent underline underline-offset-4" : "hover:text-accent"}`}
                >
                  {s.name}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div aria-live="polite" className="bg-surface self-start rounded-md p-5 sm:sticky sm:top-28">
        <h3 className="text-lg font-semibold">{skill.name}</h3>
        <p className="mt-2">{skill.what}</p>
        <p className="text-muted mt-3">
          <span className="text-fg">Used for: </span>
          {skill.where.replace(/\.$/, "").toLowerCase()}.
        </p>
        <p className="text-muted mt-3">
          <span className="text-fg">Me: </span>
          {skill.how}
        </p>
        <p className="ink text-muted mt-3">
          <span className="text-fg">Projects: </span>
          {skill.projects.length === 0
            ? "coursework and practice so far"
            : skill.projects.map((slug, i) => (
                <span key={slug}>
                  {i > 0 && ", "}
                  <Link href={slug === "emas-attendance" ? "/emas" : `/projects/${slug}`}>{projects.find((p) => p.slug === slug)?.name}</Link>
                </span>
              ))}
        </p>
      </div>
    </div>
  );
}
