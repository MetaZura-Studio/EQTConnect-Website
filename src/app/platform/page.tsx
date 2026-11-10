import { capabilities } from "@/content/capabilities";
import { platformContent } from "@/content/platform";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/sections/page-hero";
import { SectionNav } from "@/components/ui/section-nav";
import { CtaBanner } from "@/components/sections/cta-banner";
import { PlatformModulesMock } from "@/components/mockups/platform-modules";
import {
  AdministrationSection,
  AgmOperationsSection,
  CommunicationsSection,
  DispatchSection,
  PlatformGlance,
  ReportingSection,
  ShareholderDataSection,
  WorkflowSection,
} from "@/components/sections/platform/platform-sections";

export const metadata = pageMetadata({
  title: "Platform overview",
  description:
    "Explore EQTConnect's capabilities — shareholder data, AGM operations, digital and physical communications, dispatch visibility with the rider app, reporting and enterprise administration — and how they support your AGM workflow.",
  path: "/platform",
});

export default function PlatformPage() {
  const { hero, workflow, cta } = platformContent;
  const sectionNavItems = [...capabilities.map((c) => ({ id: c.id, label: c.shortTitle })), { id: workflow.id, label: workflow.navLabel }];
  return (
    <>
      <PageHero
        layout="split"
        eyebrow={hero.eyebrow}
        heading={hero.heading}
        subheading={hero.subheading}
        primary={hero.primaryCta}
        secondary={hero.secondaryCta}
        visual={<PlatformModulesMock />}
      />
      <PlatformGlance />
      <SectionNav label="Platform capabilities" items={sectionNavItems} />
      <ShareholderDataSection />
      <AgmOperationsSection />
      <CommunicationsSection />
      <DispatchSection />
      <ReportingSection />
      <AdministrationSection />
      <WorkflowSection />
      <CtaBanner
        heading={cta.heading}
        subheading={cta.subheading}
        primary={{ label: "Book a demo", href: "/contact" }}
        secondary={{ label: "See pricing", href: "/pricing" }}
      />
    </>
  );
}
