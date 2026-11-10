import type { PlanComparisonRow, PricingPlan } from "@/types/content";

/**
 * Three commercial plans requested for the marketing site: Free, Pro and Custom.
 * Feature packaging is based on the documented Platform Overview capabilities.
 * Exact list prices for Pro/Custom were not supplied — those remain contact-led.
 */
export const pricingPlans: PricingPlan[] = [
  {
    id: "free",
    name: "Free",
    audience: "For teams evaluating EQTConnect with a smaller AGM communication workload.",
    price: "Free",
    priceNote: "Get started with core shareholder and digital invitation workflows.",
    highlighted: false,
    features: [
      "Shareholder Data",
      "AGM Operations essentials",
      "Digital (email) communications",
      "Basic operational summaries",
    ],
    cta: { label: "Book a demo", href: "/contact" },
  },
  {
    id: "pro",
    name: "Pro",
    audience: "For teams running full AGM communication cycles across email and physical dispatch.",
    price: "Contact sales",
    priceNote: "Priced for your shareholder base and yearly AGM volume.",
    highlighted: true,
    features: [
      "Shareholder Data",
      "AGM Operations",
      "Digital and Physical Communications",
      "Dispatch Visibility and Rider App",
      "Reporting and Operational Oversight",
    ],
    cta: { label: "Contact sales", href: "/contact" },
  },
  {
    id: "custom",
    name: "Custom",
    audience: "For organizations that need enterprise administration, tailored workflows and dedicated support.",
    price: "Custom",
    priceNote: "Scoped with your team — users, access, operations and delivery model.",
    highlighted: false,
    features: [
      "Everything in Pro",
      "Enterprise Administration and Control",
      "Centralized user and access administration",
      "Tailored operational workflows",
      "Priority walkthrough and onboarding",
    ],
    cta: { label: "Contact sales", href: "/contact" },
  },
];

/** Capability packaging across Free, Pro and Custom. */
export const planComparison: PlanComparisonRow[] = [
  {
    capability: "Shareholder Data",
    values: { free: true, pro: true, custom: true },
  },
  {
    capability: "AGM Operations",
    values: { free: "Essentials", pro: true, custom: true },
  },
  {
    capability: "Digital Communications (email)",
    values: { free: true, pro: true, custom: true },
  },
  {
    capability: "Physical Dispatches (print & post)",
    values: { free: false, pro: true, custom: true },
  },
  {
    capability: "Email and print-and-post from one list",
    values: { free: false, pro: true, custom: true },
  },
  {
    capability: "Dispatch Visibility and Rider App",
    values: { free: false, pro: true, custom: true },
  },
  {
    capability: "Dispatch status tracking",
    values: { free: false, pro: true, custom: true },
  },
  {
    capability: "Reporting and Operational Oversight",
    values: { free: "Basic", pro: true, custom: true },
  },
  {
    capability: "Exception follow-up visibility",
    values: { free: false, pro: true, custom: true },
  },
  {
    capability: "Enterprise Administration and Control",
    values: { free: false, pro: false, custom: true },
  },
  {
    capability: "Centralized user and access administration",
    values: { free: false, pro: false, custom: true },
  },
  {
    capability: "Tailored operational workflows",
    values: { free: false, pro: false, custom: true },
  },
];

/** Only add questions with business-verified commercial answers. Section is hidden while empty. */
export const pricingFaqs: { id: string; question: string; answer: string }[] = [];

export const pricingContent = {
  hero: {
    eyebrow: "Pricing",
    heading: "Plans for teams that coordinate AGM communications.",
    subheading:
      "Choose Free to explore the core workflows, Pro for full AGM communication and dispatch, or Custom when you need enterprise administration and a tailored setup.",
  },
  plansHeading: "Pricing plans",
  comparisonHeading: "Plan comparison",
  comparisonNote:
    "Feature packaging is based on the documented Platform Overview capabilities. Pro and Custom commercial terms are confirmed with your team.",
  cta: {
    heading: "Discuss the right setup for your AGM.",
    subheading: "Tell us about your shareholder base and communication requirements, and we'll walk you through the platform.",
  },
} as const;
