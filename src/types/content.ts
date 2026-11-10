export type NavItem = {
  label: string;
  href: string;
};

export type CapabilityId = "shareholder-data" | "agm-operations" | "communications" | "dispatch" | "reporting" | "administration";

export type Capability = {
  id: CapabilityId;
  index: string;
  title: string;
  shortTitle: string;
  summary: string;
};

export type Benefit = {
  title: string;
  description?: string;
};

export type StatusTone = "neutral" | "info" | "success" | "warning" | "danger" | "signal";

export type ResourceCategory = "AGM explainers" | "Platform guides" | "Help articles" | "Downloads";

export type Resource = {
  id: string;
  title: string;
  summary: string;
  category: ResourceCategory;
  /** Published resources must provide an href; unpublished entries render as non-interactive. */
  href: string | null;
  sample: boolean;
};

export type Faq = {
  id: string;
  question: string;
  answer: string;
  /** Answers derived from the platform document but awaiting business sign-off. */
  draft: boolean;
};

export type PricingPlan = {
  id: string;
  name: string | null;
  audience: string | null;
  price: string | null;
  priceNote: string | null;
  /** Documented inclusions for this plan. Empty while commercial packaging is unconfirmed. */
  features: string[];
  highlighted: boolean;
  cta: NavItem;
};

export type PlanEntitlement = string | boolean | null;

export type PlanComparisonRow = {
  capability: string;
  values: Record<string, PlanEntitlement>;
};
