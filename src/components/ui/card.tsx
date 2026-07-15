import { cn } from "@/lib/utils";

type CardProps = {
  children: React.ReactNode;
  className?: string;
  /** Adds a hover lift + accent border. Use for cards that link somewhere. */
  interactive?: boolean;
  as?: "div" | "article" | "li";
  /** Anchor target, for cards that in-page nav links point at. */
  id?: string;
};

export function Card({ children, className, interactive = false, as: Tag = "div", id }: CardProps) {
  return (
    <Tag
      id={id}
      className={cn(
        "bg-surface border-border rounded-xl border p-6",
        interactive &&
          "hover:border-accent/60 hover:shadow-accent/5 transition-[border-color,box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:shadow-lg",
        className,
      )}
    >
      {children}
    </Tag>
  );
}

export function CardTitle({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h3 className={cn("text-fg text-base font-semibold tracking-tight", className)}>{children}</h3>
  );
}

export function CardBody({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p className={cn("text-fg-muted text-sm leading-relaxed text-pretty", className)}>{children}</p>
  );
}

/** Square icon chip used at the top of feature cards. */
export function CardIcon({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-accent/10 text-accent ring-accent/20 mb-4 flex size-10 items-center justify-center rounded-lg ring-1 ring-inset">
      {children}
    </div>
  );
}
