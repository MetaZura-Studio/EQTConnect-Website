import type { ReactNode } from "react";
import { Check, Database, Download, FileText, Mail, Printer, Send, Truck, Workflow, ChartColumn } from "lucide-react";
import { homeContent } from "@/content/home";
import { dispatchTone, formatNumber, recordTone, sampleMetrics, sampleShareholders } from "@/content/mock-data";
import { cn } from "@/lib/cn";
import { StatusBadge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { Container, Section, SectionHeader } from "@/components/ui/layout";
import { Reveal } from "@/components/ui/reveal";

function PillarCard({
  icon,
  title,
  description,
  visual,
  className,
  layout = "stacked",
  delay = 0,
}: {
  icon: ReactNode;
  title: string;
  description: string;
  visual: ReactNode;
  className?: string;
  layout?: "stacked" | "split";
  delay?: number;
}) {
  return (
    <Reveal
      as="li"
      delay={delay}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-2xl bg-surface p-2 shadow-sm ring-1 ring-line transition-shadow duration-300 hover:shadow-lg",
        layout === "split" && "lg:flex-row-reverse",
        className,
      )}
    >
      <div
        aria-hidden="true"
        className={cn(
          "relative overflow-hidden rounded-xl bg-canvas ring-1 ring-line/70",
          layout === "split" ? "min-h-52 lg:w-[56%]" : "h-48",
        )}
      >
        {visual}
      </div>
      <div className={cn("flex flex-col p-5 sm:p-6", layout === "split" && "lg:flex-1 lg:justify-end lg:p-8")}>
        <span className="grid size-9 place-items-center rounded-lg bg-ink-900 text-white">{icon}</span>
        <h3 className={cn("mt-5 font-semibold tracking-tight", layout === "split" ? "text-h3" : "text-lg")}>{title}</h3>
        <p className="mt-2 text-fg-muted">{description}</p>
      </div>
    </Reveal>
  );
}

function RegisterVisual() {
  return (
    <div className="absolute inset-0 flex flex-col justify-center gap-3 p-5 sm:p-7">
      <div className="flex items-center gap-1.5 text-[0.625rem] font-medium">
        {["Import", "Clean", "Maintain"].map((step, i) => (
          <span key={step} className="flex items-center gap-1.5">
            <span className={cn("rounded-full px-2 py-0.5 ring-1", i < 2 ? "bg-signal-50 text-signal-700 ring-signal-600/20" : "bg-brand-50 text-brand-700 ring-brand-200")}>
              {step}
            </span>
            {i < 2 ? <span className="h-px w-4 bg-line-strong" /> : null}
          </span>
        ))}
      </div>
      <div className="overflow-hidden rounded-lg bg-surface text-2xs shadow-sm ring-1 ring-line">
        {sampleShareholders.slice(2, 6).map((row) => (
          <div key={row.folio} className="flex items-center gap-3 border-b border-line px-3 py-2 last:border-0">
            <span className="w-16 shrink-0 font-mono text-[0.625rem] text-fg-subtle">{row.folio}</span>
            <span className="flex-1 truncate font-medium">{row.name}</span>
            <span className="tabular hidden text-fg-subtle xs:block">{formatNumber(row.holding)}</span>
            <StatusBadge tone={recordTone[row.record]}>{row.record}</StatusBadge>
          </div>
        ))}
      </div>
    </div>
  );
}

function InvitationVisual() {
  const steps = [
    { label: "Register linked", done: true },
    { label: "Invitation prepared", done: true },
    { label: "Channels assigned", done: true },
    { label: "Ready to send", done: false },
  ];
  return (
    <ol className="absolute inset-0 flex flex-col justify-center gap-2 px-6">
      {steps.map((step) => (
        <li key={step.label} className="flex items-center gap-2.5 rounded-lg bg-surface px-3 py-1.5 text-2xs shadow-xs ring-1 ring-line">
          <span className={cn("grid size-4 place-items-center rounded-full", step.done ? "bg-signal-500 text-white" : "ring-1 ring-brand-300")}>
            {step.done ? <Check className="size-2.5" strokeWidth={3.5} /> : <span className="size-1.5 animate-pulse-soft rounded-full bg-brand-500" />}
          </span>
          <span className={step.done ? "text-fg" : "font-semibold text-brand-700"}>{step.label}</span>
        </li>
      ))}
    </ol>
  );
}

function ChannelsVisual() {
  const { totals } = sampleMetrics;
  return (
    <div className="absolute inset-0 flex items-center justify-center px-4">
      <svg viewBox="0 0 260 150" className="h-full w-full max-w-[17rem]" fill="none">
        <path d="M84 75 C 120 75, 120 38, 156 38" stroke="var(--color-brand-400)" strokeWidth="1.5" strokeDasharray="4 4" className="animate-dash" />
        <path d="M84 75 C 120 75, 120 112, 156 112" stroke="var(--color-signal-400)" strokeWidth="1.5" strokeDasharray="4 4" className="animate-dash" />
        <rect x="8" y="56" width="76" height="38" rx="8" fill="var(--color-surface)" stroke="var(--color-line)" />
        <text x="46" y="72" textAnchor="middle" fontSize="8" fill="var(--color-fg-subtle)">One list</text>
        <text x="46" y="85" textAnchor="middle" fontSize="9" fontWeight="600" fill="var(--color-fg)">{formatNumber(totals.shareholders)}</text>
        <rect x="156" y="20" width="96" height="36" rx="8" fill="var(--color-brand-50)" stroke="var(--color-brand-200)" />
        <text x="204" y="35" textAnchor="middle" fontSize="8" fill="var(--color-brand-700)">Email</text>
        <text x="204" y="48" textAnchor="middle" fontSize="9" fontWeight="600" fill="var(--color-brand-800)">{formatNumber(totals.emailRecipients)}</text>
        <rect x="156" y="94" width="96" height="36" rx="8" fill="var(--color-signal-50)" stroke="var(--color-signal-300)" />
        <text x="204" y="109" textAnchor="middle" fontSize="8" fill="var(--color-signal-700)">Print &amp; post</text>
        <text x="204" y="122" textAnchor="middle" fontSize="9" fontWeight="600" fill="var(--color-signal-700)">{formatNumber(totals.physicalRecipients)}</text>
      </svg>
      <Mail className="absolute right-5 top-4 size-3.5 text-brand-500" />
      <Printer className="absolute bottom-4 right-5 size-3.5 text-signal-600" />
    </div>
  );
}

function DispatchVisual() {
  const steps = [
    { label: "Prepared", time: "09:10", tone: "neutral" as const },
    { label: "Out for delivery", time: "10:02", tone: "info" as const },
    { label: "Delivered", time: "10:42", tone: "success" as const },
  ];
  return (
    <div className="absolute inset-0 flex flex-col justify-center px-6">
      <p className="mb-3 font-mono text-[0.625rem] text-fg-subtle">DSP-20931 · AGM notice</p>
      <ol className="relative space-y-3 border-l border-dashed border-line-strong pl-4">
        {steps.map((step) => (
          <li key={step.label} className="relative flex items-center justify-between gap-2">
            <span className="absolute -left-[1.3rem] size-2.5 rounded-full bg-surface ring-2 ring-signal-500" />
            <StatusBadge tone={dispatchTone[step.label as keyof typeof dispatchTone] ?? step.tone}>{step.label}</StatusBadge>
            <span className="tabular text-[0.625rem] text-fg-subtle">{step.time}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

function ReportingVisual() {
  const files = ["Dispatch records", "Delivery records", "Attendance records"];
  return (
    <ul className="absolute inset-0 flex flex-col justify-center gap-2 px-6">
      {files.map((file, i) => (
        <li
          key={file}
          className="flex items-center gap-2.5 rounded-lg bg-surface px-3 py-2 text-2xs shadow-xs ring-1 ring-line"
          style={{ marginLeft: `${i * 10}px` }}
        >
          <FileText className="size-3.5 text-fg-subtle" />
          <span className="flex-1 font-medium">{file}</span>
          <Download className="size-3.5 text-brand-600" />
        </li>
      ))}
    </ul>
  );
}

export function PlatformPillars() {
  const { platform } = homeContent;
  const { pillars } = platform;
  const iconClass = "size-4";
  return (
    <Section tone="surface" aria-labelledby="platform-heading" className="border-y border-line">
      <Container>
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <Reveal>
            <SectionHeader id="platform-heading" eyebrow={platform.eyebrow} heading={platform.heading} subheading={platform.subheading} />
          </Reveal>
          <Reveal delay={1}>
            <ButtonLink href="/platform" variant="secondary" withArrow>
              Explore the platform
            </ButtonLink>
          </Reveal>
        </div>

        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
          <PillarCard
            layout="split"
            className="sm:col-span-2 lg:col-span-4"
            icon={<Database className={iconClass} />}
            title={pillars.investorData.title}
            description={pillars.investorData.description}
            visual={<RegisterVisual />}
          />
          <PillarCard
            className="lg:col-span-2"
            delay={1}
            icon={<Workflow className={iconClass} />}
            title={pillars.invitations.title}
            description={pillars.invitations.description}
            visual={<InvitationVisual />}
          />
          <PillarCard
            className="lg:col-span-2"
            icon={<Send className={iconClass} />}
            title={pillars.communications.title}
            description={pillars.communications.description}
            visual={<ChannelsVisual />}
          />
          <PillarCard
            className="lg:col-span-2"
            delay={1}
            icon={<Truck className={iconClass} />}
            title={pillars.dispatch.title}
            description={pillars.dispatch.description}
            visual={<DispatchVisual />}
          />
          <PillarCard
            className="sm:col-span-2 lg:col-span-2"
            delay={2}
            icon={<ChartColumn className={iconClass} />}
            title={pillars.reporting.title}
            description={pillars.reporting.description}
            visual={<ReportingVisual />}
          />
        </ul>
        <p className="mt-6 text-2xs text-fg-subtle">Visuals are illustrative concepts using fictional sample data.</p>
      </Container>
    </Section>
  );
}
