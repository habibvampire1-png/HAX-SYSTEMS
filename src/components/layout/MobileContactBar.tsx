"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MessageIcon, PhoneIcon } from "@/components/ui/icons";
import { demoCta } from "@/data/navigation";

type Props = {
  phone: { display: string; href: string } | null;
  whatsapp: { display: string; href: string } | null;
};

/** Share of the page a visitor must scroll before the bar slides in. */
const SHOW_AT = 0.3;

/** The pages that already are the form: a bar pointing at them would be noise. */
const HIDDEN_ON = ["/book", "/demo"];

const iconButton =
  "inline-flex size-12 shrink-0 items-center justify-center rounded-full border border-slate-300 bg-white text-ink transition-colors hover:border-hax hover:text-hax";

/**
 * Sticky bottom bar on mobile: tap to call, WhatsApp and the free demo. It
 * appears once the visitor has scrolled 30% of the page, so it never competes
 * with the hero. The page reserves room for it (see the body padding in
 * layout.tsx), so it never covers content.
 */
export default function MobileContactBar({ phone, whatsapp }: Props) {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function update() {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      setVisible(scrollable > 0 && window.scrollY / scrollable >= SHOW_AT);
    }

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [pathname]);

  if (HIDDEN_ON.includes(pathname)) return null;

  return (
    <div
      // While hidden the bar is off-screen and removed from tab order and screen readers.
      inert={!visible}
      aria-hidden={!visible}
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 pb-[env(safe-area-inset-bottom)] backdrop-blur transition-transform duration-300 motion-reduce:transition-none lg:hidden ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
    >
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
        <Link
          href={demoCta.href}
          className="inline-flex h-12 flex-1 items-center justify-center rounded-full bg-hax px-5 text-base font-medium whitespace-nowrap text-white shadow-sm shadow-hax/20 transition-colors hover:bg-hax-dark"
        >
          Free demo
        </Link>
      </div>
    </div>
  );
}
