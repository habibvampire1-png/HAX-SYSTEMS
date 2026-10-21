import ButtonLink from "@/components/ui/ButtonLink";
import { PhoneIcon, MessageIcon } from "@/components/ui/icons";
import { getPublicContact } from "@/config/site";
import { primaryCta } from "@/data/navigation";

const iconButton =
  "inline-flex size-12 shrink-0 items-center justify-center rounded-full border border-slate-300 bg-white text-ink transition-colors hover:border-hax hover:text-hax";

/**
 * Sticky bottom bar on mobile: tap to call, WhatsApp and the main call to
 * action. The page reserves space for it (see the body padding in layout.tsx),
 * so it never covers content.
 */
export default function MobileContactBar() {
  const { phone, whatsapp } = getPublicContact();

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 pb-[env(safe-area-inset-bottom)] backdrop-blur lg:hidden">
      <div className="mx-auto flex max-w-xl items-center gap-2 px-4 py-2.5">
        {phone && (
          <a href={phone.href} className={iconButton} aria-label={`Call ${phone.display}`}>
            <PhoneIcon className="size-5" />
          </a>
        )}
        {whatsapp && (
          <a
            href={whatsapp.href}
            target="_blank"
            rel="noopener noreferrer"
            className={iconButton}
            aria-label="Message HAX Systems on WhatsApp"
          >
            <MessageIcon className="size-5" />
          </a>
        )}
        <ButtonLink href={primaryCta.href} size="lg" className="flex-1">
          {primaryCta.label}
        </ButtonLink>
      </div>
    </div>
  );
}
