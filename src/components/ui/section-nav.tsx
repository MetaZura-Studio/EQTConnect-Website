"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

type SectionNavItem = { id: string; label: string };

/** Sticky in-page navigation with scroll-spy. Plain anchor links work without JS. */
export function SectionNav({ items, label }: { items: SectionNavItem[]; label: string }) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const targets = items.map((item) => document.getElementById(item.id)).filter((el): el is HTMLElement => Boolean(el));
    if (!targets.length || !("IntersectionObserver" in window)) return;
    const visible = new Map<string, number>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.set(entry.target.id, entry.boundingClientRect.top);
          else visible.delete(entry.target.id);
        }
        const first = items.find((item) => visible.has(item.id));
        setActive(first?.id ?? null);
      },
      { rootMargin: "-30% 0px -55% 0px" },
    );
    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, [items]);

  return (
    <nav
      aria-label={label}
      className="sticky top-[var(--header-height)] z-30 border-y border-line bg-surface/90 backdrop-blur-xl backdrop-saturate-150"
    >
      <div className="scrollbar-none mx-auto flex max-w-[76rem] gap-1 overflow-x-auto px-5 py-2 sm:px-8">
        {items.map((item) => {
          const isActive = active === item.id;
          return (
            <a
              key={item.id}
              href={`#${item.id}`}
              aria-current={isActive ? "location" : undefined}
              className={cn(
                "inline-flex min-h-9 shrink-0 items-center whitespace-nowrap rounded-full px-3.5 text-sm font-medium transition-colors",
                isActive ? "bg-brand-800 text-white" : "text-fg-muted hover:bg-subtle hover:text-fg",
              )}
            >
              {item.label}
            </a>
          );
        })}
      </div>
    </nav>
  );
}
