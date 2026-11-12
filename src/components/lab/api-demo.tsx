"use client";

import { useState } from "react";
import { CodeBlock } from "@/components/code-block";

type Emp = { id: number; name: string; role: string };

// Simulated in the browser — no network request is made.
export function ApiDemo() {
  const [db, setDb] = useState<Emp[]>([
    { id: 1, name: "Asha", role: "employee" },
    { id: 2, name: "Ravi", role: "team_lead" },
  ]);
  const [name, setName] = useState("Kiran");
  const [log, setLog] = useState<{ req: string; res: string }>({ req: "GET /api/v1/employees", res: JSON.stringify(db, null, 2) });

  const run = (method: "GET" | "POST" | "DELETE") => {
    if (method === "GET") return setLog({ req: "GET /api/v1/employees", res: `200 OK\n${JSON.stringify(db, null, 2)}` });
    if (method === "POST") {
      const n = name.trim();
      const body = JSON.stringify({ name: n, role: "employee" }, null, 2);
      if (!n)
        return setLog({
          req: `POST /api/v1/employees\n${body}`,
          res: `422 Unprocessable Entity\n${JSON.stringify({ detail: "name must not be empty" }, null, 2)}`,
        });
      const emp = { id: Math.max(0, ...db.map((e) => e.id)) + 1, name: n, role: "employee" };
      setDb([...db, emp]);
      return setLog({ req: `POST /api/v1/employees\n${body}`, res: `201 Created\n${JSON.stringify(emp, null, 2)}` });
    }
    const last = db.at(-1);
    if (!last) return setLog({ req: "DELETE /api/v1/employees/1", res: `404 Not Found\n${JSON.stringify({ detail: "employee not found" }, null, 2)}` });
    setDb(db.slice(0, -1));
    setLog({ req: `DELETE /api/v1/employees/${last.id}`, res: "204 No Content" });
  };

  return (
    <div className="border-border bg-surface rounded-md border p-5 sm:p-6">
      <div className="flex flex-wrap items-end gap-3">
        <button onClick={() => run("GET")} className="border-border hover:border-accent rounded-lg border px-3 py-2 font-mono text-sm">
          GET
        </button>
        <label className="flex items-center gap-2 text-sm">
          <span className="sr-only">Employee name</span>
          <input value={name} onChange={(e) => setName(e.target.value)} className="border-border bg-bg w-32 rounded-lg border px-3 py-2 font-mono text-sm" />
        </label>
        <button onClick={() => run("POST")} className="border-border hover:border-accent rounded-lg border px-3 py-2 font-mono text-sm">
          POST
        </button>
        <button onClick={() => run("DELETE")} className="border-border hover:border-accent rounded-lg border px-3 py-2 font-mono text-sm">
          DELETE last
        </button>
      </div>
      <div className="grid gap-x-4 md:grid-cols-2">
        <CodeBlock code={log.req} lang="http" title="request" />
        <CodeBlock code={log.res} lang="json" title="response" />
      </div>
      <p className="text-muted text-xs">Simulated in your browser. No real API is called.</p>
    </div>
  );
}
