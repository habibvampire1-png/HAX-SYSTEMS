import Link from "next/link";
import Container from "@/components/layout/Container";
import Logo from "@/components/layout/Logo";
import { CRO_NUMBER, SITE_CONFIG, getPublicContact } from "@/config/site";
import { footerNavigation, legalNavigation } from "@/data/navigation";

export default function Footer() {
  const contact = getPublicContact();

  return (
    <footer className="border-t border-slate-200 bg-white">
      <Container className="py-14 lg:py-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_2fr]">
          <div>
            <Logo size="footer" />
            <p className="mt-4 max-w-xs text-base text-slate-600">
              AI receptionists, booking and follow-up systems for local service businesses.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
            {footerNavigation.map((group) => (
              <nav key={group.title} aria-label={`Footer ${group.title}`}>
                <h2 className="text-sm font-semibold text-ink">{group.title}</h2>
                <ul className="mt-4 space-y-3">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="rounded-sm text-sm text-slate-600 transition-colors hover:text-ink"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}

            <div className="col-span-2 sm:col-span-1">
              <h2 className="text-sm font-semibold text-ink">Contact</h2>
              <ul className="mt-4 space-y-3 text-sm text-slate-600">
                <li>
                  <Link href="/book" className="rounded-sm transition-colors hover:text-ink">
                    Book a 15-minute call
                  </Link>
                </li>
                {contact.email && (
                  <li>
                    <a
                      href={`mailto:${contact.email}`}
                      className="rounded-sm break-all transition-colors hover:text-ink"
                    >
                      {contact.email}
                    </a>
                  </li>
                )}
                {contact.phone && (
                  <li>
                    <a href={contact.phone.href} className="rounded-sm transition-colors hover:text-ink">
                      {contact.phone.display}
                    </a>
                  </li>
                )}
                {contact.whatsapp && (
                  <li>
                    <a
                      href={contact.whatsapp.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-sm transition-colors hover:text-ink"
                    >
                      WhatsApp
                    </a>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-slate-200 pt-6 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {new Date().getFullYear()} {SITE_CONFIG.name}
            {CRO_NUMBER && <> · Company no. {CRO_NUMBER}</>}
          </p>
          <ul className="flex gap-6" aria-label="Legal">
            {legalNavigation.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="rounded-sm transition-colors hover:text-ink"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  );
}
