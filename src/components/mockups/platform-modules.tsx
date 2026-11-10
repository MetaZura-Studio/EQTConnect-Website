import { ChevronRight } from "lucide-react";
import type { CapabilityId, StatusTone } from "@/types/content";
import { capabilities } from "@/content/capabilities";
import { formatNumber, percent, sampleMetrics, sampleOrg, sampleUsers } from "@/content/mock-data";
import { capabilityIcons } from "@/components/capability-icons";
import { StatusBadge } from "@/components/ui/badge";
import { MockFrame, ProgressBar } from "@/components/mockups/primitives";

const { totals, physical } = sampleMetrics;
const delivered = percent(physical.delivered, totals.physicalRecipients);

const moduleStatus: Record<CapabilityId, { detail: string; status: string; tone: StatusTone; progress: number }> = {
  "shareholder-data": { detail: `${formatNumber(totals.shareholders)} records`, status: "38 to review", tone: "warning", progress: 99 },
  "agm-operations": { detail: "4 of 5 stages started", status: "In progress", tone: "info", progress: 80 },
  communications: { detail: "Email + physical", status: "Sent", tone: "success", progress: 100 },
  dispatch: { detail: `${delivered}% delivered`, status: `${physical.notDelivered} exceptions`, tone: "danger", progress: delivered },
  reporting: { detail: "3 reports available", status: "Ready", tone: "success", progress: 100 },
  administration: { detail: `${sampleUsers.length} users`, status: "1 invited", tone: "neutral", progress: 75 },
};

export function PlatformModulesMock({ className }: { className?: string }) {
  return (
    <MockFrame
      className={className}
      title={`${sampleOrg.meeting} · Modules`}
      label="Conceptual overview listing the six EQTConnect capability areas with a sample status and progress indicator for each"
      bodyClassName="bg-canvas p-3 sm:p-4"
    >
      <ul className="divide-y divide-line overflow-hidden rounded-xl bg-surface ring-1 ring-line">
        {capabilities.map((capability) => {
          const Icon = capabilityIcons[capability.id];
          const status = moduleStatus[capability.id];
          return (
            <li key={capability.id} className="flex items-center gap-3 px-3.5 py-3">
              <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-canvas text-fg-muted ring-1 ring-line">
                <Icon className="size-3.5" />
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <p className="truncate text-2xs font-semibold">{capability.shortTitle}</p>
                  <StatusBadge tone={status.tone}>{status.status}</StatusBadge>
                </div>
                <div className="mt-1.5 flex items-center gap-3">
                  <ProgressBar value={status.progress} tone={status.tone === "danger" ? "info" : status.tone === "neutral" ? "neutral" : "signal"} className="flex-1" />
                  <span className="tabular w-24 shrink-0 text-right text-[0.625rem] text-fg-subtle">{status.detail}</span>
                </div>
              </div>
              <ChevronRight className="hidden size-3.5 text-fg-subtle sm:block" />
            </li>
          );
        })}
      </ul>
    </MockFrame>
  );
}
