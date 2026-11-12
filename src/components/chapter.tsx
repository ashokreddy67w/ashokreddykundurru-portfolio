import { Container, Label } from "@/components/ui";

// An asymmetric section: small label on the left third, content on the right.
export function Chapter({ n, label, title, children, id }: { n?: string; label: string; title?: React.ReactNode; children?: React.ReactNode; id?: string }) {
  return (
    <section id={id} className="border-border scroll-mt-24 border-t py-24 sm:py-32">
      <Container className="grid gap-10 lg:grid-cols-12">
        <div className="min-w-0 lg:col-span-4">
          <Label n={n}>{label}</Label>
        </div>
        <div className="min-w-0 lg:col-span-8">
          {title && <h2 className="mb-10 text-4xl font-medium tracking-tight text-balance sm:text-5xl">{title}</h2>}
          {children && <div className="text-muted text-lg leading-relaxed">{children}</div>}
        </div>
      </Container>
    </section>
  );
}
