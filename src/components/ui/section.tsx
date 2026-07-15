import { cn } from "@/lib/utils";
import { Container } from "./container";

type SectionProps = {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  containerSize?: "default" | "wide" | "narrow";
  /** Alternate background, used to separate adjacent sections. */
  tone?: "default" | "subtle";
  /** Anchor target for in-page nav (e.g. /products#voice). */
  id?: string;
};

/** Vertical rhythm wrapper: consistent padding + optional tinted background. */
export function Section({
  children,
  className,
  containerClassName,
  containerSize = "default",
  tone = "default",
  id,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "py-20 sm:py-28",
        tone === "subtle" && "bg-bg-subtle border-border border-y",
        // Offset anchored scroll so headings clear the sticky navbar.
        id && "scroll-mt-20",
        className,
      )}
    >
      <Container size={containerSize} className={containerClassName}>
        {children}
      </Container>
    </section>
  );
}

type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
};

/** Eyebrow + heading + supporting copy, used at the top of most sections. */
export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "center",
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" && "mx-auto max-w-2xl text-center",
        className,
      )}
    >
      {eyebrow ? (
        <p className="text-accent text-sm font-semibold tracking-wide uppercase">{eyebrow}</p>
      ) : null}
      <h2 className="text-fg text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="text-fg-muted text-lg leading-relaxed text-pretty">{description}</p>
      ) : null}
    </div>
  );
}
