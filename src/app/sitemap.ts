import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { routes } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  // Absolute URLs are required; the sitemap stays empty until NEXT_PUBLIC_SITE_URL is configured.
  if (!site.url) return [];
  return routes.map((path) => ({
    url: `${site.url}${path === "/" ? "" : path}`,
    changeFrequency: "monthly",
    priority: path === "/" ? 1 : path === "/platform" || path === "/contact" ? 0.8 : 0.6,
  }));
}
