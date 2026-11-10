import type { Resource, ResourceCategory } from "@/types/content";

export type ResourceFilter = { query: string; category: ResourceCategory | "All" };

function normalize(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

/** Filters resources by category and by every whitespace-separated term in the query (title, summary, category). */
export function filterResources(resources: Resource[], { query, category }: ResourceFilter): Resource[] {
  const terms = normalize(query).split(/\s+/).filter(Boolean);
  return resources.filter((resource) => {
    if (category !== "All" && resource.category !== category) return false;
    if (!terms.length) return true;
    const haystack = normalize(`${resource.title} ${resource.summary} ${resource.category}`);
    return terms.every((term) => haystack.includes(term));
  });
}

export function countByCategory(resources: Resource[]): Record<string, number> {
  return resources.reduce<Record<string, number>>((acc, resource) => {
    acc[resource.category] = (acc[resource.category] ?? 0) + 1;
    return acc;
  }, {});
}
