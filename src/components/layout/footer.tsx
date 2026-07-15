import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { footerNav, siteConfig } from "@/lib/site";
import { Container } from "@/components/ui/container";
import { LogoMark } from "./logo";

/*
 * Brand icons are drawn inline: lucide-react v1 removed all brand glyphs.
 */

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.8 3.8 0 0 1-1.38-.9 3.8 3.8 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16Zm0 5.68a4.16 4.16 0 1 0 0 8.32 4.16 4.16 0 0 0 0-8.32Zm0 6.86a2.7 2.7 0 1 1 0-5.4 2.7 2.7 0 0 1 0 5.4Zm5.3-7.02a.97.97 0 1 1-1.94 0 .97.97 0 0 1 1.94 0Z" />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.09 10.12 24v-8.44H7.08v-3.49h3.04V9.41c0-3.02 1.79-4.686 4.53-4.686 1.31 0 2.68.235 2.68.235v2.97h-1.51c-1.49 0-1.96.93-1.96 1.886v2.255h3.33l-.53 3.49h-2.8V24C19.61 23.09 24 18.1 24 12.07Z" />
    </svg>
  );
}

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05a3.74 3.74 0 0 1 3.37-1.85c3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.11 20.45H3.56V9h3.55v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.22.79 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
    </svg>
  );
}

const social = [
  { label: "Instagram", href: siteConfig.social.instagram, Icon: InstagramIcon },
  { label: "Facebook", href: siteConfig.social.facebook, Icon: FacebookIcon },
  { label: "LinkedIn", href: siteConfig.social.linkedin, Icon: LinkedinIcon },
];

const phoneHref = `tel:${siteConfig.contact.phoneUsa.replace(/[^+\d]/g, "")}`;

export function Footer() {
  return (
    <footer className="border-border bg-bg-subtle mt-auto border-t">
      <Container size="wide" className="py-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_2.6fr]">
          {/* Brand + direct contact */}
          <div className="flex flex-col gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2.5"
              aria-label={`${siteConfig.name} home`}
            >
              <LogoMark />
              <span className="text-fg text-lg font-semibold tracking-tight">
                {siteConfig.name}
              </span>
            </Link>
            <p className="text-fg-muted max-w-xs text-sm leading-relaxed text-pretty">
              Wholesale voice termination and A2P SMS across Africa, the Middle East, South Asia,
              and Europe.
            </p>

            <ul className="mt-2 flex flex-col gap-2.5">
              <li className="flex items-start gap-2.5">
                <Mail className="text-accent mt-0.5 size-4 shrink-0" aria-hidden="true" />
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="text-fg-muted hover:text-accent text-sm break-all transition-colors"
                >
                  {siteConfig.contact.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Phone className="text-accent mt-0.5 size-4 shrink-0" aria-hidden="true" />
                <a
                  href={phoneHref}
                  className="text-fg-muted hover:text-accent text-sm transition-colors"
                >
                  USA: {siteConfig.contact.phoneUsa}
                </a>
              </li>
            </ul>

            <ul className="mt-2 flex gap-2">
              {social.map(({ label, href, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${siteConfig.name} on ${label}`}
                    className="text-fg-subtle hover:text-accent hover:border-accent/40 border-border bg-surface inline-flex size-9 items-center justify-center rounded-lg border transition-colors"
                  >
                    <Icon className="size-4" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Link columns + offices */}
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {footerNav.map((group) => (
              <nav key={group.title} aria-label={group.title} className="flex flex-col gap-3">
                <h2 className="text-fg text-sm font-semibold">{group.title}</h2>
                <ul className="flex flex-col gap-2.5">
                  {group.items.map((item) => (
                    <li key={`${group.title}-${item.label}`}>
                      <Link
                        href={item.href}
                        className="text-fg-muted hover:text-accent text-sm transition-colors"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}

            <div className="flex flex-col gap-3">
              <h2 className="text-fg text-sm font-semibold">Office addresses</h2>
              <ul className="flex flex-col gap-4">
                {siteConfig.offices.map((office) => (
                  <li key={office.country} className="flex items-start gap-2.5">
                    <MapPin className="text-accent mt-0.5 size-4 shrink-0" aria-hidden="true" />
                    <div>
                      <p className="text-fg text-sm font-medium">{office.country}</p>
                      <address className="text-fg-muted mt-1 text-sm leading-relaxed text-pretty not-italic">
                        {office.address}
                      </address>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="border-border mt-12 border-t pt-8">
          <p className="text-fg-subtle text-sm">
            © {new Date().getFullYear()} {siteConfig.legalName}. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}
