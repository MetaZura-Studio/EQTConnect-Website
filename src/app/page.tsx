import { homeContent } from "@/content/home";
import { pageMetadata } from "@/lib/seo";
import { HomeHero } from "@/components/sections/home/home-hero";
import { TrustLogos } from "@/components/sections/home/trust-logos";
import { ProblemSection } from "@/components/sections/home/problem";
import { PlatformPillars } from "@/components/sections/home/platform-pillars";
import { ConnectedWorkflow } from "@/components/sections/home/connected-workflow";
import { CtaBanner } from "@/components/sections/cta-banner";

export const metadata = pageMetadata({
  title: "AGM management and shareholder communications platform",
  description:
    "Run every AGM from one connected platform. Manage shareholder data, coordinate AGM invitations, track physical dispatches and oversee communications with EQTConnect.",
  path: "/",
});

export default function HomePage() {
  const { cta } = homeContent;
  return (
    <>
      <HomeHero />
      <TrustLogos />
      <ProblemSection />
      <PlatformPillars />
      <ConnectedWorkflow />
      <CtaBanner heading={cta.heading} subheading={cta.subheading} primary={cta.primaryCta} secondary={cta.secondaryCta} />
    </>
  );
}
