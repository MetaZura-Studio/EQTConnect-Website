import type { ReactNode } from "react";
import type { NavItem } from "@/types/content";
import { cn } from "@/lib/cn";
import { ButtonLink } from "@/components/ui/button";
import { Container, Eyebrow } from "@/components/ui/layout";

type PageHeroProps = {
  eyebrow: string;
  heading: string;
  subheading: string;
  primary?: NavItem;
  secondary?: NavItem;
  /** Optional visual rendered beside (split) or below (stacked) the copy. */
  visual?: ReactNode;
  layout?: "split" | "stacked" | "centered";
  children?: ReactNode;
};

export function PageHero({ eyebrow, heading, subheading, primary, secondary, visual, layout = "stacked", children }: PageHeroProps) {
  const centered = layout === "centered";
  return (
    <section aria-labelledby="page-heading" className="relative -mt-[var(--header-height)] overflow-hidden pt-[var(--header-height)]">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-50/60 via-canvas to-canvas" />
        <div className="bg-grid mask-radial absolute inset-0 opacity-80" />
      </div>
      <Container className={cn("relative pb-16 pt-14 sm:pb-20 sm:pt-20 lg:pt-24", visual && layout === "split" && "lg:pb-24")}>
        <div className={cn(layout === "split" && visual ? "grid items-center gap-14 lg:grid-cols-12 lg:gap-10" : "")}>
          <div className={cn(layout === "split" ? "lg:col-span-6" : "max-w-3xl", centered && "mx-auto text-center")}>
            <Eyebrow className="mb-6 animate-rise">{eyebrow}</Eyebrow>
            <h1 id="page-heading" className="text-h1 font-semibold">
              {heading}
            </h1>
            <p className="mt-6 max-w-2xl animate-rise text-lead text-fg-muted [animation-delay:100ms]">{subheading}</p>
            {primary || secondary ? (
              <div className={cn("mt-9 flex animate-rise flex-col gap-3 [animation-delay:180ms] xs:flex-row", centered && "justify-center")}>
                {primary ? (
                  <ButtonLink href={primary.href} size="lg" withArrow>
                    {primary.label}
                  </ButtonLink>
                ) : null}
                {secondary ? (
                  <ButtonLink href={secondary.href} size="lg" variant="secondary">
                    {secondary.label}
                  </ButtonLink>
                ) : null}
              </div>
            ) : null}
            {children}
          </div>
          {visual ? (
            <div className={cn("animate-rise [animation-delay:260ms]", layout === "split" ? "lg:col-span-6" : "mt-14")}>{visual}</div>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
