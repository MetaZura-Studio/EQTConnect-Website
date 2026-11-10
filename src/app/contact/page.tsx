import { Check } from "lucide-react";
import { site } from "@/content/site";
import { capabilities } from "@/content/capabilities";
import { isDeliveryConfigured } from "@/lib/contact/delivery";
import { pageMetadata } from "@/lib/seo";
import { Container, Eyebrow } from "@/components/ui/layout";
import { ContactForm } from "@/components/sections/contact/contact-form";

export const metadata = pageMetadata({
  title: "Book a demo",
  description: "Book an EQTConnect demo or contact the team about AGM management, shareholder communications and dispatch tracking.",
  path: "/contact",
});

const demoTopics = capabilities.filter((c) => c.id !== "agm-operations").map((c) => c.title);

export default function ContactPage() {
  const deliveryConfigured = isDeliveryConfigured();
  const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || undefined;

  const contactRows = [
    { label: "Email", value: site.contact.email, href: site.contact.email ? `mailto:${site.contact.email}` : null },
    { label: "Phone", value: site.contact.phone, href: site.contact.phone ? `tel:${site.contact.phone.replace(/\s/g, "")}` : null },
    { label: "Office", value: site.contact.address, href: null },
  ];

  return (
    <section aria-labelledby="page-heading" className="relative -mt-[var(--header-height)] overflow-hidden pt-[var(--header-height)]">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-50/60 via-canvas to-canvas" />
        <div className="bg-grid mask-radial absolute inset-0 opacity-80" />
      </div>
      <Container className="relative py-14 sm:py-20 lg:py-24">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <Eyebrow className="mb-6">Contact · Book a demo</Eyebrow>
            <h1 id="page-heading" className="text-h1 font-semibold">
              See EQTConnect with your team.
            </h1>
            <p className="mt-6 text-lead text-fg-muted">
              Tell us about your AGM and shareholder communication requirements, and request a walkthrough of the platform.
            </p>

            <div className="mt-12">
              <h2 className="font-mono text-2xs uppercase tracking-[0.14em] text-fg-subtle">What a demo can cover</h2>
              <ul className="mt-5 space-y-3">
                {demoTopics.map((topic) => (
                  <li key={topic} className="flex gap-3 text-fg">
                    <Check aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-signal-600" strokeWidth={2.5} />
                    {topic}
                  </li>
                ))}
              </ul>
            </div>

            {contactRows.some((row) => row.value) ? (
              <div className="mt-12 border-t border-line pt-8">
                <h2 className="font-mono text-2xs uppercase tracking-[0.14em] text-fg-subtle">Other ways to reach us</h2>
                <dl className="mt-5 space-y-4">
                  {contactRows
                    .filter((row) => row.value)
                    .map((row) => (
                      <div key={row.label} className="flex flex-wrap items-center gap-x-4 gap-y-1">
                        <dt className="w-16 text-sm text-fg-subtle">{row.label}</dt>
                        <dd className="text-sm font-medium">
                          {row.href ? (
                            <a href={row.href} className="text-brand-700 hover:underline">
                              {row.value}
                            </a>
                          ) : (
                            row.value
                          )}
                        </dd>
                      </div>
                    ))}
                </dl>
              </div>
            ) : null}
          </div>

          <div className="lg:col-span-7">
            <div className="rounded-3xl bg-surface p-6 shadow-lg ring-1 ring-line sm:p-10">
              <h2 className="text-h3 font-semibold">Request a demo</h2>
              <div className="mt-6">
                <ContactForm deliveryConfigured={deliveryConfigured} turnstileSiteKey={turnstileSiteKey} />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
