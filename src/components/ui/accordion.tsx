"use client";

import { useId, useState, type ReactNode } from "react";
import { Plus } from "lucide-react";
import { cn } from "@/lib/cn";

export type AccordionItem = { id: string; title: string; content: ReactNode; meta?: ReactNode };

/** WAI-ARIA accordion: buttons in headings, aria-expanded/controls, region panels. */
export function Accordion({ items, defaultOpenId }: { items: AccordionItem[]; defaultOpenId?: string }) {
  const [openIds, setOpenIds] = useState<Set<string>>(() => new Set(defaultOpenId ? [defaultOpenId] : []));
  const baseId = useId();

  function toggle(id: string) {
    setOpenIds((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  return (
    <div className="divide-y divide-line border-y border-line">
      {items.map((item) => {
        const open = openIds.has(item.id);
        const buttonId = `${baseId}-${item.id}-button`;
        const panelId = `${baseId}-${item.id}-panel`;
        return (
          <div key={item.id}>
            <h3>
              <button
                type="button"
                id={buttonId}
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => toggle(item.id)}
                className="group flex w-full items-start justify-between gap-6 py-5 text-left text-base font-medium text-fg transition-colors hover:text-brand-700 sm:text-lg"
              >
                <span>{item.title}</span>
                <span
                  aria-hidden="true"
                  className={cn(
                    "mt-0.5 grid size-7 shrink-0 place-items-center rounded-full ring-1 ring-line-strong transition-[transform,background-color] duration-300 ease-out group-hover:bg-subtle",
                    open && "rotate-45 bg-subtle",
                  )}
                >
                  <Plus className="size-4" />
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              hidden={!open}
              className="pb-6 pr-12 text-fg-muted"
            >
              {item.content}
              {item.meta ? <div className="mt-3">{item.meta}</div> : null}
            </div>
          </div>
        );
      })}
    </div>
  );
}
