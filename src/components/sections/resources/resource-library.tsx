"use client";

import Link from "next/link";
import { useId, useMemo, useState } from "react";
import { ArrowUpRight, BookOpen, Download, FileText, LifeBuoy, Search, SearchX } from "lucide-react";
import type { Resource, ResourceCategory } from "@/types/content";
import { countByCategory, filterResources } from "@/lib/resources";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/button";

const categoryIcons: Record<ResourceCategory, typeof FileText> = {
  "AGM explainers": BookOpen,
  "Platform guides": FileText,
  "Help articles": LifeBuoy,
  Downloads: Download,
};

function ResourceCard({ resource }: { resource: Resource }) {
  const Icon = categoryIcons[resource.category];
  const body = (
    <>
      <div className="flex items-center justify-between gap-3">
        <span className="inline-flex items-center gap-2 text-xs font-medium text-fg-muted">
          <Icon aria-hidden="true" className="size-4 text-brand-600" strokeWidth={1.75} />
          {resource.category}
        </span>
        {resource.sample ? (
          <span className="rounded-md border border-dashed border-pending-300 bg-pending-50 px-1.5 py-0.5 text-[0.625rem] font-semibold uppercase tracking-[0.08em] text-pending-800">
            Sample · not published
          </span>
        ) : null}
      </div>
      <h3 className="mt-6 text-lg font-semibold tracking-tight">{resource.title}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-fg-muted">{resource.summary}</p>
      {resource.href ? (
        <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-brand-700">
          Read <ArrowUpRight aria-hidden="true" className="size-3.5" />
        </span>
      ) : (
        <span className="mt-6 text-sm text-fg-subtle">Coming soon</span>
      )}
    </>
  );

  const classes = "flex h-full flex-col rounded-2xl bg-surface p-6 ring-1 ring-line";
  return resource.href ? (
    <Link href={resource.href} className={cn(classes, "transition-shadow hover:shadow-lg")}>
      {body}
    </Link>
  ) : (
    <article className={classes}>{body}</article>
  );
}

export function ResourceLibrary({ resources, categories }: { resources: Resource[]; categories: ResourceCategory[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<ResourceCategory | "All">("All");
  const searchId = useId();
  const counts = useMemo(() => countByCategory(resources), [resources]);
  const results = useMemo(() => filterResources(resources, { query, category }), [resources, query, category]);

  return (
    <div>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div role="group" aria-label="Filter by category" className="scrollbar-none -mx-5 flex gap-2 overflow-x-auto px-5 sm:mx-0 sm:flex-wrap sm:px-0">
          {(["All", ...categories] as const).map((item) => {
            const count = item === "All" ? resources.length : (counts[item] ?? 0);
            const active = category === item;
            return (
              <button
                key={item}
                type="button"
                aria-pressed={active}
                onClick={() => setCategory(item)}
                className={cn(
                  "inline-flex min-h-10 shrink-0 items-center gap-2 rounded-full px-4 text-sm font-medium ring-1 transition-colors",
                  active ? "bg-brand-800 text-white ring-brand-800" : "bg-surface text-fg-muted ring-line hover:text-fg hover:ring-line-strong",
                )}
              >
                {item}
                <span className={cn("tabular text-xs", active ? "text-white/60" : "text-fg-subtle")}>{count}</span>
              </button>
            );
          })}
        </div>
        <div className="relative w-full lg:w-80">
          <label htmlFor={searchId} className="sr-only">
            Search resources
          </label>
          <Search aria-hidden="true" className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-fg-subtle" />
          <input
            id={searchId}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search resources"
            className="h-11 w-full rounded-full bg-surface pl-10 pr-4 text-sm shadow-xs ring-1 ring-inset ring-line-strong placeholder:text-fg-subtle focus:outline-none focus:ring-2 focus:ring-brand-600"
          />
        </div>
      </div>

      <p className="sr-only" role="status" aria-live="polite">
        {results.length} {results.length === 1 ? "resource" : "resources"} shown
      </p>

      {results.length ? (
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((resource) => (
            <li key={resource.id}>
              <ResourceCard resource={resource} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="mt-8 flex flex-col items-center rounded-2xl border border-dashed border-line-strong bg-surface px-6 py-16 text-center">
          <SearchX aria-hidden="true" className="size-8 text-fg-subtle" strokeWidth={1.5} />
          <h3 className="mt-4 font-semibold">No resources match your search</h3>
          <p className="mt-1 text-sm text-fg-muted">Try a different term or category.</p>
          <Button
            variant="secondary"
            size="sm"
            className="mt-6"
            onClick={() => {
              setQuery("");
              setCategory("All");
            }}
          >
            Clear filters
          </Button>
        </div>
      )}
    </div>
  );
}
