import Link from "next/link";
import type { ComponentProps } from "react";
import { ArrowRightIcon } from "@/components/ui/icons";

type ArrowLinkProps = ComponentProps<typeof Link>;

/** Text link with a trailing arrow, for secondary "explore" actions. */
export default function ArrowLink({ className = "", children, ...props }: ArrowLinkProps) {
  return (
    <Link
      className={`group inline-flex items-center gap-1.5 rounded-sm text-sm font-medium text-ink transition-colors hover:text-hax ${className}`}
      {...props}
    >
      {children}
      <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none" />
    </Link>
  );
}
