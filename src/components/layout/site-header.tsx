"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { mainNav, primaryCta } from "@/content/site";
import { cn } from "@/lib/cn";
import { isActivePath } from "@/lib/navigation";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/layout";
import { Logo } from "@/components/layout/logo";
import { MobileNav } from "@/components/layout/mobile-nav";

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 h-[var(--header-height)] border-b transition-[background-color,border-color,box-shadow] duration-300",
        scrolled
          ? "border-line/80 bg-surface/92 shadow-[0_1px_0_rgb(10_22_40/0.02),0_8px_24px_-16px_rgb(10_22_40/0.18)] backdrop-blur-xl backdrop-saturate-150"
          : "border-transparent bg-canvas/0",
      )}
    >
      <Container className="flex h-full items-center justify-between gap-6">
        <Link href="/" aria-label="EQTConnect home" className="-m-1 rounded-lg p-1">
          <Logo />
        </Link>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {mainNav.map((item) => {
              const active = isActivePath(pathname, item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "relative rounded-full px-3.5 py-2 text-sm font-medium transition-colors",
                      active ? "text-fg" : "text-fg-muted hover:text-fg",
                    )}
                  >
                    {item.label}
                    <span
                      aria-hidden="true"
                      className={cn(
                        "absolute inset-x-3.5 -bottom-[1px] h-px origin-center bg-brand-800 transition-transform duration-300 ease-out",
                        active ? "scale-x-100" : "scale-x-0",
                      )}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/contact"
            aria-current={pathname === "/contact" ? "page" : undefined}
            className="hidden rounded-full px-3.5 py-2 text-sm font-medium text-fg-muted transition-colors hover:text-fg md:inline-flex"
          >
            Contact
          </Link>
          <ButtonLink href={primaryCta.href} size="sm" className="hidden sm:inline-flex">
            {primaryCta.label}
          </ButtonLink>
          <MobileNav pathname={pathname} />
        </div>
      </Container>
    </header>
  );
}
