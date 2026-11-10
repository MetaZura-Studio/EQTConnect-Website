import { faqs, resourceCategories, resources, resourcesContent } from "@/content/resources";
import { pageMetadata } from "@/lib/seo";
import { Accordion } from "@/components/ui/accordion";
import { Container, Section } from "@/components/ui/layout";
import { Pending, PendingNote } from "@/components/ui/pending";
import { PageHero } from "@/components/sections/page-hero";
import { CtaBanner } from "@/components/sections/cta-banner";
import { ResourceLibrary } from "@/components/sections/resources/resource-library";

export const metadata = pageMetadata({
  title: "Resources & FAQs",
  description: "EQTConnect platform guides, help articles and frequently asked questions about AGM communications, dispatch tracking and reporting.",
  path: "/resources",
});

export default function ResourcesPage() {
  const { hero, libraryHeading, sampleNotice, faqHeading, faqNotice } = resourcesContent;
  const hasSamples = resources.some((r) => r.sample);
  const hasDraftFaqs = faqs.some((f) => f.draft);

  return (
    <>
      <PageHero eyebrow={hero.eyebrow} heading={hero.heading} subheading={hero.subheading} />

      <Section spacing="none" aria-labelledby="library-heading" className="pb-20 sm:pb-28">
        <Container>
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <h2 id="library-heading" className="text-h3 font-semibold">
              {libraryHeading}
            </h2>
          </div>
          {hasSamples ? (
            <PendingNote title="Sample entries" className="mb-8">
              {sampleNotice}
            </PendingNote>
          ) : null}
          <ResourceLibrary resources={resources} categories={resourceCategories} />
        </Container>
      </Section>

      <Section tone="surface" id="faqs" aria-labelledby="faq-heading" className="border-t border-line">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <h2 id="faq-heading" className="text-h2 font-semibold">
                {faqHeading}
              </h2>
              {hasDraftFaqs ? (
                <div className="mt-6">
                  <Pending>{faqNotice}</Pending>
                </div>
              ) : null}
            </div>
            <div className="lg:col-span-8">
              <Accordion
                defaultOpenId={faqs[0]?.id}
                items={faqs.map((faq) => ({ id: faq.id, title: faq.question, content: <p className="leading-relaxed">{faq.answer}</p> }))}
              />
            </div>
          </div>
        </Container>
      </Section>

      <CtaBanner heading="Have a question we haven't covered?" subheading="Contact the EQTConnect team or book a demo to see the platform." primary={{ label: "Contact us", href: "/contact" }} />
    </>
  );
}
