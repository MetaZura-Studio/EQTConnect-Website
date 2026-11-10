import type { Metadata } from "next";
import { site } from "@/content/site";

type PageMeta = {
  title: string;
  description: string;
  path: `/${string}`;
};

/** Builds per-page metadata. Canonical and absolute OG URLs are emitted only when the site URL is configured. */
export function pageMetadata({ title, description, path }: PageMeta): Metadata {
  const fullTitle = path === "/" ? `${site.name} — ${title}` : `${title} · ${site.name}`;
  return {
    title: { absolute: fullTitle },
    description,
    alternates: site.url ? { canonical: path } : undefined,
    openGraph: {
      type: "website",
      siteName: site.name,
      title: fullTitle,
      description,
      url: site.url ? path : undefined,
      locale: "en",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
    },
  };
}

export const routes = ["/", "/platform", "/pricing", "/about", "/contact", "/resources"] as const;
