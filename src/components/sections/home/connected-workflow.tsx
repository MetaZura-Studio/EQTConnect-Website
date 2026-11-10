import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { CapabilityId } from "@/types/content";
import { capabilities } from "@/content/capabilities";
import { homeContent } from "@/content/home";
import { Container, Section, SectionHeader } from "@/components/ui/layout";
import { Reveal } from "@/components/ui/reveal";
import { LogoMark } from "@/components/layout/logo";
import { capabilityIcons } from "@/components/capability-icons";

const ys = [16.6, 50, 83.4];

function Node({ id, index, title, summary }: { id: CapabilityId; index: string; title: string; summary: string }) {
  const Icon = capabilityIcons[id];
  return (
    <Link
      href={`/platform#${id}`}
      className="group relative flex h-full gap-4 rounded-2xl bg-ink-800/80 p-5 ring-1 ring-white/10 backdrop-blur transition-[background-color,box-shadow] duration-300 hover:bg-ink-700/80 hover:ring-white/20"
    >
      <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-white/5 text-signal-300 ring-1 ring-white/10">
        <Icon aria-hidden="true" className="size-[1.125rem]" strokeWidth={1.75} />
      </span>
      <span className="min-w-0">
        <span className="flex items-center gap-2">
          <span className="font-mono text-2xs text-white/40">{index}</span>
          <span className="font-semibold text-white">{title}</span>
          <ArrowUpRight aria-hidden="true" className="size-3.5 text-white/30 transition-[color,transform] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white/70" />
        </span>
        <span className="mt-1.5 block text-sm leading-relaxed text-white/60">{summary}</span>
      </span>
    </Link>
  );
}

export function ConnectedWorkflow() {
  const { workflow } = homeContent;
  const left = capabilities.slice(0, 3);
  const right = capabilities.slice(3);

  return (
    <Section tone="dark" aria-labelledby="workflow-heading" className="overflow-hidden">
      <div aria-hidden="true" className="bg-grid-dark mask-radial pointer-events-none absolute inset-0" />
      <Container className="relative">
        <Reveal>
          <SectionHeader id="workflow-heading" dark align="center" eyebrow={workflow.eyebrow} heading={workflow.heading} subheading={workflow.subheading} />
        </Reveal>

        <div className="relative mt-16 lg:mt-20">
          <svg
            aria-hidden="true"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="pointer-events-none absolute inset-0 hidden size-full lg:block"
            fill="none"
          >
            {ys.map((y) => (
              <g key={y}>
                <path d={`M20 ${y} C 38 ${y}, 38 50, 50 50`} stroke="var(--color-brand-400)" strokeOpacity="0.45" strokeWidth="1.25" vectorEffect="non-scaling-stroke" strokeDasharray="5 6" className="animate-dash" />
                <path d={`M80 ${y} C 62 ${y}, 62 50, 50 50`} stroke="var(--color-signal-400)" strokeOpacity="0.45" strokeWidth="1.25" vectorEffect="non-scaling-stroke" strokeDasharray="5 6" className="animate-dash" />
              </g>
            ))}
          </svg>

          <div className="relative grid gap-4 lg:grid-cols-[1fr_15rem_1fr] lg:items-center lg:gap-x-16">
            <ul className="grid gap-4 lg:auto-rows-fr lg:gap-6">
              {left.map((capability, i) => (
                <Reveal as="li" key={capability.id} delay={i} className="h-full">
                  <Node {...capability} title={capability.shortTitle} />
                </Reveal>
              ))}
            </ul>

            <Reveal delay={1} className="order-first lg:order-none">
              <div className="relative mx-auto flex max-w-xs flex-col items-center rounded-3xl bg-gradient-to-b from-ink-700 to-ink-800 px-6 py-8 text-center shadow-xl ring-1 ring-white/15">
                <span aria-hidden="true" className="absolute -inset-3 -z-10 rounded-[2rem] bg-brand-500/10 blur-xl" />
                <LogoMark className="size-12 [&_rect]:fill-white/10" />
                <p className="mt-4 font-semibold text-white">EQTConnect</p>
                <p className="mt-1 text-sm text-white/60">One connected environment</p>
                <div className="mt-5 flex flex-wrap justify-center gap-1.5 font-mono text-[0.625rem] uppercase tracking-[0.1em] text-white/50">
                  <span className="rounded-full bg-white/5 px-2 py-1 ring-1 ring-white/10">Shared records</span>
                  <span className="rounded-full bg-white/5 px-2 py-1 ring-1 ring-white/10">Shared statuses</span>
                </div>
              </div>
            </Reveal>

            <ul className="grid gap-4 lg:auto-rows-fr lg:gap-6">
              {right.map((capability, i) => (
                <Reveal as="li" key={capability.id} delay={i + 1} className="h-full">
                  <Node {...capability} title={capability.shortTitle} />
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
        <p className="mx-auto mt-12 max-w-xl text-center text-xs text-white/45">{workflow.note}</p>
      </Container>
    </Section>
  );
}
