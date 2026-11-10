import { homeContent } from "@/content/home";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/layout";
import { HeroDashboard } from "@/components/mockups/hero-dashboard";

export function HomeHero() {
  const { hero } = homeContent;
  return (
    <section aria-labelledby="hero-heading" className="relative -mt-[var(--header-height)] overflow-hidden pt-[var(--header-height)]">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-50/70 via-canvas to-canvas" />
        <div className="bg-grid mask-radial absolute inset-0" />
        <div className="absolute left-1/2 top-[52%] h-[34rem] w-[min(70rem,120%)] -translate-x-1/2 rounded-[50%] bg-brand-200/35 blur-3xl" />
      </div>

      <Container className="relative pb-24 pt-14 sm:pt-20 lg:pb-32 lg:pt-24">
        <div className="max-w-4xl">
          <p className="inline-flex animate-rise items-center gap-2 rounded-full bg-surface/80 py-1 pl-1.5 pr-3.5 text-xs font-medium text-fg-muted shadow-xs ring-1 ring-line backdrop-blur">
            <span className="rounded-full bg-ink-900 px-2 py-0.5 font-mono text-[0.625rem] uppercase tracking-[0.12em] text-white">EQTConnect</span>
            {hero.eyebrow}
          </p>
          <h1 id="hero-heading" className="mt-7 text-display font-semibold text-fg">
            {hero.heading}
          </h1>
          <p className="mt-7 max-w-2xl animate-rise text-lead text-fg-muted [animation-delay:120ms]">{hero.subheading}</p>
          <div className="mt-9 flex animate-rise flex-col gap-3 [animation-delay:200ms] xs:flex-row">
            <ButtonLink href={hero.primaryCta.href} size="lg" withArrow>
              {hero.primaryCta.label}
            </ButtonLink>
            <ButtonLink href={hero.secondaryCta.href} size="lg" variant="secondary">
              {hero.secondaryCta.label}
            </ButtonLink>
          </div>
        </div>

        <div className="relative mt-16 animate-rise [animation-delay:320ms] sm:mt-20">
          <div className="rounded-[1.375rem] bg-surface/50 p-1.5 shadow-[0_0_0_1px_rgb(10_22_40/0.05)] backdrop-blur-sm sm:p-2">
            <HeroDashboard />
          </div>
          <p className="mt-5 text-center text-2xs text-fg-subtle">
            Illustrative product concept with fictional sample data — not a screenshot of the live product.
          </p>
        </div>
      </Container>
    </section>
  );
}
