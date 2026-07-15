import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { about, services, whyChooseUs } from "@/lib/content";
import { Button } from "@/components/ui/button";
import { Card, CardBody, CardIcon, CardTitle } from "@/components/ui/card";
import { Reveal } from "@/components/ui/reveal";
import { Section, SectionHeader } from "@/components/ui/section";
import { Coverage } from "@/components/sections/coverage";
import { Cta } from "@/components/sections/cta";
import { Hero } from "@/components/sections/hero";
import { Partners } from "@/components/sections/partners";

export default function HomePage() {
  return (
    <>
      <Hero />

      {/* Why choose Chat-Link */}
      <Section containerSize="wide">
        <SectionHeader
          eyebrow="Why choose Chat-Link?"
          title="Built for the routes that are hard to get right"
          description="Anyone can terminate traffic to easy destinations. We are set up for the markets where quality, deliverability, and someone answering the phone actually matter."
        />

        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {whyChooseUs.map((item, index) => (
            <Reveal key={item.title} delay={(index % 4) * 0.06}>
              <Card as="li" interactive className="h-full">
                <CardIcon>
                  <item.icon className="size-5" aria-hidden="true" />
                </CardIcon>
                <CardTitle className="mb-2">{item.title}</CardTitle>
                <CardBody>{item.body}</CardBody>
              </Card>
            </Reveal>
          ))}
        </ul>
      </Section>

      {/* About */}
      <Section tone="subtle" containerSize="wide">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.3fr]">
          <Reveal>
            <SectionHeader
              align="left"
              eyebrow="About Chat-Link"
              title="A decade of moving voice and messages"
            />
          </Reveal>

          <div className="flex flex-col gap-6">
            <Reveal delay={0.05}>
              <p className="text-fg-muted text-lg leading-relaxed text-pretty">{about.intro}</p>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-fg-muted leading-relaxed text-pretty">{about.body}</p>
            </Reveal>

            <div className="mt-2 grid gap-5 sm:grid-cols-2">
              <Reveal delay={0.15}>
                <Card className="h-full">
                  <h3 className="text-accent mb-2 text-sm font-semibold tracking-wide uppercase">
                    Our mission
                  </h3>
                  <p className="text-fg-muted text-sm leading-relaxed text-pretty">
                    {about.mission}
                  </p>
                </Card>
              </Reveal>
              <Reveal delay={0.2}>
                <Card className="h-full">
                  <h3 className="text-accent mb-2 text-sm font-semibold tracking-wide uppercase">
                    Our vision
                  </h3>
                  <p className="text-fg-muted text-sm leading-relaxed text-pretty">
                    {about.vision}
                  </p>
                </Card>
              </Reveal>
            </div>

            <Reveal delay={0.25}>
              <Button href="/about" variant="secondary" className="mt-2 self-start">
                More about us
                <ArrowRight className="size-4" aria-hidden="true" />
              </Button>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* Services */}
      <Section containerSize="wide">
        <SectionHeader
          eyebrow="Our services"
          title="Voice, SMS, and everything around them"
          description="Three services, one interconnect relationship. Take one or take all three."
        />

        <ul className="mt-14 grid gap-5 lg:grid-cols-3">
          {services.map((service, index) => (
            <Reveal key={service.id} delay={(index % 3) * 0.06}>
              <Card as="li" interactive className="group flex h-full flex-col">
                <CardIcon>
                  <service.icon className="size-5" aria-hidden="true" />
                </CardIcon>
                <CardTitle className="mb-2">{service.name}</CardTitle>
                <CardBody className="flex-1">{service.tagline}</CardBody>
                <Link
                  href={`/services#${service.id}`}
                  className="text-accent mt-4 inline-flex items-center gap-1.5 text-sm font-medium"
                >
                  Learn more
                  <ArrowRight
                    className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </Link>
              </Card>
            </Reveal>
          ))}
        </ul>
      </Section>

      <Coverage />
      <Partners />
      <Cta />
    </>
  );
}
