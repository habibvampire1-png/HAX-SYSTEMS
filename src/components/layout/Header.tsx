import Container from "@/components/layout/Container";
import DesktopNav from "@/components/layout/DesktopNav";
import Logo from "@/components/layout/Logo";
import MobileNav from "@/components/layout/MobileNav";
import ButtonLink from "@/components/ui/ButtonLink";
import { PhoneIcon } from "@/components/ui/icons";
import { getPublicContact } from "@/config/site";
import { primaryCta } from "@/data/navigation";

export default function Header() {
  const { phone } = getPublicContact();

  return (
    <header className="sticky top-0 z-50">
      {/* Glass background on its own layer: backdrop-filter on the header
          itself would trap the fixed mobile menu inside the header box. */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 border-b border-white/70 bg-linear-to-br from-white/80 via-white/55 to-white/70 shadow-[0_1px_2px_rgb(18_18_18/0.04),0_10px_34px_rgb(18_18_18/0.06),inset_0_1px_0_rgb(255_255_255/0.95)] backdrop-blur-xl backdrop-saturate-[1.7]"
      />
      <Container className="flex h-18 items-center justify-between lg:grid lg:grid-cols-[1fr_auto_1fr] lg:gap-6">
        <div className="justify-self-start">
          <Logo size="header" />
        </div>

        <DesktopNav />

        <div className="hidden items-center gap-5 justify-self-end lg:flex">
          {phone && (
            <a
              href={phone.href}
              className="inline-flex items-center gap-2 rounded-md text-sm font-semibold text-ink transition-colors hover:text-hax"
            >
              <PhoneIcon className="size-4 text-hax" />
              <span className="sr-only xl:not-sr-only xl:whitespace-nowrap">
                <span className="sr-only">Call </span>
                {phone.display}
              </span>
            </a>
          )}
          <ButtonLink href={primaryCta.href} className="cta-shake">
            {primaryCta.label}
          </ButtonLink>
        </div>

        <MobileNav />
      </Container>
    </header>
  );
}
