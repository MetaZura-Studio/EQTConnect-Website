import { homeContent } from "@/content/home";
import { Container } from "@/components/ui/layout";
import { Pending } from "@/components/ui/pending";

/**
 * Client logo strip. Slots stay as neutral placeholders until approved client logos
 * and usage permissions are supplied — never substitute invented brands.
 */
export function TrustLogos() {
  const { trust } = homeContent;
  return (
    <section aria-labelledby="trust-heading" className="border-y border-line bg-surface py-14 sm:py-16">
      <Container>
        <div className="flex flex-col items-center gap-3 text-center">
          <h2 id="trust-heading" className="text-sm font-medium text-fg-muted">
            {trust.heading}
          </h2>
          <Pending>Client logos pending approval and usage permission</Pending>
        </div>
        <ul className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {Array.from({ length: trust.logoSlots }, (_, i) => (
            <li
              key={i}
              className="flex h-16 items-center justify-center rounded-xl border border-dashed border-line-strong bg-canvas/60"
            >
              <span className="flex items-center gap-2 text-fg-subtle/70">
                <span aria-hidden="true" className="size-4 rounded-[5px] bg-line-strong/80" />
                <span aria-hidden="true" className="h-2 w-14 rounded-full bg-line-strong/80" />
                <span className="sr-only">Reserved client logo slot {i + 1}</span>
              </span>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
