import { pricingContent, pricingFaqs } from "@/content/pricing";
import { pageMetadata } from "@/lib/seo";
import { Accordion } from "@/components/ui/accordion";
import { Container, Section } from "@/components/ui/layout";
import { PageHero } from "@/components/sections/page-hero";
import { CtaBanner } from "@/components/sections/cta-banner";
import { PlanComparison, PricingPlans } from "@/components/sections/pricing/pricing-plans";

export const metadata = pageMetadata({
  title: "Pricing",
  description: "EQTConnect pricing plans and plan comparison. Book a demo to discuss your AGM communication requirements.",
  path: "/pricing",
});

export default function PricingPage() {
  const { hero, plansHeading, comparisonHeading, cta } = pricingContent;
  return (
    <>
      <PageHero
        layout="centered"
        eyebrow={hero.eyebrow}
        heading={hero.heading}
        subheading={hero.subheading}
        primary={{ label: "Book a demo", href: "/contact" }}
      />

      <Section spacing="none" aria-labelledby="plans-heading" className="pb-20 sm:pb-28">
        <Container>
          <h2 id="plans-heading" className="sr-only">
            {plansHeading}
          </h2>
          <PricingPlans />
        </Container>
      </Section>

      <Section tone="surface" aria-labelledby="comparison-heading" className="border-t border-line">
        <Container>
          <h2 id="comparison-heading" className="text-h2 font-semibold">
            {comparisonHeading}
          </h2>
          <div className="mt-10">
            <PlanComparison />
          </div>
        </Container>
      </Section>

      {pricingFaqs.length > 0 ? (
        <Section aria-labelledby="pricing-faq-heading">
          <Container className="max-w-3xl">
            <h2 id="pricing-faq-heading" className="text-h2 font-semibold">
              Pricing questions
            </h2>
            <div className="mt-10">
              <Accordion items={pricingFaqs.map((faq) => ({ id: faq.id, title: faq.question, content: <p>{faq.answer}</p> }))} />
            </div>
          </Container>
        </Section>
      ) : null}

      <CtaBanner
        heading={cta.heading}
        subheading={cta.subheading}
        primary={{ label: "Book a demo", href: "/contact" }}
        secondary={{ label: "Explore the platform", href: "/platform" }}
      />
    </>
  );
}
