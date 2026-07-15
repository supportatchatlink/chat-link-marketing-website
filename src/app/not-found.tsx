import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export default function NotFound() {
  return (
    <Container size="narrow" className="flex flex-col items-center gap-6 py-32 text-center">
      <p className="text-accent font-mono text-sm font-semibold">404</p>
      <h1 className="text-fg text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
        This route doesn&apos;t exist
      </h1>
      <p className="text-fg-muted text-lg leading-relaxed text-pretty">
        The page you asked for isn&apos;t here. It may have moved, or the link that sent you here
        may be out of date.
      </p>
      <div className="mt-2 flex flex-col gap-3 sm:flex-row">
        <Button href="/">
          <ArrowLeft className="size-4" aria-hidden="true" />
          Back home
        </Button>
        <Button href="/contact" variant="secondary">
          Report a broken link
        </Button>
      </div>
    </Container>
  );
}
