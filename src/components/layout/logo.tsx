import Link from "next/link";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/site";

/**
 * Brand mark: two nodes joined by a link, with a signal arc rising from the
 * right node — "a conversation, carried". Original artwork, drawn inline so it
 * inherits `currentColor` and needs no image request.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden="true" className={cn("size-8", className)}>
      <rect width="32" height="32" rx="8" className="fill-accent" />
      {/* left node */}
      <circle cx="11" cy="20" r="3.25" className="fill-accent-fg" />
      {/* connecting link */}
      <path
        d="M13.5 17.5 L18.5 12.5"
        className="stroke-accent-fg"
        strokeWidth="2.25"
        strokeLinecap="round"
      />
      {/* right node */}
      <circle cx="21" cy="10" r="3.25" className="fill-accent-fg" />
      {/* signal arc */}
      <path
        d="M24.5 6.5a6.5 6.5 0 0 1 0 7"
        className="stroke-accent-fg"
        strokeWidth="1.75"
        strokeLinecap="round"
        opacity="0.55"
      />
    </svg>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn("group inline-flex items-center gap-2.5", className)}
      aria-label={`${siteConfig.name} home`}
    >
      <LogoMark className="transition-transform duration-200 group-hover:scale-105" />
      <span className="text-fg text-lg font-semibold tracking-tight">{siteConfig.name}</span>
    </Link>
  );
}
