import { ShieldCheck } from "lucide-react";

function Box({ x, y, w, title, sub }: { x: number; y: number; w: number; title: string; sub: string }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={56} rx={10} className="fill-bg stroke-border" strokeWidth={1.5} />
      <text x={x + w / 2} y={y + 24} textAnchor="middle" className="fill-fg text-[13px] font-semibold">
        {title}
      </text>
      <text x={x + w / 2} y={y + 42} textAnchor="middle" className="fill-muted font-mono text-[10px]">
        {sub}
      </text>
    </g>
  );
}

export function ArchitectureDiagram() {
  const line = "stroke-accent";
  return (
    <figure className="bg-code rounded-md p-4 sm:p-6">
      <svg viewBox="0 0 720 300" role="img" aria-labelledby="arch-title" className="h-auto w-full">
        <title id="arch-title">EMAS architecture: web and mobile clients call a FastAPI backend backed by PostgreSQL and Redis.</title>
        <defs>
          <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" className="fill-accent" />
          </marker>
        </defs>
        <Box x={20} y={40} w={170} title="Web dashboard" sub="Next.js · React" />
        <Box x={20} y={200} w={170} title="Mobile app" sub="Capacitor · Android/iOS" />
        <Box x={275} y={120} w={170} title="REST API" sub="FastAPI · Python" />
        <Box x={530} y={40} w={170} title="PostgreSQL" sub="row-level security" />
        <Box x={530} y={200} w={170} title="Redis" sub="rate limiting" />
        {[
          [190, 68, 275, 140],
          [190, 228, 275, 160],
          [445, 140, 530, 68],
          [445, 160, 530, 228],
        ].map(([x1, y1, x2, y2], i) => (
          <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} className={line} strokeWidth={1.5} markerEnd="url(#arrow)" />
        ))}
        <text x={232} y={112} className="fill-muted font-mono text-[10px]">
          HTTPS + JWT
        </text>
        <text x={470} y={112} className="fill-muted font-mono text-[10px]">
          SQL
        </text>
      </svg>
      <figcaption className="text-muted mt-3 flex items-center justify-center gap-2 text-xs">
        <ShieldCheck className="text-accent size-3.5" aria-hidden /> High-level overview
      </figcaption>
    </figure>
  );
}
