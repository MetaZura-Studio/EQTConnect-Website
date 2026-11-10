import type { ReactNode } from "react";
import { ArrowDown, ArrowUp, Check, Eye, KeyRound, Layers, ListChecks, Settings2, Users, Workflow } from "lucide-react";
import type { Benefit, CapabilityId } from "@/types/content";
import { capabilities, capabilityDetails, getCapability } from "@/content/capabilities";
import { platformContent } from "@/content/platform";
import { cn } from "@/lib/cn";
import { capabilityIcons } from "@/components/capability-icons";
import { Container, Eyebrow, Section } from "@/components/ui/layout";
import { PendingNote } from "@/components/ui/pending";
import { Reveal } from "@/components/ui/reveal";
import { ShareholderRegisterMock } from "@/components/mockups/register";
import { AgmOperationsMock } from "@/components/mockups/operations";
import { CommunicationsMock } from "@/components/mockups/communications";
import { DispatchBoardMock } from "@/components/mockups/dispatch-board";
import { RiderAppMock } from "@/components/mockups/rider-app";
import { ReportingMock } from "@/components/mockups/reporting";
import { AdminMock } from "@/components/mockups/admin";

const sectionScroll = "scroll-mt-[calc(var(--header-height)+3.25rem)]";

function DetailHeader({ id, dark, align = "left", className }: { id: CapabilityId; dark?: boolean; align?: "left" | "center"; className?: string }) {
  const detail = capabilityDetails[id];
  const capability = capabilities.find((c) => c.id === id)!;
  return (
    <div className={cn(align === "center" && "mx-auto max-w-3xl text-center", className)}>
      <Eyebrow dark={dark} className="mb-5">
        {`${capability.index} · ${detail.eyebrow}`}
      </Eyebrow>
      <h2 id={`${id}-heading`} className={cn("text-h2 font-semibold", dark && "text-white")}>
        {detail.heading}
      </h2>
      <div className={cn("mt-5 space-y-4 text-lead", dark ? "text-white/70" : "text-fg-muted")}>
        {detail.description.map((paragraph) => (
          <p key={paragraph.slice(0, 32)}>{paragraph}</p>
        ))}
      </div>
    </div>
  );
}

function BenefitsLabel({ id, dark }: { id: CapabilityId; dark?: boolean }) {
  return (
    <p className={cn("font-mono text-2xs uppercase tracking-[0.14em]", dark ? "text-white/45" : "text-fg-subtle")}>
      {capabilityDetails[id].benefitsLabel}
    </p>
  );
}

function BenefitGrid({ benefits, columns = 2 }: { benefits: Benefit[]; columns?: 2 | 4 }) {
  return (
    <ul className={cn("mt-5 grid gap-x-8 gap-y-6 sm:grid-cols-2", columns === 4 && "lg:grid-cols-4")}>
      {benefits.map((benefit, i) => (
        <Reveal as="li" key={benefit.title} delay={i} className="border-t border-line pt-5">
          <h3 className="font-semibold tracking-tight">{benefit.title}</h3>
          {benefit.description ? <p className="mt-1.5 text-sm leading-relaxed text-fg-muted">{benefit.description}</p> : null}
        </Reveal>
      ))}
    </ul>
  );
}

/* ---------- At a glance ---------- */

export function PlatformGlance() {
  const { glance } = platformContent;
  return (
    <Section tone="surface" aria-labelledby="glance-heading" className="border-t border-line">
      <Container>
        <div className="grid gap-8 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <Eyebrow className="mb-5">{glance.eyebrow}</Eyebrow>
            <h2 id="glance-heading" className="text-h2 font-semibold">
              {glance.heading}
            </h2>
          </Reveal>
          <Reveal delay={1} className="lg:col-span-6 lg:col-start-7 lg:pt-10">
            <p className="text-lead text-fg-muted">{glance.description}</p>
          </Reveal>
        </div>

        <ul className="mt-14 grid overflow-hidden rounded-2xl border border-line sm:grid-cols-2 lg:grid-cols-3">
          {capabilities.map((capability, i) => {
            const Icon = capabilityIcons[capability.id];
            return (
              <Reveal as="li" key={capability.id} delay={i % 3} className="-mb-px -mr-px border-b border-r border-line">
                <a
                  href={`#${capability.id}`}
                  className="group flex h-full flex-col bg-surface p-7 transition-colors hover:bg-canvas sm:p-8"
                >
                  <div className="flex items-center justify-between">
                    <span className="grid size-11 place-items-center rounded-xl bg-canvas text-fg ring-1 ring-line transition-colors group-hover:bg-ink-900 group-hover:text-white group-hover:ring-ink-900">
                      <Icon aria-hidden="true" className="size-5" strokeWidth={1.75} />
                    </span>
                    <span className="font-mono text-xs text-fg-subtle">{capability.index}</span>
                  </div>
                  <h3 className="mt-8 text-lg font-semibold tracking-tight">{capability.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-fg-muted">{capability.summary}</p>
                  <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-brand-700">
                    Read more
                    <ArrowDown aria-hidden="true" className="size-3.5 transition-transform group-hover:translate-y-0.5" />
                  </span>
                </a>
              </Reveal>
            );
          })}
        </ul>
      </Container>
    </Section>
  );
}

/* ---------- 01 Shareholder data: text left, register right ---------- */

export function ShareholderDataSection() {
  const id: CapabilityId = "shareholder-data";
  return (
    <Section id={id} aria-labelledby={`${id}-heading`} className={sectionScroll}>
      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <Reveal>
              <DetailHeader id={id} />
            </Reveal>
            <div className="mt-10">
              <BenefitsLabel id={id} />
              <BenefitGrid benefits={capabilityDetails[id].benefits} />
            </div>
          </div>
          <Reveal delay={1} className="lg:col-span-7">
            <ShareholderRegisterMock />
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}

/* ---------- 02 AGM operations: dark, centered, checklist strip ---------- */

export function AgmOperationsSection() {
  const id: CapabilityId = "agm-operations";
  const icons = [Layers, Workflow, Eye, ListChecks, Check];
  return (
    <Section id={id} tone="dark" aria-labelledby={`${id}-heading`} className={cn("overflow-hidden", sectionScroll)}>
      <div aria-hidden="true" className="bg-grid-dark mask-radial pointer-events-none absolute inset-0" />
      <Container className="relative">
        <Reveal>
          <DetailHeader id={id} dark align="center" />
        </Reveal>
        <Reveal delay={1} className="mx-auto mt-14 max-w-5xl">
          <div className="rounded-[1.375rem] bg-white/5 p-1.5 ring-1 ring-white/10 sm:p-2">
            <AgmOperationsMock className="[&_figcaption]:text-white/50" />
          </div>
        </Reveal>
        <div className="mx-auto mt-14 max-w-5xl">
          <BenefitsLabel id={id} dark />
          <ul className="mt-5 grid gap-px overflow-hidden rounded-2xl bg-white/10 ring-1 ring-white/10 sm:grid-cols-2 lg:grid-cols-5">
            {capabilityDetails[id].benefits.map((benefit, i) => {
              const Icon = icons[i] ?? Check;
              return (
                <Reveal as="li" key={benefit.title} delay={i} className="bg-ink-900 p-5">
                  <Icon aria-hidden="true" className="size-5 text-signal-300" strokeWidth={1.75} />
                  <p className="mt-4 text-sm leading-relaxed text-white/80">{benefit.title}</p>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </Container>
    </Section>
  );
}

/* ---------- 03 Communications: mock left, text right, feature strip ---------- */

export function CommunicationsSection() {
  const id: CapabilityId = "communications";
  return (
    <Section id={id} tone="surface" aria-labelledby={`${id}-heading`} className={sectionScroll}>
      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-12">
          <Reveal className="lg:order-2 lg:col-span-5">
            <DetailHeader id={id} />
          </Reveal>
          <Reveal delay={1} className="lg:order-1 lg:col-span-7">
            <CommunicationsMock />
          </Reveal>
        </div>
        <div className="mt-16">
          <BenefitsLabel id={id} />
          <BenefitGrid benefits={capabilityDetails[id].benefits} columns={4} />
        </div>
      </Container>
    </Section>
  );
}

/* ---------- 04 Dispatch: numbered list + board with rider phone ---------- */

export function DispatchSection() {
  const id: CapabilityId = "dispatch";
  return (
    <Section id={id} aria-labelledby={`${id}-heading`} className={sectionScroll}>
      <Container>
        <Reveal className="max-w-3xl">
          <DetailHeader id={id} />
        </Reveal>
        <div className="mt-14 grid gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <BenefitsLabel id={id} />
            <ol className="mt-5 space-y-0 border-l border-line">
              {capabilityDetails[id].benefits.map((benefit, i) => (
                <Reveal as="li" key={benefit.title} delay={i} className="relative pb-7 pl-7 last:pb-0">
                  <span
                    aria-hidden="true"
                    className="absolute -left-[0.8125rem] top-0 grid size-6 place-items-center rounded-full bg-surface font-mono text-[0.625rem] font-semibold text-fg ring-1 ring-line-strong"
                  >
                    {i + 1}
                  </span>
                  <h3 className="font-semibold tracking-tight">{benefit.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-fg-muted">{benefit.description}</p>
                </Reveal>
              ))}
            </ol>
          </div>
          <Reveal delay={1} className="lg:col-span-8">
            <div className="grid items-center gap-8 md:grid-cols-[minmax(0,1fr)_13.5rem] md:gap-5">
              <DispatchBoardMock />
              <figure className="mx-auto w-[15rem] md:w-full">
                <RiderAppMock />
                <figcaption className="mt-3 text-center text-2xs text-fg-subtle">
                  <span className="sr-only">
                    Conceptual rider app screen showing a delivery queue and options to record a notice as delivered or not delivered.{" "}
                  </span>
                  Rider app concept
                </figcaption>
              </figure>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}

/* ---------- 05 Reporting: split header, wide mock, capability row ---------- */

export function ReportingSection() {
  const id: CapabilityId = "reporting";
  const detail = capabilityDetails[id];
  const capability = capabilities.find((c) => c.id === id)!;
  return (
    <Section id={id} tone="subtle" aria-labelledby={`${id}-heading`} className={cn("border-y border-line", sectionScroll)}>
      <Container>
        <div className="grid gap-8 lg:grid-cols-12">
          <Reveal className="lg:col-span-6">
            <Eyebrow className="mb-5">{`${capability.index} · ${detail.eyebrow}`}</Eyebrow>
            <h2 id={`${id}-heading`} className="text-h2 font-semibold">
              {detail.heading}
            </h2>
          </Reveal>
          <Reveal delay={1} className="space-y-4 text-lead text-fg-muted lg:col-span-5 lg:col-start-8 lg:pt-10">
            {detail.description.map((paragraph) => (
              <p key={paragraph.slice(0, 32)}>{paragraph}</p>
            ))}
          </Reveal>
        </div>
        <Reveal delay={1} className="mt-14">
          <ReportingMock />
        </Reveal>
        <div className="mt-14">
          <BenefitsLabel id={id} />
          <BenefitGrid benefits={detail.benefits} columns={4} />
        </div>
      </Container>
    </Section>
  );
}

/* ---------- 06 Administration: mock left, benefits with icons right ---------- */

export function AdministrationSection() {
  const id: CapabilityId = "administration";
  const icons: ReactNode[] = [
    <Settings2 key="a" className="size-[1.125rem]" strokeWidth={1.75} />,
    <KeyRound key="b" className="size-[1.125rem]" strokeWidth={1.75} />,
    <Workflow key="c" className="size-[1.125rem]" strokeWidth={1.75} />,
    <ListChecks key="d" className="size-[1.125rem]" strokeWidth={1.75} />,
  ];
  return (
    <Section id={id} tone="surface" aria-labelledby={`${id}-heading`} className={sectionScroll}>
      <Container>
        <div className="grid items-start gap-14 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <Reveal>
              <DetailHeader id={id} />
            </Reveal>
            <div className="mt-10">
              <BenefitsLabel id={id} />
            </div>
            <ul className="mt-5 space-y-5">
              {capabilityDetails[id].benefits.map((benefit, i) => (
                <Reveal as="li" key={benefit.title} delay={i} className="flex gap-4">
                  <span aria-hidden="true" className="grid size-10 shrink-0 place-items-center rounded-xl bg-canvas text-fg ring-1 ring-line">
                    {icons[i]}
                  </span>
                  <div>
                    <h3 className="font-semibold tracking-tight">{benefit.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-fg-muted">{benefit.description}</p>
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>
          <Reveal delay={1} className="lg:sticky lg:top-40 lg:col-span-7">
            <AdminMock />
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}

/* ---------- AGM workflow: how the capabilities connect ---------- */

export function WorkflowSection() {
  const { workflow } = platformContent;
  const connectedIcons = [Users, Layers, Settings2];
  return (
    <Section id={workflow.id} aria-labelledby={`${workflow.id}-heading`} className={cn("border-t border-line", sectionScroll)}>
      <Container>
        <div className="grid gap-8 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <Eyebrow className="mb-5">{workflow.eyebrow}</Eyebrow>
            <h2 id={`${workflow.id}-heading`} className="text-h2 font-semibold">
              {workflow.heading}
            </h2>
            <p className="mt-5 max-w-2xl text-lead text-fg-muted">{workflow.subheading}</p>
          </Reveal>
          <Reveal delay={1} className="lg:col-span-4 lg:col-start-9 lg:self-end">
            <PendingNote title="Pending business review">{workflow.reviewNote}</PendingNote>
          </Reveal>
        </div>

        <ol className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {workflow.steps.map((step, i) => {
            const capability = getCapability(step.capability);
            return (
              <Reveal as="li" key={step.step} delay={i % 3} className="flex flex-col rounded-2xl bg-surface p-7 shadow-xs ring-1 ring-line">
                <div className="flex items-center gap-3">
                  <span className="grid size-10 shrink-0 place-items-center rounded-full bg-ink-900 font-mono text-xs font-semibold text-white">
                    {step.step}
                  </span>
                  <span aria-hidden="true" className="h-px flex-1 bg-gradient-to-r from-line-strong to-transparent" />
                </div>
                <h3 className="mt-6 text-lg font-semibold tracking-tight">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-fg-muted">{step.summary}</p>
                <ul className="mt-5 flex-1 space-y-2.5">
                  {step.points.map((point) => (
                    <li key={point} className="flex gap-3 text-sm leading-relaxed text-fg-muted">
                      <Check aria-hidden="true" className="mt-1 size-3.5 shrink-0 text-signal-600" strokeWidth={2.5} />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href={`#${capability.id}`}
                  className="mt-6 inline-flex items-center gap-1.5 self-start text-sm font-medium text-brand-700 hover:text-brand-800"
                >
                  {capability.shortTitle}
                  <ArrowUp aria-hidden="true" className="size-3.5" />
                </a>
              </Reveal>
            );
          })}
        </ol>

        <Reveal className="dark-surface relative mt-16 overflow-hidden rounded-3xl bg-ink-900 px-7 py-10 text-white sm:px-10 lg:px-12">
          <div aria-hidden="true" className="bg-grid-dark mask-radial pointer-events-none absolute inset-0" />
          <div className="relative">
            <h3 className="text-h3 font-semibold text-white">{workflow.connected.heading}</h3>
            <ul className="mt-8 grid gap-8 md:grid-cols-3">
              {workflow.connected.items.map((item, i) => {
                const Icon = connectedIcons[i] ?? Layers;
                return (
                  <li key={item.title} className="border-t border-white/15 pt-6">
                    <Icon aria-hidden="true" className="size-5 text-signal-300" strokeWidth={1.75} />
                    <p className="mt-4 font-semibold tracking-tight text-white">{item.title}</p>
                    <p className="mt-2 text-sm leading-relaxed text-white/70">{item.description}</p>
                  </li>
                );
              })}
            </ul>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
