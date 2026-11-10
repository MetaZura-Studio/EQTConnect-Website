import type { ReactNode } from "react";
import { CircleDashed } from "lucide-react";
import { cn } from "@/lib/cn";

/**
 * Visible marker for content that requires business confirmation before launch.
 * Search the codebase for <Pending to list every outstanding item.
 */
export function Pending({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md border border-dashed border-pending-300 bg-pending-50 px-2 py-0.5 text-xs font-medium text-pending-800",
        className,
      )}
    >
      <CircleDashed aria-hidden="true" className="size-3.5 shrink-0" />
      <span>{children}</span>
    </span>
  );
}

export function PendingNote({ title, children, className }: { title: string; children?: ReactNode; className?: string }) {
  return (
    <div
      role="note"
      className={cn(
        "flex gap-3 rounded-xl border border-dashed border-pending-300 bg-pending-50/70 p-4 text-sm text-pending-800",
        className,
      )}
    >
      <CircleDashed aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
      <div>
        <p className="font-semibold">{title}</p>
        {children ? <div className="mt-1 text-pending-800/90">{children}</div> : null}
      </div>
    </div>
  );
}
