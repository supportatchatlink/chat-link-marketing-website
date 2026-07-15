"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { mainNav } from "@/lib/site";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Logo } from "./logo";
import { ThemeToggle } from "./theme-toggle";

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Solidify the bar once the user scrolls away from the top.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Prevent the page behind the mobile menu from scrolling.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Escape closes the menu — expected for any overlay.
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-200",
        scrolled || open
          ? "bg-bg/80 border-border border-b backdrop-blur-md"
          : "border-b border-transparent",
      )}
    >
      <Container size="wide">
        <nav className="flex h-16 items-center justify-between gap-6" aria-label="Main">
          <Logo />

          {/* Desktop links */}
          <ul className="hidden items-center gap-1 lg:flex">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={cn(
                    "rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    isActive(item.href)
                      ? "text-accent"
                      : "text-fg-muted hover:text-fg hover:bg-bg-subtle",
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Desktop actions */}
          <div className="hidden items-center gap-2 lg:flex">
            <ThemeToggle />
            <Button href="/services" variant="ghost" size="sm">
              Our Services
            </Button>
            <Button href="/contact" size="sm">
              Get in Touch
            </Button>
          </div>

          {/* Mobile actions */}
          <div className="flex items-center gap-1 lg:hidden">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className="text-fg-muted hover:text-fg hover:bg-bg-subtle inline-flex size-9 items-center justify-center rounded-lg transition-colors"
            >
              {open ? (
                <X className="size-5" aria-hidden="true" />
              ) : (
                <Menu className="size-5" aria-hidden="true" />
              )}
            </button>
          </div>
        </nav>
      </Container>

      {/*
        Mobile menu — deliberately NOT animated with Framer.

        An `animate={{ height: "auto" }}` enter animation does not run under the
        OS "reduce motion" setting, which left the panel stuck at its initial
        `height: 0` and made the menu impossible to open for those users.
        Navigation must never depend on an animation completing, so this is
        plain conditional rendering. The links still get a colour transition.
      */}
      {open ? (
        <div id="mobile-menu" className="bg-bg border-border border-b lg:hidden">
          {/* Closing on click (rather than reacting to a pathname change in an
              effect) also handles the case where the link points at the page
              you're already on — no navigation happens, but the menu should
              still close. */}
          <Container size="wide" className="flex flex-col gap-1 py-4">
            {mainNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={cn(
                  "rounded-lg px-3 py-3 text-base font-medium transition-colors",
                  isActive(item.href)
                    ? "text-accent bg-accent/5"
                    : "text-fg-muted hover:text-fg hover:bg-bg-subtle",
                )}
              >
                {item.label}
              </Link>
            ))}

            <div className="mt-3 flex flex-col gap-2">
              <Button href="/services" variant="outline" size="md" onClick={() => setOpen(false)}>
                Our Services
              </Button>
              <Button href="/contact" size="md" onClick={() => setOpen(false)}>
                Get in Touch
              </Button>
            </div>
          </Container>
        </div>
      ) : null}
    </header>
  );
}
