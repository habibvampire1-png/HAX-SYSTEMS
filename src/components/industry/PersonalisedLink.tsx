"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import ButtonLink from "@/components/ui/ButtonLink";
import { sanitizeBusinessName, withBusinessName } from "@/lib/businessName";
import type { ComponentProps } from "react";

type Props = Omit<ComponentProps<typeof ButtonLink>, "href"> & { href: string };

function Personalised({ href, ...props }: Props) {
  const business = sanitizeBusinessName(useSearchParams().get("b"));
  return <ButtonLink href={withBusinessName(href, business)} {...props} />;
}

/**
 * A button that carries ?b=BusinessName to the next page, so the booking form
 * can prefill it. The industry pages stay static; the name is read in the
 * browser. Without the param it is a plain link.
 */
export default function PersonalisedLink(props: Props) {
  return (
    <Suspense fallback={<ButtonLink {...props} />}>
      <Personalised {...props} />
    </Suspense>
  );
}
