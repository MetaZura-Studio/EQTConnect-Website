import { EyeOff, FileSpreadsheet, Send } from "lucide-react";
import { homeContent } from "@/content/home";
import { cn } from "@/lib/cn";
import { Container, Eyebrow, Section } from "@/components/ui/layout";
import { Reveal } from "@/components/ui/reveal";

const icons = { data: FileSpreadsheet, dispatch: Send, visibility: EyeOff } as const;

/** Illustrative fragments representing today's disconnected tooling. */
const fragments = [
  { label: "shareholders_FINAL_v7.xlsx", kind: "XLSX", className: "left-0 top-2 -rotate-3" },
  { label: "register (registry copy).xlsx", kind: "XLSX", className: "right-0 top-16 rotate-2" },
  { label: "email_export_0612.csv", kind: "CSV", className: "left-6 top-32 rotate-1" },
  { label: "Courier receipts — batch 3", kind: "SCAN", className: "right-4 top-[12.5rem] -rotate-2" },
  { label: "printed_notices_list.pdf", kind: "PDF", className: "left-2 top-[16.5rem] rotate-[1.5deg]" },
];

export function ProblemSection() {
  const { problem } = homeContent;
  return (
    <Section aria-labelledby="problem-heading">
      <Container>
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <Reveal>
              <Eyebrow className="mb-5">{problem.eyebrow}</Eyebrow>
              <h2 id="problem-heading" className="max-w-md text-h2 font-semibold">
                {problem.heading}
              </h2>
            </Reveal>

            <Reveal delay={1} className="relative mt-12 hidden h-[20rem] max-w-sm sm:block">
              <div aria-hidden="true" className="relative isolate size-full">
                {fragments.map((fragment) => (
                  <div
                    key={fragment.label}
                    className={cn(
                      "absolute flex items-center gap-2.5 rounded-lg bg-surface px-3 py-2 text-xs text-fg-muted shadow-md ring-1 ring-line",
                      fragment.className,
                    )}
                  >
                    <span className="rounded bg-subtle px-1.5 py-0.5 font-mono text-[0.5625rem] font-semibold text-fg-subtle">{fragment.kind}</span>
                    <span className="whitespace-nowrap">{fragment.label}</span>
                  </div>
                ))}
                <svg className="absolute inset-0 -z-10 size-full" viewBox="0 0 380 320" fill="none">
                  <path
                    d="M60 30 C 120 80, 300 40, 290 90 S 80 120, 120 150 S 330 170, 300 220 S 70 250, 110 285"
                    stroke="var(--color-danger-600)"
                    strokeOpacity="0.35"
                    strokeWidth="1.25"
                    strokeDasharray="4 5"
                  />
                </svg>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <div className="hidden grid-cols-[1fr_1fr] gap-8 border-b border-line pb-3 font-mono text-2xs uppercase tracking-[0.14em] text-fg-subtle sm:grid sm:pl-16">
              <span>{problem.columns.problem}</span>
              <span>{problem.columns.cost}</span>
            </div>
            <ol className="divide-y divide-line">
              {problem.items.map((item, i) => {
                const Icon = icons[item.id];
                return (
                  <Reveal as="li" key={item.id} delay={i} className="grid gap-5 py-8 sm:grid-cols-[3rem_1fr_1fr] sm:gap-8 sm:py-10">
                    <span className="grid size-11 place-items-center rounded-xl bg-surface text-fg shadow-xs ring-1 ring-line">
                      <Icon aria-hidden="true" className="size-5" strokeWidth={1.75} />
                    </span>
                    <div>
                      <p className="font-mono text-2xs uppercase tracking-[0.14em] text-fg-subtle sm:hidden">{problem.columns.problem}</p>
                      <h3 className="mt-1 text-lg font-semibold tracking-tight sm:mt-0">{item.title}</h3>
                      <p className="mt-2 text-fg-muted">{item.description}</p>
                    </div>
                    <div className="relative rounded-xl bg-danger-50/60 p-4 ring-1 ring-danger-600/10 sm:bg-transparent sm:p-0 sm:ring-0">
                      <p className="font-mono text-2xs uppercase tracking-[0.14em] text-danger-700 sm:hidden">{problem.columns.cost}</p>
                      <p className="mt-1 flex gap-2.5 font-medium text-fg sm:mt-0">
                        <span aria-hidden="true" className="mt-2.5 hidden h-px w-5 shrink-0 bg-danger-600/60 sm:block" />
                        {item.cost}
                      </p>
                    </div>
                  </Reveal>
                );
              })}
            </ol>
          </div>
        </div>
      </Container>
    </Section>
  );
}
