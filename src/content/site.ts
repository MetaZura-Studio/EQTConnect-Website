import type { NavItem } from "@/types/content";

/**
 * Site-wide configuration. Values set to `null` are unconfirmed business facts:
 * components render a visible "pending" marker instead of inventing them.
 */
export const site = {
  name: "EQTConnect",
  tagline: "AGM management and shareholder communications platform",
  description:
    "EQTConnect brings shareholder data, AGM invitations, digital and physical communications, dispatch tracking and reporting together in one connected platform.",
  /** Set NEXT_PUBLIC_SITE_URL in the deployment environment; used for canonical URLs, sitemap and OG. */
  url: process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? null,
  locale: "en",
  contact: {
    email: null as string | null,
    phone: null as string | null,
    address: null as string | null,
  },
  legal: {
    companyName: null as string | null,
    privacyPolicyHref: null as string | null,
    termsHref: null as string | null,
  },
} as const;

export const mainNav: NavItem[] = [
  { label: "Platform", href: "/platform" },
  { label: "Pricing", href: "/pricing" },
  { label: "Resources", href: "/resources" },
  { label: "About", href: "/about" },
];

export const primaryCta = { label: "Book a demo", href: "/contact" } as const;

export const footerNav: { title: string; items: NavItem[] }[] = [
  {
    title: "Platform",
    items: [
      { label: "Platform overview", href: "/platform" },
      { label: "Shareholder data", href: "/platform#shareholder-data" },
      { label: "Communications", href: "/platform#communications" },
      { label: "Dispatch & rider app", href: "/platform#dispatch" },
      { label: "Reporting", href: "/platform#reporting" },
      { label: "AGM workflow", href: "/platform#agm-workflow" },
    ],
  },
  {
    title: "Explore",
    items: [
      { label: "Pricing", href: "/pricing" },
      { label: "Resources", href: "/resources" },
      { label: "FAQs", href: "/resources#faqs" },
    ],
  },
  {
    title: "Company",
    items: [
      { label: "About us", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "Book a demo", href: "/contact" },
    ],
  },
];
