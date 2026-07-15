import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/site";

export function LogoMark({ className }: { className?: string }) {
  return (
    <Image
      src="/chat-link-logo.webp"
      alt={`${siteConfig.name} logo`}
      width={32}
      height={32}
      className={cn("size-8", className)}
      priority
    />
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
