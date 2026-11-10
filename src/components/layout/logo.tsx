import { cn } from "@/lib/cn";

/**
 * Provisional EQTConnect wordmark and symbol (two linked nodes).
 * Replace with the approved brand logo when supplied.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className={cn("size-8", className)}>
      <rect width="32" height="32" rx="9" className="fill-brand-800" />
      <path d="M10 11c8 0 4 10 12 10" className="stroke-brand-300" strokeWidth="2.2" fill="none" strokeLinecap="round" />
      <circle cx="10" cy="11" r="3" className="fill-white" />
      <circle cx="22" cy="21" r="3" className="fill-brand-500" />
    </svg>
  );
}

export function Logo({ className, inverse }: { className?: string; inverse?: boolean }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark className={inverse ? "[&_rect]:fill-white/10" : undefined} />
      <span className={cn("text-[1.0625rem] font-semibold tracking-[-0.02em]", inverse ? "text-white" : "text-fg")}>
        EQT<span className={inverse ? "text-white/70" : "text-fg-muted"}>Connect</span>
      </span>
    </span>
  );
}
