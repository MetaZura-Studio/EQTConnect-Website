import { dispatchTone, formatNumber, sampleDispatches, sampleMetrics } from "@/content/mock-data";
import { StatusBadge } from "@/components/ui/badge";
import { Metric, MockFrame } from "@/components/mockups/primitives";

export function DispatchBoardMock({ className }: { className?: string }) {
  const { physical } = sampleMetrics;
  return (
    <MockFrame
      className={className}
      title="Dispatch"
      label="Conceptual dispatch management view with delivered, out for delivery and not delivered counts, and a table of dispatch references with recipient, area, rider and status"
      bodyClassName="bg-canvas"
    >
      <div className="grid grid-cols-3 gap-2 p-3 sm:gap-3 sm:p-4">
        <Metric label="Delivered" value={formatNumber(physical.delivered)} hint="Recorded by riders" tone="success" />
        <Metric label="Out for delivery" value={formatNumber(physical.outForDelivery)} hint="On active routes" tone="info" />
        <Metric label="Not delivered" value={formatNumber(physical.notDelivered)} hint="Needs follow-up" tone="danger" />
      </div>
      <div className="mx-3 mb-3 overflow-hidden rounded-xl bg-surface ring-1 ring-line sm:mx-4 sm:mb-4">
        <table className="w-full table-fixed text-2xs">
          <thead>
            <tr className="border-b border-line bg-canvas/60 text-left text-[0.625rem] uppercase tracking-[0.08em] text-fg-subtle">
              <th className="w-[5.25rem] px-3.5 py-2 font-medium">Ref</th>
              <th className="px-2 py-2 font-medium">Recipient</th>
              <th className="hidden px-2 py-2 font-medium md:table-cell">Area</th>
              <th className="hidden px-2 py-2 font-medium sm:table-cell">Rider</th>
              <th className="w-[7.5rem] px-3.5 py-2 text-right font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {sampleDispatches.map((row) => (
              <tr key={row.ref} className={row.status === "Not delivered" ? "bg-danger-50/50" : undefined}>
                <td className="px-3.5 py-2.5 font-mono text-[0.625rem] text-fg-subtle">{row.ref}</td>
                <td className="truncate px-2 py-2.5 font-medium">{row.recipient}</td>
                <td className="hidden truncate px-2 py-2.5 text-fg-muted md:table-cell">{row.area}</td>
                <td className="hidden truncate px-2 py-2.5 text-fg-muted sm:table-cell">{row.rider}</td>
                <td className="px-3.5 py-2.5 text-right">
                  <StatusBadge tone={dispatchTone[row.status]}>{row.status}</StatusBadge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </MockFrame>
  );
}
