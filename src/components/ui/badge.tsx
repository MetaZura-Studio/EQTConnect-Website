import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import type { StatusTone } from "@/types/content";

const toneClasses: Record<StatusTone, { pill: string; dot: string }> = {
  neutral: { pill: "bg-subtle text-fg-muted ring-line", dot: "bg-fg-subtle" },
  info: { pill: "bg-info-50 text-brand-700 ring-brand-200", dot: "bg-brand-500" },
  success: { pill: "bg-success-50 text-success-700 ring-success-600/20", dot: "bg-success-600" },
  warning: { pill: "bg-warning-50 text-warning-700 ring-warning-600/25", dot: "bg-warning-600" },
  danger: { pill: "bg-danger-50 text-danger-700 ring-danger-600/20", dot: "bg-danger-600" },
  signal: { pill: "bg-signal-50 text-signal-700 ring-signal-600/20", dot: "bg-signal-500" },
};

export function StatusBadge({
  tone = "neutral",
  children,
  className,
  dot = true,
}: {
  tone?: StatusTone;
  children: ReactNode;
  className?: string;
  dot?: boolean;
}) {
  const styles = toneClasses[tone];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2 py-0.5 text-2xs font-medium ring-1 ring-inset",
        styles.pill,
        className,
      )}
    >
      {dot ? <span aria-hidden="true" className={cn("size-1.5 rounded-full", styles.dot)} /> : null}
      {children}
    </span>
  );
}

export function StatusDot({ tone = "neutral", className }: { tone?: StatusTone; className?: string }) {
  return <span aria-hidden="true" className={cn("inline-block size-2 rounded-full", toneClasses[tone].dot, className)} />;
}
