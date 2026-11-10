import Link from "next/link";
import { footerNav, site } from "@/content/site";
import { Container } from "@/components/ui/layout";
import { Logo } from "@/components/layout/logo";

export function SiteFooter() {
  const year = new Date().getFullYear();
  const legalEntity = site.legal.companyName ?? site.name;
  const legalLinks = [
    { label: "Privacy policy", href: site.legal.privacyPolicyHref },
    { label: "Terms of use", href: site.legal.termsHref },
  ].filter((link) => Boolean(link.href));
  const contactRows = (
    [
      ["Email", site.contact.email, site.contact.email ? `mailto:${site.contact.email}` : null],
      ["Phone", site.contact.phone, site.contact.phone ? `tel:${site.contact.phone.replace(/\s/g, "")}` : null],
      ["Office", site.contact.address, null],
    ] as const
  ).filter(([, value]) => Boolean(value));

  return (
    <footer className="dark-surface relative overflow-hidden bg-ink-950 text-white">
      <div aria-hidden="true" className="bg-grid-dark mask-radial pointer-events-none absolute inset-0 opacity-60" />
      <Container className="relative pb-10 pt-16 sm:pt-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Link href="/" aria-label="EQTConnect home" className="inline-block rounded-lg">
              <Logo inverse />
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/65">{site.description}</p>

            {contactRows.length > 0 ? (
              <dl className="mt-8 space-y-3 text-sm">
                {contactRows.map(([label, value, href]) => (
                  <div key={label} className="flex items-center gap-4">
                    <dt className="w-14 shrink-0 font-mono text-2xs uppercase tracking-[0.12em] text-white/45">{label}</dt>
                    <dd className="text-white/80">
                      {href ? (
                        <a href={href} className="hover:text-white">
                          {value}
                        </a>
                      ) : (
                        value
                      )}
                    </dd>
                  </div>
                ))}
              </dl>
            ) : null}
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-7">
            {footerNav.map((group) => (
              <div key={group.title}>
                <h2 className="font-mono text-2xs font-medium uppercase tracking-[0.14em] text-white/45">{group.title}</h2>
                <ul className="mt-4 space-y-1">
                  {group.items.map((item) => (
                    <li key={`${group.title}-${item.label}`}>
                      <Link
                        href={item.href}
                        className="inline-flex min-h-9 items-center text-sm text-white/75 transition-colors hover:text-white"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-white/10 pt-8 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {legalEntity}. All rights reserved.
          </p>
          {legalLinks.length > 0 ? (
            <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
              {legalLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href!} className="hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </Container>
    </footer>
  );
}
