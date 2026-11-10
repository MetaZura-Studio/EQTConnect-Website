import {
  CalendarCheck,
  ChartColumn,
  Check,
  Download,
  LayoutDashboard,
  Mail,
  Search,
  Settings2,
  Truck,
  Users,
} from "lucide-react";
import { cn } from "@/lib/cn";
import {
  dispatchTone,
  formatNumber,
  percent,
  sampleActivity,
  sampleDispatches,
  sampleMetrics,
  sampleOrg,
  sampleWorkflow,
} from "@/content/mock-data";
import { StatusBadge, StatusDot } from "@/components/ui/badge";
import { Metric, MockFrame, MockPanel, StackedBar } from "@/components/mockups/primitives";
import { RiderAppMock } from "@/components/mockups/rider-app";

const sidebar = [
  { label: "Overview", icon: LayoutDashboard, active: true },
  { label: "Shareholders", icon: Users },
  { label: "AGM operations", icon: CalendarCheck },
  { label: "Communications", icon: Mail },
  { label: "Dispatch", icon: Truck },
  { label: "Reports", icon: ChartColumn },
  { label: "Administration", icon: Settings2 },
];

export function HeroDashboard() {
  const { totals, physical, email } = sampleMetrics;
  const deliveredPct = percent(physical.delivered, totals.physicalRecipients);

  return (
    <div className="relative xl:pr-[8.5rem]">
      <MockFrame
        label="Conceptual EQTConnect overview for a sample AGM showing shareholder totals, email and physical invitation counts, AGM workflow progress, dispatch status distribution and recent activity"
        title={`${sampleOrg.meeting} · Overview`}
        bodyClassName="flex bg-canvas"
        caption={false}
      >
        <aside className="hidden w-48 shrink-0 border-r border-line bg-surface px-2.5 py-3 md:block">
          <div className="mb-3 flex items-center gap-2 rounded-lg bg-canvas px-2.5 py-1.5 text-fg-subtle ring-1 ring-line">
            <Search className="size-3" />
            <span className="text-2xs">Search records</span>
          </div>
          <ul className="space-y-0.5">
            {sidebar.map(({ label, icon: Icon, active }) => (
              <li
                key={label}
                className={cn(
                  "flex items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-2xs",
                  active ? "bg-brand-50 font-semibold text-brand-700" : "text-fg-muted",
                )}
              >
                <Icon className="size-3.5" strokeWidth={2} />
                {label}
              </li>
            ))}
          </ul>
          <div className="mt-6 rounded-lg bg-ink-900 p-3 text-white">
            <p className="text-[0.625rem] text-white/60">Next meeting</p>
            <p className="mt-0.5 text-2xs font-semibold">{sampleOrg.meeting}</p>
            <p className="tabular text-[0.625rem] text-white/60">{sampleOrg.meetingDate}</p>
          </div>
        </aside>

        <div className="min-w-0 flex-1 space-y-3 p-3 sm:p-4">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-semibold tracking-tight">AGM communications overview</p>
              <p className="text-2xs text-fg-subtle">Updated 11:31 · {sampleOrg.meetingDate} meeting</p>
            </div>
            <span className="hidden items-center gap-1.5 rounded-lg bg-surface px-2.5 py-1.5 text-2xs font-medium text-fg-muted ring-1 ring-line sm:inline-flex">
              <Download className="size-3" /> Export
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 sm:gap-3 lg:grid-cols-4">
            <Metric label="Shareholders on register" value={formatNumber(totals.shareholders)} hint="38 flagged for review" tone="warning" />
            <Metric
              label="Email invitations"
              value={formatNumber(email.sent)}
              hint={`${formatNumber(email.followUp)} need follow-up`}
              tone="warning"
            />
            <Metric label="Physical dispatches" value={formatNumber(totals.physicalRecipients)} hint={`${deliveredPct}% delivered`} tone="success" />
            <Metric label="Needs follow-up" value={formatNumber(physical.notDelivered)} hint="Not delivered" tone="danger" />
          </div>

          <MockPanel title="AGM workflow" action={<span className="text-[0.625rem] text-fg-subtle">4 of 5 stages started</span>}>
            <ol className="grid grid-cols-5 gap-1.5 p-3">
              {sampleWorkflow.map((stage) => (
                <li key={stage.label} className="min-w-0">
                  <div
                    className={cn(
                      "h-1 rounded-full",
                      stage.state === "done" && "bg-signal-500",
                      stage.state === "active" && "bg-gradient-to-r from-signal-500 to-brand-400",
                      stage.state === "upcoming" && "bg-subtle",
                    )}
                  />
                  <div className="mt-2 flex items-center gap-1.5">
                    {stage.state === "done" ? (
                      <Check className="size-3 shrink-0 text-signal-600" strokeWidth={3} />
                    ) : (
                      <span
                        className={cn(
                          "size-2 shrink-0 rounded-full",
                          stage.state === "active" ? "animate-pulse-soft bg-brand-500" : "bg-line-strong",
                        )}
                      />
                    )}
                    <p className="truncate text-[0.625rem] font-medium sm:text-2xs">{stage.label}</p>
                  </div>
                  <p className="tabular mt-0.5 hidden truncate pl-[1.125rem] text-[0.625rem] text-fg-subtle sm:block">{stage.detail}</p>
                </li>
              ))}
            </ol>
          </MockPanel>

          <div className="grid gap-3 lg:grid-cols-5">
            <MockPanel
              title="Physical dispatch status"
              action={<span className="tabular text-[0.625rem] text-fg-subtle">{formatNumber(totals.physicalRecipients)} items</span>}
              className="lg:col-span-3"
            >
              <div className="p-3">
                <StackedBar
                  segments={[
                    { value: physical.delivered, tone: "success" },
                    { value: physical.outForDelivery, tone: "info" },
                    { value: physical.notDelivered, tone: "danger" },
                  ]}
                />
                <dl className="mt-2.5 grid grid-cols-3 gap-2">
                  {(
                    [
                      ["Delivered", physical.delivered, "success"],
                      ["Out for delivery", physical.outForDelivery, "info"],
                      ["Not delivered", physical.notDelivered, "danger"],
                    ] as const
                  ).map(([label, value, tone]) => (
                    <div key={label}>
                      <dt className="flex items-center gap-1.5 truncate text-[0.625rem] text-fg-subtle">
                        <StatusDot tone={tone} className="size-1.5" />
                        {label}
                      </dt>
                      <dd className="tabular mt-0.5 text-xs font-semibold">{formatNumber(value)}</dd>
                    </div>
                  ))}
                </dl>
              </div>
              <ul className="divide-y divide-line border-t border-line">
                {sampleDispatches.slice(0, 3).map((item) => (
                  <li key={item.ref} className="flex items-center gap-3 px-3 py-2">
                    <span className="tabular w-[4.5rem] shrink-0 font-mono text-[0.625rem] text-fg-subtle">{item.ref}</span>
                    <span className="min-w-0 flex-1 truncate text-2xs font-medium">{item.recipient}</span>
                    <span className="hidden text-[0.625rem] text-fg-subtle sm:block">{item.area}</span>
                    <StatusBadge tone={dispatchTone[item.status]}>{item.status}</StatusBadge>
                  </li>
                ))}
              </ul>
            </MockPanel>

            <MockPanel title="Recent activity" className="hidden sm:block lg:col-span-2">
              <ol className="space-y-3 p-3">
                {sampleActivity.map((event) => (
                  <li key={event.time + event.text} className="flex gap-2.5">
                    <StatusDot tone={event.tone} className="mt-1 size-1.5 shrink-0" />
                    <div className="min-w-0">
                      <p className="text-2xs leading-snug text-fg">{event.text}</p>
                      <p className="tabular text-[0.625rem] text-fg-subtle">{event.time}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </MockPanel>
          </div>
        </div>
      </MockFrame>

      <div className="pointer-events-none absolute -bottom-12 right-0 hidden w-[13.5rem] xl:block">
        <RiderAppMock compact />
      </div>
    </div>
  );
}
