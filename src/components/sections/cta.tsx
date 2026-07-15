import { ArrowRight } from "lucide-react";
import { siteConfig } from "@/lib/site";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";

type CtaProps = {
  title?: string;
  description?: string;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
};

/** Closing conversion band. Reused at the bottom of most pages. */
export function Cta({
  title = "Let's talk about your traffic",
  description = "Tell us your destinations, volumes, and quality targets, and we'll come back with a rate card and an interconnect plan.",
  primary = { label: "Get in touch", href: "/contact" },
  secondary,
}: CtaProps) {
  const secondaryCta = secondary ?? {
    label: siteConfig.contact.email,
    href: `mailto:${siteConfig.contact.email}`,
  };

  return (
    <section className="py-20 sm:py-28">
      <Container size="wide">
        <Reveal>
          <div className="border-border bg-surface relative overflow-hidden rounded-2xl border px-6 py-16 text-center sm:px-16">
            {/* Decorative accent wash. */}
            <div
              aria-hidden="true"
              className="bg-accent/20 dark:bg-accent/10 pointer-events-none absolute -top-24 left-1/2 size-[28rem] -translate-x-1/2 rounded-full blur-[100px]"
            />

            <div className="relative flex flex-col items-center gap-6">
              <h2 className="text-fg max-w-2xl text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
                {title}
              </h2>
              <p className="text-fg-muted max-w-xl text-lg leading-relaxed text-pretty">
                {description}
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button href={primary.href} size="lg">
                  {primary.label}
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Button>
                <Button href={secondaryCta.href} variant="secondary" size="lg">
                  {secondaryCta.label}
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
