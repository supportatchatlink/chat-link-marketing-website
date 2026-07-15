import type { Metadata } from "next";
import { MapPin } from "lucide-react";
import { about, trustPoints } from "@/lib/content";
import { siteConfig } from "@/lib/site";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Reveal } from "@/components/ui/reveal";
import { Section, SectionHeader } from "@/components/ui/section";
import { Coverage } from "@/components/sections/coverage";
import { Cta } from "@/components/sections/cta";
import { Partners } from "@/components/sections/partners";

export const metadata: Metadata = {
  title: "About us",
  description:
    "Since 2014, Chat-Link Communication Limited has delivered Voice and SMS services worldwide. Registered in Turkey and the USA, with direct routes across Africa, the Middle East, South Asia, and Europe.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      {/* Intro */}
      <Section containerSize="wide">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.3fr]">
          <div className="flex flex-col items-start gap-6">
            <Badge>About us</Badge>
            <h1 className="text-fg text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
              At the forefront of telecom since {siteConfig.founded}
            </h1>
          </div>

          <div className="flex flex-col gap-6">
            <Reveal>
              <p className="text-fg-muted text-lg leading-relaxed text-pretty">{about.intro}</p>
            </Reveal>
            <Reveal delay={0.05}>
              <p className="text-fg-muted leading-relaxed text-pretty">{about.body}</p>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* Mission & vision */}
      <Section tone="subtle" containerSize="wide">
        <div className="grid gap-5 md:grid-cols-2">
          <Reveal>
            <Card className="flex h-full flex-col gap-3">
              <h2 className="text-accent text-sm font-semibold tracking-wide uppercase">
                Our mission
              </h2>
              <p className="text-fg text-xl leading-relaxed font-medium text-pretty">
                {about.mission}
              </p>
            </Card>
          </Reveal>
          <Reveal delay={0.06}>
            <Card className="flex h-full flex-col gap-3">
              <h2 className="text-accent text-sm font-semibold tracking-wide uppercase">
                Our vision
              </h2>
              <p className="text-fg text-xl leading-relaxed font-medium text-pretty">
                {about.vision}
              </p>
            </Card>
          </Reveal>
        </div>
      </Section>

      {/* Trust points */}
      <Section containerSize="wide">
        <SectionHeader
          eyebrow="Why operators work with us"
          title="A carrier, not a reseller of resellers"
        />

        <ul className="mt-14 grid gap-5 md:grid-cols-3">
          {trustPoints.map((point, index) => (
            <Reveal key={point.title} delay={index * 0.06}>
              <Card as="li" className="h-full">
                <div className="bg-accent/10 text-accent ring-accent/20 mb-4 flex size-10 items-center justify-center rounded-lg ring-1 ring-inset">
                  <point.icon className="size-5" aria-hidden="true" />
                </div>
                <h3 className="text-fg mb-2 text-base font-semibold tracking-tight">
                  {point.title}
                </h3>
                <p className="text-fg-muted text-sm leading-relaxed text-pretty">{point.body}</p>
              </Card>
            </Reveal>
          ))}
        </ul>
      </Section>

      <Coverage />

      {/* Offices */}
      <Section containerSize="wide">
        <SectionHeader eyebrow="Where we are" title="Two registrations, one network" align="left" />

        <ul className="mt-12 grid gap-5 md:grid-cols-2">
          {siteConfig.offices.map((office, index) => (
            <Reveal key={office.country} delay={index * 0.06}>
              <Card as="li" className="flex h-full gap-4">
                <div className="bg-accent/10 text-accent ring-accent/20 flex size-10 shrink-0 items-center justify-center rounded-lg ring-1 ring-inset">
                  <MapPin className="size-5" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-fg text-base font-semibold tracking-tight">
                    {office.country}
                  </h3>
                  <address className="text-fg-muted mt-2 text-sm leading-relaxed text-pretty not-italic">
                    {office.address}
                  </address>
                </div>
              </Card>
            </Reveal>
          ))}
        </ul>
      </Section>

      <Partners />
      <Cta />
    </>
  );
}
