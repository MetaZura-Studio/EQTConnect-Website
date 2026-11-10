import { Check, ImageIcon, UserRound, X } from "lucide-react";
import { aboutContent } from "@/content/about";
import { capabilities } from "@/content/capabilities";
import { pageMetadata } from "@/lib/seo";
import { capabilityIcons } from "@/components/capability-icons";
import { Container, Eyebrow, Section } from "@/components/ui/layout";
import { Pending, PendingNote } from "@/components/ui/pending";
import { Reveal } from "@/components/ui/reveal";
import { PageHero } from "@/components/sections/page-hero";
import { CtaBanner } from "@/components/sections/cta-banner";

export const metadata = pageMetadata({
  title: "About us",
  description:
    "EQTConnect is a centralized platform that helps organizations coordinate shareholder data, AGM communications, physical dispatches and reporting.",
  path: "/about",
});

export default function AboutPage() {
  const { hero, mission, whatWeDo, whyPlatform, reserved } = aboutContent;
  return (
    <>
      <PageHero eyebrow={hero.eyebrow} heading={hero.heading} subheading={hero.subheading}>
        {hero.provisional ? (
          <div className="mt-8">
            <Pending>Provisional copy based on the platform description — pending approval</Pending>
          </div>
        ) : null}
      </PageHero>

      <Section tone="surface" aria-labelledby="mission-heading" className="border-y border-line">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12">
            <Reveal className="lg:col-span-4">
              <Eyebrow>{mission.heading}</Eyebrow>
              <h2 id="mission-heading" className="sr-only">
                {mission.heading}
              </h2>
            </Reveal>
            <Reveal delay={1} className="lg:col-span-8">
              {mission.statement ? (
                <blockquote className="text-h2 font-semibold">{mission.statement}</blockquote>
              ) : (
                <>
                  <PendingNote title="Official mission statement pending">
                    Supply an approved mission statement to replace this note.
                  </PendingNote>
                  <p className="mt-10 text-h3 font-medium leading-snug text-fg">{mission.context}</p>
                  <p className="mt-4 text-sm text-fg-subtle">Provisional context drawn from the documented platform purpose.</p>
                </>
              )}
            </Reveal>
          </div>
        </Container>
      </Section>

      <Section aria-labelledby="what-heading">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12">
            <Reveal className="lg:col-span-4">
              <Eyebrow className="mb-5">{whatWeDo.heading}</Eyebrow>
              <h2 id="what-heading" className="text-h2 font-semibold">
                {whatWeDo.subheading}
              </h2>
            </Reveal>
            <ol className="grid gap-x-10 sm:grid-cols-2 lg:col-span-8">
              {capabilities.map((capability, i) => {
                const Icon = capabilityIcons[capability.id];
                return (
                  <Reveal as="li" key={capability.id} delay={i % 2} className="flex gap-4 border-t border-line py-7">
                    <Icon aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-brand-600" strokeWidth={1.75} />
                    <div>
                      <h3 className="font-semibold tracking-tight">{capability.title}</h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-fg-muted">{capability.summary}</p>
                    </div>
                  </Reveal>
                );
              })}
            </ol>
          </div>
        </Container>
      </Section>

      <Section tone="dark" aria-labelledby="why-heading" className="overflow-hidden">
        <div aria-hidden="true" className="bg-grid-dark mask-radial pointer-events-none absolute inset-0" />
        <Container className="relative">
          <Reveal className="max-w-3xl">
            <Eyebrow dark className="mb-5">
              {whyPlatform.eyebrow}
            </Eyebrow>
            <h2 id="why-heading" className="text-h2 font-semibold text-white">
              {whyPlatform.heading}
            </h2>
            <div className="mt-6 space-y-4 text-lead text-white/70">
              {whyPlatform.paragraphs.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </div>
          </Reveal>
          <div className="mt-14 grid gap-4 md:grid-cols-2">
            <Reveal className="rounded-2xl bg-white/[0.03] p-7 ring-1 ring-white/10 sm:p-8">
              <h3 className="font-mono text-2xs uppercase tracking-[0.14em] text-white/50">Fragmented process</h3>
              <ul className="mt-6 space-y-4">
                {whyPlatform.before.map((item) => (
                  <li key={item} className="flex gap-3 text-white/70">
                    <X aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-danger-600" strokeWidth={2.5} />
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={1} className="rounded-2xl bg-gradient-to-br from-brand-600/25 to-signal-600/10 p-7 ring-1 ring-brand-400/30 sm:p-8">
              <h3 className="font-mono text-2xs uppercase tracking-[0.14em] text-signal-300">With EQTConnect</h3>
              <ul className="mt-6 space-y-4">
                {whyPlatform.after.map((item) => (
                  <li key={item} className="flex gap-3 text-white">
                    <Check aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-signal-300" strokeWidth={2.5} />
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </Container>
      </Section>

      <Section aria-labelledby="story-heading">
        <Container>
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-xl">
              <h2 id="story-heading" className="text-h2 font-semibold">
                {reserved.heading}
              </h2>
              <p className="mt-4 text-fg-muted">{reserved.description}</p>
            </div>
            <Pending>Awaiting approved content and photography</Pending>
          </div>
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            <div className="flex aspect-[4/3] flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-line-strong bg-surface text-fg-subtle md:col-span-2 md:aspect-auto md:min-h-80">
              <ImageIcon aria-hidden="true" className="size-6" strokeWidth={1.5} />
              <span className="text-sm">Company photography</span>
            </div>
            <ul className="grid gap-4">
              {["Leadership", "Team"].map((label) => (
                <li
                  key={label}
                  className="flex min-h-36 flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-line-strong bg-surface text-fg-subtle"
                >
                  <UserRound aria-hidden="true" className="size-6" strokeWidth={1.5} />
                  <span className="text-sm">{label} profiles</span>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      <CtaBanner heading="Talk to the EQTConnect team." subheading="Book a demo to see how the platform supports your AGM communications." />
    </>
  );
}
