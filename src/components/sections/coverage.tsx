import { coverage } from "@/lib/content";
import { Card } from "@/components/ui/card";
import { Reveal } from "@/components/ui/reveal";
import { Section, SectionHeader } from "@/components/ui/section";

export function Coverage() {
  return (
    <Section id="coverage" tone="subtle" containerSize="wide">
      <SectionHeader
        eyebrow="Global coverage"
        title="Direct routes into hard markets"
        description={coverage.intro}
      />

      <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {coverage.regions.map((region, index) => (
          <Reveal key={region.name} delay={(index % 4) * 0.06}>
            <Card as="li" interactive className="h-full">
              <div className="bg-accent/10 text-accent ring-accent/20 mb-4 flex size-10 items-center justify-center rounded-lg ring-1 ring-inset">
                <region.icon className="size-5" aria-hidden="true" />
              </div>
              <h3 className="text-fg text-base font-semibold tracking-tight">{region.name}</h3>
              <p className="text-fg-muted mt-2 text-sm leading-relaxed text-pretty">
                {region.countries}
              </p>
            </Card>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
