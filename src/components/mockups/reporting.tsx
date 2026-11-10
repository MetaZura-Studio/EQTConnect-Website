import { Download, FileText } from "lucide-react";
import {
  formatNumber,
  percent,
  sampleDeliveryTrend,
  sampleDeliveryTrendLabels,
  sampleMetrics,
} from "@/content/mock-data";
import { Metric, MockFrame, MockPanel } from "@/components/mockups/primitives";

function TrendChart() {
  const width = 320;
  const height = 120;
  const pad = 8;
  const max = Math.max(...sampleDeliveryTrend) * 1.15;
  const step = (width - pad * 2) / (sampleDeliveryTrend.length - 1);
  const points = sampleDeliveryTrend.map((value, i) => [pad + i * step, height - pad - (value / max) * (height - pad * 2)] as const);
  const line = points.map(([x, y], i) => `${i === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`).join(" ");
  const area = `${line} L${(pad + (points.length - 1) * step).toFixed(1)} ${height - pad} L${pad} ${height - pad} Z`;
  const last = points[points.length - 1]!;

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="h-auto w-full" preserveAspectRatio="none">
      <defs>
        <linearGradient id="trend-fill" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="var(--color-brand-500)" stopOpacity="0.22" />
          <stop offset="100%" stopColor="var(--color-brand-500)" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[0.25, 0.5, 0.75].map((f) => (
        <line key={f} x1={pad} x2={width - pad} y1={height * f} y2={height * f} stroke="var(--color-line)" strokeDasharray="3 4" />
      ))}
      <path d={area} fill="url(#trend-fill)" />
      <path d={line} fill="none" stroke="var(--color-brand-600)" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
      <circle cx={last[0]} cy={last[1]} r="4" fill="var(--color-surface)" stroke="var(--color-brand-600)" strokeWidth="2" />
    </svg>
  );
}

export function ReportingMock({ className }: { className?: string }) {
  const { totals, physical, email } = sampleMetrics;
  const reports = [
    { name: "Dispatch report", detail: `${formatNumber(totals.physicalRecipients)} rows` },
    { name: "Delivery report", detail: `${formatNumber(physical.delivered)} delivered` },
    { name: "Exceptions follow-up", detail: `${formatNumber(physical.notDelivered + email.followUp)} items` },
  ];

  return (
    <MockFrame
      className={className}
      title="Reports"
      label="Conceptual reporting dashboard with summary metrics, a chart of delivered notices per day, and a list of exportable dispatch, delivery and exception reports"
      bodyClassName="bg-canvas p-3 sm:p-4"
    >
      <div className="grid grid-cols-2 gap-2 sm:gap-3 lg:grid-cols-4">
        <Metric label="Recipients" value={formatNumber(totals.shareholders)} hint="Email + physical" />
        <Metric label="Email invitations sent" value={formatNumber(email.sent)} hint={`${formatNumber(email.followUp)} need follow-up`} tone="warning" />
        <Metric label="Physical delivered" value={`${percent(physical.delivered, totals.physicalRecipients)}%`} hint={`${formatNumber(physical.delivered)} items`} tone="success" />
        <Metric label="Open exceptions" value={formatNumber(physical.notDelivered + email.followUp)} hint="Across both channels" tone="danger" />
      </div>
      <div className="mt-3 grid gap-3 md:grid-cols-5">
        <MockPanel title="Physical notices delivered per day" className="md:col-span-3">
          <div className="px-3.5 pb-3 pt-3">
            <TrendChart />
            <div className="mt-1 flex justify-between text-[0.625rem] text-fg-subtle">
              {sampleDeliveryTrendLabels.map((label) => (
                <span key={label}>{label}</span>
              ))}
            </div>
          </div>
        </MockPanel>
        <MockPanel title="Exports" className="md:col-span-2">
          <ul className="divide-y divide-line">
            {reports.map((report) => (
              <li key={report.name} className="flex items-center gap-2.5 px-3.5 py-2.5">
                <span className="grid size-7 shrink-0 place-items-center rounded-lg bg-subtle text-fg-muted">
                  <FileText className="size-3.5" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-2xs font-medium">{report.name}</p>
                  <p className="tabular text-[0.625rem] text-fg-subtle">{report.detail}</p>
                </div>
                <Download className="size-3.5 text-fg-subtle" />
              </li>
            ))}
          </ul>
        </MockPanel>
      </div>
    </MockFrame>
  );
}
