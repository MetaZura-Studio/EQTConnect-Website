import type { Metadata } from "next";
import Link from "next/link";
import { mainNav } from "@/content/site";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/layout";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <section aria-labelledby="nf-heading" className="relative overflow-hidden">
      <div aria-hidden="true" className="bg-grid mask-radial pointer-events-none absolute inset-0" />
      <Container className="relative flex min-h-[70vh] flex-col items-center justify-center py-24 text-center">
        <p className="font-mono text-sm text-brand-600">404</p>
        <h1 id="nf-heading" className="mt-4 text-h1 font-semibold">
          This page could not be found.
        </h1>
        <p className="mt-5 max-w-md text-lead text-fg-muted">The page may have moved, or the link may be incorrect.</p>
        <div className="mt-9 flex flex-col gap-3 xs:flex-row">
          <ButtonLink href="/" size="lg">
            Go to home
          </ButtonLink>
          <ButtonLink href="/contact" size="lg" variant="secondary">
            Contact us
          </ButtonLink>
        </div>
        <nav aria-label="Popular pages" className="mt-12">
          <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-fg-muted hover:text-fg">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
    </section>
  );
}
