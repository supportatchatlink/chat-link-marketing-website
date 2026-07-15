import { ArrowRight } from "lucide-react";
import { hero, services } from "@/lib/content";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CodeBlock } from "@/components/ui/code-block";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Backdrop: faint grid, faded out toward the edges, plus an accent glow.
          Purely decorative — hidden from assistive tech. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,black,transparent)] opacity-[0.4] dark:opacity-[0.25]" />
        <div className="bg-accent/20 dark:bg-accent/10 absolute -top-40 left-1/2 size-[36rem] -translate-x-1/2 rounded-full blur-[128px]" />
      </div>

      <Container size="wide" className="py-20 sm:py-28 lg:py-32">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* Copy */}
          <div className="flex flex-col items-start gap-6">
            <Reveal>
              <Badge>
                <span className="bg-accent size-1.5 rounded-full" aria-hidden="true" />
                {hero.eyebrow}
              </Badge>
            </Reveal>

            <Reveal delay={0.05}>
              <h1 className="text-fg text-4xl leading-[1.08] font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl">
                {hero.headline}
              </h1>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="text-fg-muted max-w-xl text-lg leading-relaxed text-pretty">
                {hero.subhead}
              </p>
            </Reveal>

            <Reveal delay={0.15} className="w-full">
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button href={hero.primaryCta.href} size="lg">
                  {hero.primaryCta.label}
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Button>
                <Button href={hero.secondaryCta.href} variant="secondary" size="lg">
                  {hero.secondaryCta.label}
                </Button>
              </div>
            </Reveal>
          </div>

          {/* Interconnect spec sheets as the hero visual — the thing a carrier's
              technical team actually wants to see. */}
          <Reveal delay={0.15} distance={24}>
            <CodeBlock tabs={services.map((service) => service.spec)} />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
