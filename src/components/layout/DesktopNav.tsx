"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type FocusEvent } from "react";
import NavDropdown from "@/components/layout/NavDropdown";
import { mainNavigation } from "@/data/navigation";

function isPathActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function DesktopNav() {
  const pathname = usePathname();
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);
  const buttonRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  useEffect(() => {
    if (!openMenu) return;

    function handlePointerDown(event: PointerEvent) {
      if (!navRef.current?.contains(event.target as Node)) {
        setOpenMenu(null);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape" && openMenu) {
        buttonRefs.current[openMenu]?.focus();
        setOpenMenu(null);
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [openMenu]);

  // Close when keyboard focus moves outside the navigation entirely.
  function handleBlur(event: FocusEvent<HTMLElement>) {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
      setOpenMenu(null);
    }
  }

  return (
    <nav
      ref={navRef}
      aria-label="Main"
      onBlur={handleBlur}
      className="hidden h-full lg:block"
    >
      <ul className="flex h-full items-center gap-1">
        {mainNavigation.map((item) => {
          if (item.type === "dropdown") {
            const menuId = `nav-${item.label.toLowerCase()}`;
            return (
              <NavDropdown
                key={item.label}
                id={menuId}
                menu={item}
                isOpen={openMenu === item.label}
                isActive={isPathActive(pathname, item.viewAll.href)}
                onToggle={() =>
                  setOpenMenu((current) =>
                    current === item.label ? null : item.label,
                  )
                }
                onClose={() => setOpenMenu(null)}
                buttonRef={(node) => {
                  buttonRefs.current[item.label] = node;
                }}
              />
            );
          }

          const isActive = isPathActive(pathname, item.href);
          return (
            <li key={item.href} className="flex h-full items-center">
              <Link
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={`rounded-full px-3.5 py-2 text-sm font-medium transition-colors hover:bg-slate-100 hover:text-ink ${
                  isActive ? "text-ink" : "text-slate-600"
                }`}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
