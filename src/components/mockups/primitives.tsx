import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { sampleOrg } from "@/content/mock-data";
import { LogoMark } from "@/components/layout/logo";
import type { StatusTone } from "@/types/content";

type MockFrameProps = {
  /** Screen-reader description of what the illustration shows. */
  label: string;
  /** Breadcrumb title shown in the app chrome. */
  title: string;
  children: ReactNode;
  className?: string;
  bodyClassName?: string;
  caption?: boolean;
  dark?: boolean;
  toolbar?: ReactNode;
};

/**
 * Shell shared by every conceptual product visualization. The visual is hidden from
 * assistive tech and replaced with a text description, since it is illustrative only.
 */
export function MockFrame({ label, title, children, className, bodyClassName, caption = true, dark, toolbar }: MockFrameProps) {
  return (
    <figure className={cn("relative", className)}>
      <div
        aria-hidden="true"
        className={cn(
          "overflow-hidden rounded-2xl text-left shadow-xl ring-1",
          dark ? "bg-ink-800 ring-white/10" : "bg-surface ring-ink-900/[0.08]",
        )}
      >
        <div
          className={cn(
            "flex h-10 items-center justify-between gap-3 border-b px-3.5",
            dark ? "border-white/10 bg-ink-900" : "border-line bg-canvas/80",
          )}
        >
          <div className="flex min-w-0 items-center gap-2 text-2xs">
            <LogoMark className="size-5" />
            <span className={cn("hidden truncate xs:inline", dark ? "text-white/50" : "text-fg-subtle")}>{sampleOrg.name}</span>
            <span className={cn("hidden xs:inline", dark ? "text-white/25" : "text-line-strong")}>/</span>
            <span className={cn("truncate font-medium", dark ? "text-white/90" : "text-fg")}>{title}</span>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            {toolbar}
            <span
              className={cn(
                "rounded-full px-2 py-0.5 font-mono text-[0.625rem] uppercase tracking-[0.1em]",
                dark ? "bg-white/10 text-white/60" : "bg-subtle text-fg-subtle",
              )}
            >
              Sample data
            </span>
          </div>
        </div>
        <div className={cn("text-xs", dark ? "text-white" : "text-fg", bodyClassName)}>{children}</div>
      </div>
      <figcaption className={caption ? "mt-3 text-center text-2xs text-fg-subtle" : "sr-only"}>
        <span className="sr-only">{label}. </span>
        Illustrative product concept with fictional sample data — not a screenshot.
      </figcaption>
    </figure>
  );
}

export function MockPanel({ title, action, children, className }: { title?: string; action?: ReactNode; children: ReactNode; className?: string }) {
  return (
    <div className={cn("rounded-xl bg-surface ring-1 ring-line", className)}>
      {title ? (
        <div className="flex items-center justify-between gap-2 border-b border-line px-3.5 py-2.5">
          <p className="text-2xs font-semibold text-fg">{title}</p>
          {action}
        </div>
      ) : null}
      {children}
    </div>
  );
}

export function Metric({
  label,
  value,
  hint,
  tone = "neutral",
  className,
}: {
  label: string;
  value: string;
  hint?: string;
  tone?: StatusTone;
  className?: string;
}) {
  const hintTone: Record<StatusTone, string> = {
    neutral: "text-fg-subtle",
    info: "text-brand-600",
    success: "text-success-700",
    warning: "text-warning-700",
    danger: "text-danger-700",
    signal: "text-signal-700",
  };
  return (
    <div className={cn("rounded-xl bg-surface p-3 ring-1 ring-line", className)}>
      <p className="truncate text-2xs text-fg-subtle">{label}</p>
      <p className="tabular mt-1.5 text-lg font-semibold tracking-tight text-fg">{value}</p>
      {hint ? <p className={cn("mt-0.5 truncate text-[0.625rem] font-medium", hintTone[tone])}>{hint}</p> : null}
    </div>
  );
}

const barTone: Record<StatusTone, string> = {
  neutral: "bg-fg-subtle/50",
  info: "bg-brand-500",
  success: "bg-success-600",
  warning: "bg-warning-600",
  danger: "bg-danger-600",
  signal: "bg-signal-500",
};

export function ProgressBar({ value, tone = "info", className }: { value: number; tone?: StatusTone; className?: string }) {
  return (
    <div className={cn("h-1.5 overflow-hidden rounded-full bg-subtle", className)}>
      <div className={cn("h-full rounded-full", barTone[tone])} style={{ width: `${Math.min(100, Math.max(0, value))}%` }} />
    </div>
  );
}

/** Horizontal stacked bar for status distributions. */
export function StackedBar({ segments, className }: { segments: { value: number; tone: StatusTone }[]; className?: string }) {
  const total = segments.reduce((sum, s) => sum + s.value, 0) || 1;
  return (
    <div className={cn("flex h-2 gap-0.5 overflow-hidden rounded-full", className)}>
      {segments.map((segment, i) => (
        <div key={i} className={cn("h-full first:rounded-l-full last:rounded-r-full", barTone[segment.tone])} style={{ width: `${(segment.value / total) * 100}%` }} />
      ))}
    </div>
  );
}

export function Avatar({ name, className }: { name: string; className?: string }) {
  const initials = name
    .split(/[\s.]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("");
  return (
    <span className={cn("grid size-6 shrink-0 place-items-center rounded-full bg-brand-50 text-[0.5625rem] font-semibold text-brand-700 ring-1 ring-brand-100", className)}>
      {initials}
    </span>
  );
}
