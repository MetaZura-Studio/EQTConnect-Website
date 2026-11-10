import type { NavItem } from "@/types/content";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/layout";
import { Reveal } from "@/components/ui/reveal";

type CtaBannerProps = {
  heading: string;
  subheading?: string;
  primary?: NavItem;
  secondary?: NavItem;
};

export function CtaBanner({
  heading,
  subheading,
  primary = { label: "Book a demo", href: "/contact" },
  secondary = { label: "Explore the platform", href: "/platform" },
}: CtaBannerProps) {
  return (
    <section aria-label="Get started" className="bg-canvas py-20 sm:py-28">
      <Container>
        <Reveal className="dark-surface relative isolate overflow-hidden rounded-3xl bg-ink-900 px-6 py-16 text-white sm:px-12 sm:py-20 lg:px-20">
          <div aria-hidden="true" className="bg-grid-dark absolute inset-0 -z-10 [mask-image:linear-gradient(to_left,black,transparent_75%)]" />
          <svg aria-hidden="true" viewBox="0 0 600 400" className="absolute -right-24 top-1/2 -z-10 hidden h-[130%] -translate-y-1/2 opacity-80 md:block">
            <g fill="none" strokeWidth="1.25">
              <path d="M40 320 C 220 320, 220 120, 400 120 S 560 200, 600 200" className="stroke-brand-400/50" />
              <path d="M40 260 C 200 260, 240 60, 420 60" className="stroke-signal-400/40" />
              <path d="M40 360 C 260 360, 300 220, 600 260" className="stroke-white/15" />
            </g>
            <circle cx="400" cy="120" r="5" className="fill-brand-400" />
            <circle cx="420" cy="60" r="4" className="fill-signal-400" />
            <circle cx="400" cy="120" r="14" className="fill-brand-400/15" />
          </svg>
          <div className="max-w-2xl">
            <h2 className="text-h2 font-semibold text-white">{heading}</h2>
            {subheading ? <p className="mt-5 text-lead text-white/70">{subheading}</p> : null}
            <div className="mt-9 flex flex-col gap-3 xs:flex-row">
              <ButtonLink href={primary.href} variant="inverse" size="lg" withArrow>
                {primary.label}
              </ButtonLink>
              <ButtonLink href={secondary.href} variant="inverse-outline" size="lg">
                {secondary.label}
              </ButtonLink>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
