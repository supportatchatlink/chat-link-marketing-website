import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";
import { siteConfig } from "@/lib/site";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { ContactForm } from "@/components/sections/contact-form";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Chat-Link Communication Limited about voice termination, A2P SMS, rate cards, or interconnects. Offices in the USA and Turkey.",
  alternates: { canonical: "/contact" },
};

const phoneHref = `tel:${siteConfig.contact.phoneUsa.replace(/[^+\d]/g, "")}`;

export default function ContactPage() {
  return (
    <Section containerSize="wide">
      <div className="grid gap-16 lg:grid-cols-[1.2fr_1fr]">
        {/* Form */}
        <div className="flex flex-col gap-8">
          <div className="flex flex-col items-start gap-5">
            <Badge>Get in Touch</Badge>
            <h1 className="text-fg text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
              Let&apos;s talk about your traffic
            </h1>
            <p className="text-fg-muted text-lg leading-relaxed text-pretty">
              If you&apos;d like some advice or need more information about what we do at Chat-Link
              Communication Limited, fill out the form below and we will be in touch.
            </p>
          </div>

          <Reveal>
            <ContactForm />
          </Reveal>
        </div>

        {/* Sidebar */}
        <aside className="flex flex-col gap-5">
          <Card className="flex flex-col gap-5">
            <h2 className="text-fg text-base font-semibold tracking-tight">Reach us directly</h2>

            <ul className="flex flex-col gap-4">
              <li className="flex items-start gap-3">
                <Mail className="text-accent mt-0.5 size-4 shrink-0" aria-hidden="true" />
                <div>
                  <p className="text-fg text-sm font-medium">Send us an email</p>
                  <a
                    href={`mailto:${siteConfig.contact.email}`}
                    className="text-fg-muted hover:text-accent text-sm break-all transition-colors"
                  >
                    {siteConfig.contact.email}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="text-accent mt-0.5 size-4 shrink-0" aria-hidden="true" />
                <div>
                  <p className="text-fg text-sm font-medium">Give us a call (USA)</p>
                  <a
                    href={phoneHref}
                    className="text-fg-muted hover:text-accent text-sm transition-colors"
                  >
                    {siteConfig.contact.phoneUsa}
                  </a>
                </div>
              </li>
            </ul>
          </Card>

          {siteConfig.offices.map((office) => (
            <Card key={office.country} className="flex gap-4">
              <div className="bg-accent/10 text-accent ring-accent/20 flex size-10 shrink-0 items-center justify-center rounded-lg ring-1 ring-inset">
                <MapPin className="size-5" aria-hidden="true" />
              </div>
              <div>
                <h2 className="text-fg text-base font-semibold tracking-tight">
                  {office.country} address
                </h2>
                <address className="text-fg-muted mt-2 text-sm leading-relaxed text-pretty not-italic">
                  {office.address}
                </address>
              </div>
            </Card>
          ))}
        </aside>
      </div>
    </Section>
  );
}
