import activity from "@/data/activity.json";

const days = activity.days as Record<string, number>;
const WEEKS = 26;

// One square per day for the last 26 weeks, GitHub-style. Data: scripts/activity.sh
export function Activity() {
  const end = new Date(activity.generated + "T00:00:00Z");
  const start = new Date(end);
  start.setUTCDate(end.getUTCDate() - end.getUTCDay() - (WEEKS - 1) * 7); // Sunday, 26 weeks back
  const cells: { date: string; n: number }[] = [];
  for (const d = new Date(start); d <= end; d.setUTCDate(d.getUTCDate() + 1)) {
    const key = d.toISOString().slice(0, 10);
    cells.push({ date: key, n: days[key] ?? 0 });
  }
  const total = cells.reduce((s, c) => s + c.n, 0);
  const level = (n: number) => (n === 0 ? "bg-border/60" : n < 4 ? "bg-accent/35" : n < 10 ? "bg-accent/65" : "bg-accent");

  return (
    <figure>
      <div className="overflow-x-auto pb-1">
        <div className="grid w-max grid-flow-col grid-rows-7 gap-[3px]" role="img" aria-label={`${total} commits in the last ${WEEKS} weeks`}>
          {cells.map((c) => (
            <span key={c.date} title={`${c.date}: ${c.n} commit${c.n === 1 ? "" : "s"}`} className={`size-[11px] rounded-[2px] ${level(c.n)}`} />
          ))}
        </div>
      </div>
      <figcaption className="text-muted mt-2 text-sm">
        {total} commits in the last six months, across my own repos. Pulled from git on {activity.generated}.
      </figcaption>
    </figure>
  );
}

export const latestEmasCommit = activity.emasRecent[0];
export const emasRecent = activity.emasRecent;
