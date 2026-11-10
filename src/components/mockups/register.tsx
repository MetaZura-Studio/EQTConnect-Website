import { ListFilter, Search, Upload } from "lucide-react";
import { formatNumber, recordTone, sampleMetrics, sampleShareholders } from "@/content/mock-data";
import { StatusBadge } from "@/components/ui/badge";
import { MockFrame } from "@/components/mockups/primitives";
import { cn } from "@/lib/cn";

export function ShareholderRegisterMock({ className }: { className?: string }) {
  return (
    <MockFrame
      className={className}
      title="Shareholders"
      label="Conceptual shareholder register listing folio numbers, names, cities, holdings, communication channel and record status, with records flagged for review or as possible duplicates"
    >
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line px-4 py-3">
        <div>
          <p className="text-sm font-semibold tracking-tight">Shareholder register</p>
          <p className="tabular text-2xs text-fg-subtle">{formatNumber(sampleMetrics.totals.shareholders)} records · 38 need review</p>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="hidden items-center gap-1.5 rounded-lg bg-canvas px-2.5 py-1.5 text-2xs text-fg-subtle ring-1 ring-line sm:flex">
            <Search className="size-3" /> Search folio or name
          </span>
          <span className="flex items-center gap-1.5 rounded-lg bg-canvas px-2.5 py-1.5 text-2xs text-fg-muted ring-1 ring-line">
            <ListFilter className="size-3" /> Filter
          </span>
          <span className="flex items-center gap-1.5 rounded-lg bg-brand-800 px-2.5 py-1.5 text-2xs font-medium text-white">
            <Upload className="size-3" /> Import
          </span>
        </div>
      </div>

      <div className="flex gap-1 border-b border-line px-4 py-2 text-2xs">
        {[
          ["All records", "12,480", true],
          ["Email", "9,862", false],
          ["Physical", "2,618", false],
          ["Needs review", "38", false],
        ].map(([label, count, active]) => (
          <span
            key={label as string}
            className={cn(
              "flex items-center gap-1.5 rounded-md px-2 py-1",
              active ? "bg-subtle font-semibold text-fg" : "text-fg-muted",
              label === "Physical" && "hidden xs:flex",
            )}
          >
            {label}
            <span className="tabular rounded bg-surface px-1 text-[0.625rem] text-fg-subtle ring-1 ring-line">{count}</span>
          </span>
        ))}
      </div>

      <table className="w-full table-fixed text-2xs">
        <thead>
          <tr className="border-b border-line bg-canvas/60 text-left text-[0.625rem] uppercase tracking-[0.08em] text-fg-subtle">
            <th className="w-[5.5rem] px-4 py-2 font-medium">Folio</th>
            <th className="px-2 py-2 font-medium">Shareholder</th>
            <th className="hidden px-2 py-2 font-medium sm:table-cell">City</th>
            <th className="hidden px-2 py-2 text-right font-medium md:table-cell">Holding</th>
            <th className="hidden px-2 py-2 font-medium sm:table-cell">Channel</th>
            <th className="w-[7rem] px-4 py-2 text-right font-medium">Record</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-line">
          {sampleShareholders.map((row) => (
            <tr key={row.folio} className={row.record === "Duplicate?" ? "bg-danger-50/40" : undefined}>
              <td className="tabular px-4 py-2.5 font-mono text-[0.625rem] text-fg-subtle">{row.folio}</td>
              <td className="truncate px-2 py-2.5 font-medium">{row.name}</td>
              <td className="hidden truncate px-2 py-2.5 text-fg-muted sm:table-cell">{row.city}</td>
              <td className="tabular hidden px-2 py-2.5 text-right text-fg-muted md:table-cell">{formatNumber(row.holding)}</td>
              <td className="hidden px-2 py-2.5 sm:table-cell">
                <span className="text-fg-muted">{row.channel}</span>
              </td>
              <td className="px-4 py-2.5 text-right">
                <StatusBadge tone={recordTone[row.record]}>{row.record}</StatusBadge>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </MockFrame>
  );
}
