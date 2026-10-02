"use client";

import Link from "next/link";
import type { Ref } from "react";
import { ArrowRightIcon, ChevronDownIcon } from "@/components/ui/icons";
import type { NavDropdownMenu } from "@/types";

type NavDropdownProps = {
  menu: NavDropdownMenu;
  id: string;
  isOpen: boolean;
  isActive: boolean;
  onToggle: () => void;
  onClose: () => void;
  buttonRef: Ref<HTMLButtonElement>;
};

export default function NavDropdown({
  menu,
  id,
  isOpen,
  isActive,
  onToggle,
  onClose,
  buttonRef,
}: NavDropdownProps) {
  const buttonId = `${id}-button`;
  const panelId = `${id}-panel`;

  return (
    <li className="relative flex h-full items-center">
      <button
        ref={buttonRef}
        id={buttonId}
        type="button"
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={onToggle}
        className={`inline-flex items-center gap-1 rounded-full px-3.5 py-2 text-sm font-medium transition-colors hover:bg-slate-100 hover:text-ink ${
          isOpen || isActive ? "text-ink" : "text-slate-600"
        }`}
      >
        {menu.label}
        <ChevronDownIcon
          className={`size-4 transition-transform duration-200 motion-reduce:transition-none ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        className={`absolute top-full left-1/2 z-40 w-[26rem] -translate-x-1/2 pt-1 transition-all duration-200 ease-out motion-reduce:transition-none ${
          isOpen
            ? "visible translate-y-0 opacity-100"
            : "pointer-events-none invisible -translate-y-1 opacity-0"
        }`}
      >
        <div className="rounded-2xl border border-slate-200 bg-white p-2 shadow-xl shadow-slate-900/8">
          <ul>
            {menu.links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={onClose}
                  className="group block rounded-xl px-3.5 py-3 transition-colors hover:bg-slate-50"
                >
                  <span className="block text-sm font-semibold text-ink group-hover:text-hax">
                    {link.label}
                  </span>
                  {link.description && (
                    <span className="mt-0.5 block text-sm text-slate-500">
                      {link.description}
                    </span>
                  )}
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-1 border-t border-slate-100 px-3 pt-3 pb-2">
            <Link
              href={menu.viewAll.href}
              onClick={onClose}
              className="group inline-flex items-center gap-1.5 rounded-sm text-sm font-medium text-ink hover:text-hax"
            >
              {menu.viewAll.label}
              <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </div>
    </li>
  );
}
