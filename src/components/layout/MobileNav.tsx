"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import ButtonLink from "@/components/ui/ButtonLink";
import {
  ArrowRightIcon,
  ChevronDownIcon,
  CloseIcon,
  MenuIcon,
} from "@/components/ui/icons";
import { mainNavigation, primaryCta } from "@/data/navigation";

const PANEL_ID = "mobile-nav-panel";
const DESKTOP_QUERY = "(min-width: 1024px)";

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [openSection, setOpenSection] = useState<string | null>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  function close() {
    setIsOpen(false);
    setOpenSection(null);
  }

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
        setOpenSection(null);
        toggleRef.current?.focus();
      }
    }

    // Reset if the viewport grows into the desktop layout while open.
    const desktopQuery = window.matchMedia(DESKTOP_QUERY);
    function handleViewportChange(event: MediaQueryListEvent) {
      if (event.matches) {
        setIsOpen(false);
        setOpenSection(null);
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    desktopQuery.addEventListener("change", handleViewportChange);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      desktopQuery.removeEventListener("change", handleViewportChange);
    };
  }, [isOpen]);

  return (
    <div className="flex items-center gap-2 lg:hidden">
      <div className="hidden sm:block">
        <ButtonLink href={primaryCta.href} onClick={close} className="cta-shake">
          {primaryCta.label}
        </ButtonLink>
      </div>

      <button
        ref={toggleRef}
        type="button"
        aria-expanded={isOpen}
        aria-controls={PANEL_ID}
        aria-label={isOpen ? "Close menu" : "Open menu"}
        onClick={() => (isOpen ? close() : setIsOpen(true))}
        className="-mr-2 inline-flex size-11 items-center justify-center rounded-full text-ink hover:bg-slate-100"
      >
        {isOpen ? <CloseIcon className="size-6" /> : <MenuIcon className="size-6" />}
      </button>

      <div
        id={PANEL_ID}
        className={`fixed inset-x-0 top-18 bottom-0 z-40 flex flex-col bg-white transition-all duration-200 ease-out motion-reduce:transition-none ${
          isOpen
            ? "visible translate-y-0 opacity-100"
            : "pointer-events-none invisible -translate-y-2 opacity-0"
        }`}
      >
        <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-4 sm:px-6">
          <ul>
            {mainNavigation.map((item) => {
              if (item.type === "link") {
                return (
                  <li key={item.href} className="border-b border-slate-100">
                    <Link
                      href={item.href}
                      onClick={close}
                      className="block py-4 text-lg font-medium text-ink"
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              }

              const sectionId = `mobile-${item.label.toLowerCase()}`;
              const isSectionOpen = openSection === item.label;
              return (
                <li key={item.label} className="border-b border-slate-100">
                  <button
                    id={`${sectionId}-button`}
                    type="button"
                    aria-expanded={isSectionOpen}
                    aria-controls={`${sectionId}-panel`}
                    onClick={() =>
                      setOpenSection((current) =>
                        current === item.label ? null : item.label,
                      )
                    }
                    className="flex w-full items-center justify-between py-4 text-left text-lg font-medium text-ink"
                  >
                    {item.label}
                    <ChevronDownIcon
                      className={`size-5 text-slate-500 transition-transform duration-200 motion-reduce:transition-none ${
                        isSectionOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <div
                    id={`${sectionId}-panel`}
                    role="region"
                    aria-labelledby={`${sectionId}-button`}
                    className={`grid transition-all duration-200 ease-out motion-reduce:transition-none ${
                      isSectionOpen
                        ? "visible grid-rows-[1fr]"
                        : "invisible grid-rows-[0fr]"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <ul className="space-y-1 pb-4">
                        {item.links.map((link) => (
                          <li key={link.href}>
                            <Link
                              href={link.href}
                              onClick={close}
                              className="block rounded-xl py-2.5 text-base text-slate-700"
                            >
                              {link.label}
                            </Link>
                          </li>
                        ))}
                        <li className="pt-2">
                          <Link
                            href={item.viewAll.href}
                            onClick={close}
                            className="inline-flex items-center gap-1.5 py-1 text-sm font-medium text-ink"
                          >
                            {item.viewAll.label}
                            <ArrowRightIcon className="size-4" />
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="border-t border-slate-100 p-4 sm:px-6">
          <ButtonLink
            href={primaryCta.href}
            onClick={close}
            size="lg"
            className="w-full"
          >
            {primaryCta.label}
          </ButtonLink>
        </div>
      </div>
    </div>
  );
}
