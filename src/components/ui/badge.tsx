import { cn } from "@/lib/utils";

type BadgeProps = {
  children: React.ReactNode;
  className?: string;
  tone?: "accent" | "neutral";
};

export function Badge({ children, className, tone = "accent" }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium",
        tone === "accent" && "border-accent/25 bg-accent/10 text-accent",
        tone === "neutral" && "border-border bg-bg-subtle text-fg-muted",
        className,
      )}
    >
      {children}
    </span>
  );
}
