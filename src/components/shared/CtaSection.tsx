import Container from "@/components/layout/Container";
import ButtonLink from "@/components/ui/ButtonLink";
import ResponsePromise from "@/components/trust/ResponsePromise";
import { primaryCta } from "@/data/navigation";
import type { NavLink } from "@/types";

type CtaSectionProps = {
  title: string;
  description: string;
  primary?: NavLink;
  secondary?: NavLink;
  /** Short reassurance line under the buttons. */
  note?: string;
  /** Show the reply-time promise under the buttons. */
  showResponsePromise?: boolean;
};

/** Closing call to action used at the end of the homepage and inner pages. */
export default function CtaSection({
  title,
  description,
  primary = primaryCta,
  secondary,
  note,
  showResponsePromise = true,
}: CtaSectionProps) {
  return (
    <section aria-labelledby="cta-heading" className="relative isolate overflow-hidden border-t border-slate-200">
      <div aria-hidden className="dot-grid absolute inset-0 -z-10" />
      <Container className="py-24 text-center sm:py-32">
        <h2
          id="cta-heading"
          className="mx-auto max-w-3xl text-[2rem] leading-tight font-semibold tracking-tight text-balance text-ink sm:text-5xl lg:text-6xl lg:leading-[1.05]"
        >
          {title}
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-lg text-slate-600">{description}</p>
        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          <ButtonLink href={primary.href} size="lg">
            {primary.label}
          </ButtonLink>
          {secondary && (
            <ButtonLink href={secondary.href} size="lg" variant="secondary">
              {secondary.label}
            </ButtonLink>
          )}
        </div>
        {note && <p className="mt-4 text-sm text-slate-600">{note}</p>}
        {showResponsePromise && <ResponsePromise className="mt-2" />}
      </Container>
    </section>
  );
}
