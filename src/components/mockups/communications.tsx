import { Mail, Printer } from "lucide-react";
import { formatNumber, percent, sampleMetrics } from "@/content/mock-data";
import { StatusBadge } from "@/components/ui/badge";
import { MockFrame, MockPanel, StackedBar } from "@/components/mockups/primitives";

export function CommunicationsMock({ className }: { className?: string }) {
  const { totals, email, physical } = sampleMetrics;
  const emailClear = email.sent - email.followUp;

  const channels = [
    {
      key: "email",
      title: "Email invitations",
      icon: Mail,
      recipients: totals.emailRecipients,
      accent: "bg-brand-50 text-brand-700",
      rows: [
        { label: "Sent", value: email.sent, tone: "info" as const },
        { label: "No action needed", value: emailClear, tone: "success" as const },
        { label: "Requires follow-up", value: email.followUp, tone: "warning" as const },
      ],
      segments: [
        { value: emailClear, tone: "success" as const },
        { value: email.followUp, tone: "warning" as const },
      ],
    },
    {
      key: "physical",
      title: "Physical dispatches",
      icon: Printer,
      recipients: totals.physicalRecipients,
      accent: "bg-signal-50 text-signal-700",
      rows: [
        { label: "Delivered", value: physical.delivered, tone: "success" as const },
        { label: "Out for delivery", value: physical.outForDelivery, tone: "info" as const },
        { label: "Not delivered", value: physical.notDelivered, tone: "danger" as const },
      ],
      segments: [
        { value: physical.delivered, tone: "success" as const },
        { value: physical.outForDelivery, tone: "info" as const },
        { value: physical.notDelivered, tone: "danger" as const },
      ],
    },
  ];

  return (
    <MockFrame
      className={className}
      title="Communications"
      label="Conceptual communications view showing one shareholder list split into an email invitation channel and a physical dispatch channel, each with its own status breakdown"
      bodyClassName="bg-canvas p-3 sm:p-4"
    >
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2 rounded-xl bg-surface px-3.5 py-2.5 ring-1 ring-line">
        <div>
          <p className="text-2xs text-fg-subtle">Source list</p>
          <p className="tabular text-xs font-semibold">Shareholder register · {formatNumber(totals.shareholders)} recipients</p>
        </div>
        <div className="flex items-center gap-3 text-[0.625rem] text-fg-subtle">
          <span className="tabular">{percent(totals.emailRecipients, totals.shareholders)}% email</span>
          <span className="tabular">{percent(totals.physicalRecipients, totals.shareholders)}% physical</span>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {channels.map((channel) => (
          <MockPanel key={channel.key}>
            <div className="flex items-center gap-2.5 border-b border-line px-3.5 py-3">
              <span className={`grid size-7 place-items-center rounded-lg ${channel.accent}`}>
                <channel.icon className="size-3.5" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-2xs font-semibold">{channel.title}</p>
                <p className="tabular text-[0.625rem] text-fg-subtle">{formatNumber(channel.recipients)} recipients</p>
              </div>
            </div>
            <div className="space-y-2.5 p-3.5">
              <StackedBar segments={channel.segments} />
              <ul className="space-y-2">
                {channel.rows.map((row) => (
                  <li key={row.label} className="flex items-center justify-between gap-2">
                    <StatusBadge tone={row.tone}>{row.label}</StatusBadge>
                    <span className="tabular text-2xs font-semibold">{formatNumber(row.value)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </MockPanel>
        ))}
      </div>
    </MockFrame>
  );
}
