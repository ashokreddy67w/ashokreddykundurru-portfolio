"use client";

import { useState } from "react";

// Haversine distance in metres — the same idea behind a geofenced check-in.
export function distanceMeters(a: [number, number], b: [number, number]) {
  const R = 6371000;
  const rad = (d: number) => (d * Math.PI) / 180;
  const dLat = rad(b[0] - a[0]);
  const dLon = rad(b[1] - a[1]);
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(rad(a[0])) * Math.cos(rad(b[0])) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

const OFFICE: [number, number] = [17.385, 78.4867];

export function GeofenceDemo() {
  const [dx, setDx] = useState(40);
  const [dy, setDy] = useState(-30);
  const [radius, setRadius] = useState(100);
  // 1° latitude ≈ 111,320 m; longitude shrinks with cos(latitude).
  const user: [number, number] = [OFFICE[0] + dy / 111320, OFFICE[1] + dx / (111320 * Math.cos((OFFICE[0] * Math.PI) / 180))];
  const d = distanceMeters(OFFICE, user);
  const inside = d <= radius;
  const scale = 0.6; // px per metre on the 300px map

  const slider = (label: string, v: number, set: (n: number) => void, min: number, max: number) => (
    <label className="block text-sm">
      <span className="text-muted flex justify-between">
        {label} <span className="text-fg font-mono">{v} m</span>
      </span>
      <input type="range" min={min} max={max} value={v} onChange={(e) => set(+e.target.value)} className="mt-2 w-full accent-[var(--accent)]" />
    </label>
  );

  return (
    <div className="border-border bg-surface grid gap-6 rounded-md border p-5 sm:grid-cols-2 sm:p-6">
      <svg
        viewBox="-150 -150 300 300"
        className="bg-code aspect-square w-full rounded-md"
        role="img"
        aria-label={`Employee is ${Math.round(d)} metres from the office, ${inside ? "inside" : "outside"} the geofence`}
      >
        <circle
          r={radius * scale}
          className={inside ? "fill-accent/15 stroke-accent" : "fill-red-500/10 stroke-red-500"}
          strokeWidth={1.5}
          strokeDasharray="4 4"
        />
        <circle r={5} className="fill-fg" />
        <text y={-10} textAnchor="middle" className="fill-muted font-mono text-[9px]">
          office
        </text>
        <line x1={0} y1={0} x2={dx * scale} y2={-dy * scale} className="stroke-muted" strokeWidth={1} />
        <circle cx={dx * scale} cy={-dy * scale} r={6} className={inside ? "fill-accent" : "fill-red-500"} />
      </svg>
      <div className="flex flex-col gap-5">
        {slider("East / West offset", dx, setDx, -220, 220)}
        {slider("North / South offset", dy, setDy, -220, 220)}
        {slider("Geofence radius", radius, setRadius, 20, 200)}
        <div className="border-border mt-auto rounded-md border p-4">
          <p className="text-muted font-mono text-xs">distance = haversine(office, employee)</p>
          <p className="mt-1 text-2xl font-semibold">{Math.round(d)} m</p>
          <p className={`mt-1 text-sm font-medium ${inside ? "text-accent" : "text-red-500"}`}>
            {inside ? "✓ Check-in allowed" : "✗ Outside the geofence, check-in rejected"}
          </p>
        </div>
      </div>
    </div>
  );
}
