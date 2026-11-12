import { ArrowLink, Container } from "@/components/ui";

export default function NotFound() {
  return (
    <Container className="pt-44 pb-32">
      <p className="display text-border text-[30vw] sm:text-[16rem]">404</p>
      <p className="mt-6 text-2xl">
        This page doesn&apos;t exist<span className="serif text-accent">, yet.</span>
      </p>
      <div className="mt-10">
        <ArrowLink href="/">Back home</ArrowLink>
      </div>
    </Container>
  );
}
