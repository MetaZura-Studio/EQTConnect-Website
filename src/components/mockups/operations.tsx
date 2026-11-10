import { Check, CircleExclamationPoint } from "lucide-react";
import { cn } from "@/lib/cn";
import { sampleOrg, sampleOutstanding, sampleWorkflow } from "@/content/mock-data";
import { StatusBadge } from "@/components/ui/badge";
import { MockFrame, MockPanel, ProgressBar } from "@/components/mockups/primitives";

const stageProgress = [100, 100, 100, 87, 0];

export function AgmOperationsMock({ className }: { className?: string }) {
  return (
    <MockFrame
      className={className}
      title={`${sampleOrg.meeting} · Operations`}
      label="Conceptual AGM operations workspace showing progress across preparation stages and a list of outstanding actions assigned to teams"
      bodyClassName="bg-canvas p-3 sm:p-4"
    >
      <div className="grid gap-3 md:grid-cols-5">
        <MockPanel title="Preparation progress" className="md:col-span-3">
          <ol className="space-y-3 p-3.5">
            {sampleWorkflow.map((stage, i) => (
              <li key={stage.label} className="flex items-center gap-3">
                <span
                  className={cn(
                    "grid size-5 shrink-0 place-items-center rounded-full text-[0.5625rem] font-semibold",
                    stage.state === "done" && "bg-signal-500 text-white",
                    stage.state === "active" && "bg-brand-50 text-brand-700 ring-1 ring-brand-300",
                    stage.state === "upcoming" && "bg-subtle text-fg-subtle",
                  )}
                >
                  {stage.state === "done" ? <Check className="size-3" strokeWidth={3} /> : i + 1}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className="truncate text-2xs font-medium text-fg">{stage.label}</p>
                    <span className="tabular text-[0.625rem] text-fg-subtle">{stage.detail}</span>
                  </div>
                  <ProgressBar
                    className="mt-1.5"
                    value={stageProgress[i] ?? 0}
                    tone={stage.state === "done" ? "signal" : "info"}
                  />
                </div>
              </li>
            ))}
          </ol>
        </MockPanel>

        <MockPanel
          title="Outstanding actions"
          action={<StatusBadge tone="warning">{sampleOutstanding.length} open</StatusBadge>}
          className="md:col-span-2"
        >
          <ul className="divide-y divide-line">
            {sampleOutstanding.map((item) => (
              <li key={item.label} className="flex gap-2.5 p-3">
                <CircleExclamationPoint
                  className={cn("mt-0.5 size-3.5 shrink-0", item.tone === "danger" ? "text-danger-600" : "text-warning-600")}
                />
                <div className="min-w-0">
                  <p className="text-2xs font-medium leading-snug text-fg">{item.label}</p>
                  <p className="mt-0.5 text-[0.625rem] text-fg-subtle">{item.owner}</p>
                </div>
              </li>
            ))}
          </ul>
        </MockPanel>
      </div>
    </MockFrame>
  );
}
