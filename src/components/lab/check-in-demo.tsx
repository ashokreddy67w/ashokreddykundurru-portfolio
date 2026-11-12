"use client";

import { useState } from "react";

type Entry = { type: "in" | "out"; at: string };

// A live React component: state, derived values and event handlers.
export function CheckInDemo() {
  const [log, setLog] = useState<Entry[]>([]);
  const checkedIn = log.at(-1)?.type === "in";
  const toggle = () => setLog([...log, { type: checkedIn ? "out" : "in", at: new Date().toLocaleTimeString() }]);

  return (
    <div className="border-border bg-surface rounded-md border p-5 sm:p-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-muted text-sm">Status</p>
          <p className="text-xl font-semibold">{checkedIn ? "Checked in" : "Checked out"}</p>
        </div>
        <button
          onClick={toggle}
          className={`rounded-md px-4 py-2 text-sm font-medium transition ${checkedIn ? "border-border hover:bg-bg border" : "bg-accent text-accent-fg hover:opacity-90"}`}
        >
          {checkedIn ? "Check out" : "Check in"}
        </button>
      </div>
      <ul className="mt-5 max-h-40 space-y-1 overflow-y-auto font-mono text-sm" aria-live="polite">
        {log.length === 0 && <li className="text-muted">No events yet.</li>}
        {log.map((e, i) => (
          <li key={i} className="border-border flex justify-between border-t pt-1">
            <span className={e.type === "in" ? "text-accent" : "text-muted"}>{e.type === "in" ? "→ check-in" : "← check-out"}</span>
            <span className="text-muted">{e.at}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
