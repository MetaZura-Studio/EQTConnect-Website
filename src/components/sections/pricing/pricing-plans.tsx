import { Check, Minus } from "lucide-react";
import type { PlanEntitlement, PricingPlan } from "@/types/content";
import { planComparison, pricingContent, pricingPlans } from "@/content/pricing";
import { cn } from "@/lib/cn";
import { ButtonLink } from "@/components/ui/button";
import { Pending } from "@/components/ui/pending";
import { Reveal } from "@/components/ui/reveal";

const gridCols: Record<number, string> = {
  1: "md:grid-cols-1 max-w-xl mx-auto",
  2: "md:grid-cols-2 max-w-4xl mx-auto",
  3: "md:grid-cols-3",
  4: "md:grid-cols-2 xl:grid-cols-4",
};

function planLabel(plan: PricingPlan, index: number) {
  return plan.name ?? `Plan ${String.fromCharCode(65 + index)}`;
}

export function PricingPlans() {
  return (
    <ul className={cn("grid gap-5", gridCols[pricingPlans.length] ?? "md:grid-cols-3")}>
      {pricingPlans.map((plan, index) => (
        <Reveal
          as="li"
          key={plan.id}
          delay={index}
          className={cn(
            "flex flex-col rounded-2xl bg-surface p-7 shadow-sm ring-1 sm:p-8",
            plan.highlighted ? "ring-2 ring-brand-800 shadow-lg" : "ring-line",
          )}
        >
          <div className="flex items-start justify-between gap-3">
            <h3 className="text-lg font-semibold tracking-tight">{planLabel(plan, index)}</h3>
            <span className="font-mono text-2xs text-fg-subtle">0{index + 1}</span>
          </div>
          <div className="mt-2 min-h-6">
            {plan.name ? null : <Pending>Plan name to be confirmed</Pending>}
          </div>
          <p className="mt-3 text-sm text-fg-muted">{plan.audience ?? "Intended audience to be confirmed."}</p>

          <div className="mt-8 border-t border-line pt-6">
            <p className="text-2xs font-medium uppercase tracking-[0.12em] text-fg-subtle">Price</p>
            {plan.price ? (
              <p className="tabular mt-2 text-3xl font-semibold tracking-tight">{plan.price}</p>
            ) : (
              <div className="mt-3">
                <Pending>Pricing to be confirmed</Pending>
              </div>
            )}
            {plan.priceNote ? <p className="mt-1 text-sm text-fg-subtle">{plan.priceNote}</p> : null}
          </div>

          <div className="mt-6 flex-1">
            <p className="text-2xs font-medium uppercase tracking-[0.12em] text-fg-subtle">Included</p>
            {plan.features.length > 0 ? (
              <ul className="mt-3 space-y-2.5">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex gap-2.5 text-sm leading-relaxed text-fg-muted">
                    <Check aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-signal-600" strokeWidth={2.5} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="mt-3">
                <Pending>Entitlements pending confirmation</Pending>
              </div>
            )}
          </div>

          <ButtonLink href={plan.cta.href} variant={plan.highlighted ? "primary" : "secondary"} className="mt-8 w-full" withArrow>
            {plan.cta.label}
          </ButtonLink>
        </Reveal>
      ))}
    </ul>
  );
}

function EntitlementCell({ value }: { value: PlanEntitlement }) {
  if (value === null) {
    return (
      <span className="inline-flex items-center rounded-md border border-dashed border-pending-300 bg-pending-50 px-1.5 py-0.5 font-mono text-[0.625rem] font-semibold text-pending-800">
        TBC<span className="sr-only"> — to be confirmed</span>
      </span>
    );
  }
  if (value === true) return <Check aria-label="Included" className="mx-auto size-4 text-signal-600" strokeWidth={2.5} />;
  if (value === false) return <Minus aria-label="Not included" className="mx-auto size-4 text-fg-subtle" />;
  return <span className="text-sm text-fg">{value}</span>;
}

export function PlanComparison() {
  return (
    <div>
      <div
        role="region"
        aria-labelledby="comparison-heading"
        tabIndex={0}
        className="relative overflow-x-auto rounded-2xl bg-surface ring-1 ring-line"
      >
        <table className="w-full min-w-[28rem] border-collapse text-left">
          <caption className="sr-only">
            Plan comparison by documented EQTConnect platform capabilities. Included items are marked with a check.
          </caption>
          <thead>
            <tr className="border-b border-line">
              <th scope="col" className="sticky left-0 bg-surface px-6 py-5 text-sm font-semibold">
                Capability
              </th>
              {pricingPlans.map((plan, index) => (
                <th key={plan.id} scope="col" className="px-4 py-5 text-center text-sm font-semibold">
                  {planLabel(plan, index)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {planComparison.map((row) => (
              <tr key={row.capability} className="transition-colors hover:bg-canvas/70">
                <th scope="row" className="sticky left-0 bg-inherit px-6 py-4 text-sm font-medium text-fg">
                  {row.capability}
                </th>
                {pricingPlans.map((plan) => (
                  <td key={plan.id} className="px-4 py-4 text-center">
                    <EntitlementCell value={row.values[plan.id] ?? null} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-4 text-sm text-fg-subtle">{pricingContent.comparisonNote}</p>
    </div>
  );
}
