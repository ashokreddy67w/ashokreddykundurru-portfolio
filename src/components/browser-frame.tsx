import Image from "next/image";

// A screenshot in a minimal browser chrome, with an optional address label.
export function BrowserFrame({
  src,
  alt,
  width,
  height,
  label,
  priority = false,
  sizes = "(min-width: 1024px) 60vw, 100vw",
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  label?: string;
  priority?: boolean;
  sizes?: string;
}) {
  return (
    <div className="group border-border bg-surface overflow-hidden rounded-lg border shadow-2xl shadow-black/60">
      <div className="border-border flex items-center gap-1.5 border-b px-4 py-2.5">
        <span className="bg-border size-2 rounded-full" />
        <span className="bg-border size-2 rounded-full" />
        <span className="bg-border size-2 rounded-full" />
        {label && <span className="text-muted ml-3 truncate font-mono text-[11px]">{label}</span>}
      </div>
      <div className="overflow-hidden">
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          sizes={sizes}
          priority={priority}
          className="h-auto w-full transition duration-700 ease-out group-hover:scale-[1.02] motion-reduce:transition-none"
        />
      </div>
    </div>
  );
}
