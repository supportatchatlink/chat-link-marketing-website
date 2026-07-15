import type { Metadata } from "next";
import { ArrowRight, Check } from "lucide-react";
import { services } from "@/lib/content";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CodeBlock } from "@/components/ui/code-block";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { Coverage } from "@/components/sections/coverage";
import { Cta } from "@/components/sections/cta";

export const metadata: Metadata = {
  title: "Our Services",
  description:
    "Wholesale A-Z voice termination with CLI and non-CLI routes, bidirectional A2P SMS, and tailored telecom solutions for carriers, VoIP providers, and enterprises.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      {/* Page header */}
      <Section className="pb-10 sm:pb-12" containerSize="wide">
        <div className="flex max-w-3xl flex-col items-start gap-6">
          <Badge>Our Services</Badge>
          <h1 className="text-fg text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
            Wholesale voice and messaging, done properly
          </h1>
          <p className="text-fg-muted text-lg leading-relaxed text-pretty">
            We serve carriers, VoIP providers, telecom operators, resellers, brands, and OTT
            providers — with direct routes, honest quality reporting, and a team you can reach.
          </p>
          <nav aria-label="Jump to service" className="flex flex-wrap gap-2">
            {services.map((service) => (
              <a
                key={service.id}
                href={`#${service.id}`}
                className="border-border text-fg-muted hover:border-accent hover:text-accent bg-surface rounded-lg border px-3 py-1.5 text-sm font-medium transition-colors"
              >
                {service.name}
              </a>
            ))}
          </nav>
        </div>
      </Section>

      {/* One section per service, alternating the spec sheet left/right */}
      {services.map((service, index) => (
        <Section
          key={service.id}
          id={service.id}
          tone={index % 2 === 1 ? "subtle" : "default"}
          containerSize="wide"
        >
          <div className="grid items-start gap-14 lg:grid-cols-2">
            {/* Copy column */}
            <Reveal className={index % 2 === 1 ? "lg:order-2" : undefined}>
              <div className="flex flex-col items-start gap-5">
                <div className="bg-accent/10 text-accent ring-accent/20 flex size-11 items-center justify-center rounded-xl ring-1 ring-inset">
                  <service.icon className="size-5" aria-hidden="true" />
                </div>

                <p className="text-accent text-sm font-semibold tracking-wide uppercase">
                  {service.eyebrow}
                </p>

                <h2 className="text-fg text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
                  {service.name}
                </h2>

                <p className="text-fg-muted text-lg leading-relaxed text-pretty">{service.body}</p>

                <div className="mt-2">
                  <h3 className="text-fg mb-4 text-sm font-semibold tracking-wide uppercase">
                    What we offer
                  </h3>
                  <ul className="grid gap-5 sm:grid-cols-2">
                    {service.features.map((feature) => (
                      <li key={feature.title} className="flex flex-col gap-1.5">
                        <div className="flex items-center gap-2">
                          <Check className="text-accent size-4 shrink-0" aria-hidden="true" />
                          <h4 className="text-fg text-sm font-semibold">{feature.title}</h4>
                        </div>
                        <p className="text-fg-muted pl-6 text-sm leading-relaxed text-pretty">
                          {feature.body}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>

                {service.closing ? (
                  <p className="text-fg-muted mt-2 leading-relaxed text-pretty">
                    {service.closing}
                  </p>
                ) : null}

                <Button href="/contact" variant="secondary" className="mt-4">
                  Request a rate card
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Button>
              </div>
            </Reveal>

            {/* Spec sheet column */}
            <Reveal
              delay={0.1}
              distance={24}
              className={index % 2 === 1 ? "lg:order-1" : undefined}
            >
              {/* TODO: confirm — these interconnect parameters are plausible
                  industry defaults, not Chat-Link's live values. Verify with
                  your NOC before publishing. */}
              <CodeBlock tabs={[service.spec]} className="lg:sticky lg:top-24" />
            </Reveal>
          </div>
        </Section>
      ))}

      <Coverage />
      <Cta />
    </>
  );
}
