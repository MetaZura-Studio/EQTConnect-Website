import { Check, ChevronRight, Package, X } from "lucide-react";
import { cn } from "@/lib/cn";
import { dispatchTone, sampleDispatches } from "@/content/mock-data";
import { StatusBadge } from "@/components/ui/badge";

/**
 * Conceptual rider app screen. Shows status recording only — no maps, GPS or
 * proof-of-delivery features are depicted, as those are not documented.
 */
export function RiderAppMock({ compact, className }: { compact?: boolean; className?: string }) {
  const current = sampleDispatches[1]!;
  const queue = sampleDispatches.slice(2, compact ? 3 : 5);

  const screen = (
    <div
      className={cn(
        "relative overflow-hidden rounded-[2.1rem] bg-ink-950 p-[7px] text-left shadow-xl ring-1 ring-ink-900/40",
        className,
      )}
    >
      <div className="overflow-hidden rounded-[1.7rem] bg-canvas">
        <div className="flex items-center justify-between px-5 pb-1 pt-2.5 text-[0.5625rem] font-semibold text-fg">
          <span className="tabular">11:06</span>
          <span className="h-3.5 w-14 rounded-full bg-ink-950" />
          <span className="flex gap-0.5">
            <span className="h-2 w-0.5 rounded-sm bg-fg" />
            <span className="h-2 w-0.5 rounded-sm bg-fg" />
            <span className="h-2 w-0.5 rounded-sm bg-fg/40" />
          </span>
        </div>

        <div className="bg-ink-900 px-4 pb-4 pt-3 text-white">
          <p className="text-[0.5625rem] uppercase tracking-[0.12em] text-white/50">Rider app · Rider 03</p>
          <p className="mt-1 text-sm font-semibold tracking-tight">Today&apos;s deliveries</p>
          <div className="mt-2.5 flex items-center justify-between text-[0.625rem] text-white/70">
            <span className="tabular">18 of 24 completed</span>
            <span className="tabular">75%</span>
          </div>
          <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-white/15">
            <div className="h-full w-3/4 rounded-full bg-signal-400" />
          </div>
        </div>

        <div className="space-y-2.5 p-3">
          <div className="rounded-xl bg-surface p-3 shadow-sm ring-1 ring-line">
            <div className="flex items-center justify-between gap-1">
              <span className="whitespace-nowrap font-mono text-[0.5625rem] text-fg-subtle">{current.ref}</span>
              <StatusBadge tone={dispatchTone[current.status]}>{current.status}</StatusBadge>
            </div>
            <div className="mt-2 flex items-center gap-2">
              <span className="grid size-7 place-items-center rounded-lg bg-brand-50 text-brand-700">
                <Package className="size-3.5" />
              </span>
              <div className="min-w-0">
                <p className="truncate text-xs font-semibold text-fg">{current.recipient}</p>
                <p className="text-[0.625rem] text-fg-subtle">AGM notice · {current.area}</p>
              </div>
            </div>
            <p className="mt-3 text-[0.5625rem] font-medium uppercase tracking-[0.1em] text-fg-subtle">Record status</p>
            <div className="mt-1.5 grid grid-cols-2 gap-1.5">
              <span className="flex items-center justify-center gap-1 whitespace-nowrap rounded-lg bg-success-700 py-1.5 text-[0.5625rem] font-semibold text-white">
                <Check className="size-3" strokeWidth={3} /> Delivered
              </span>
              <span className="flex items-center justify-center gap-1 whitespace-nowrap rounded-lg bg-surface py-1.5 text-[0.5625rem] font-semibold text-danger-700 ring-1 ring-danger-600/30">
                <X className="size-3" strokeWidth={3} /> Not delivered
              </span>
            </div>
          </div>

          <div>
            <p className="px-1 text-[0.5625rem] font-medium uppercase tracking-[0.1em] text-fg-subtle">Up next</p>
            <ul className="mt-1.5 divide-y divide-line overflow-hidden rounded-xl bg-surface ring-1 ring-line">
              {queue.map((item) => (
                <li key={item.ref} className="flex items-center gap-2 px-3 py-2">
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[0.6875rem] font-medium text-fg">{item.recipient}</p>
                    <p className="font-mono text-[0.5625rem] text-fg-subtle">{item.ref}</p>
                  </div>
                  <ChevronRight className="size-3 text-fg-subtle" />
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mx-auto mb-1.5 h-1 w-16 rounded-full bg-fg/20" />
      </div>
    </div>
  );

  return <div aria-hidden="true">{screen}</div>;
}
