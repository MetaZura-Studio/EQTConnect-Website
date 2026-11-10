"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Menu, X } from "lucide-react";
import { mainNav, primaryCta } from "@/content/site";
import { cn } from "@/lib/cn";
import { isActivePath } from "@/lib/navigation";
import { ButtonLink } from "@/components/ui/button";

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function MobileNav({ pathname }: { pathname: string | null }) {
  const [open, setOpen] = useState(false);
  const [lastPath, setLastPath] = useState(pathname);
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  if (pathname !== lastPath) {
    setLastPath(pathname);
    if (open) setOpen(false);
  }

  const close = useCallback(() => {
    setOpen(false);
    toggleRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panel?.querySelector<HTMLElement>(FOCUSABLE)?.focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        close();
        return;
      }
      if (event.key !== "Tab" || !panel) return;
      const focusables = [toggleRef.current, ...panel.querySelectorAll<HTMLElement>(FOCUSABLE)].filter(
        (el): el is HTMLElement => Boolean(el),
      );
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (!first || !last) return;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    const media = window.matchMedia("(min-width: 64rem)");
    const onMedia = (e: MediaQueryListEvent) => e.matches && setOpen(false);

    document.addEventListener("keydown", onKeyDown);
    media.addEventListener("change", onMedia);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
      media.removeEventListener("change", onMedia);
    };
  }, [open, close]);

  const items = [...mainNav, { label: "Contact", href: "/contact" }];

  return (
    <div className="lg:hidden">
      <button
        ref={toggleRef}
        type="button"
        aria-expanded={open}
        aria-controls={open ? "mobile-navigation" : undefined}
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((value) => !value)}
        className="relative z-[60] -mr-2 grid size-11 place-items-center rounded-full text-fg transition-colors hover:bg-subtle"
      >
        {open ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
      </button>

      {open
        ? createPortal(
      <div
        id="mobile-navigation"
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Site navigation"
        className="fixed inset-x-0 bottom-0 top-[var(--header-height)] z-40 overflow-y-auto border-t border-line bg-surface lg:hidden"
      >
        <nav aria-label="Mobile" className="px-5 pb-10 pt-4 sm:px-8">
          <ul className="divide-y divide-line">
            {items.map((item) => {
              const active = isActivePath(pathname, item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "flex min-h-14 items-center justify-between text-lg font-medium",
                      active ? "text-brand-700" : "text-fg",
                    )}
                  >
                    {item.label}
                    {active ? <span aria-hidden="true" className="size-1.5 rounded-full bg-brand-600" /> : null}
                  </Link>
                </li>
              );
            })}
          </ul>
          <ButtonLink href={primaryCta.href} size="lg" withArrow className="mt-8 w-full" onClick={() => setOpen(false)}>
            {primaryCta.label}
          </ButtonLink>
        </nav>
      </div>,
            document.body,
          )
        : null}
    </div>
  );
}
