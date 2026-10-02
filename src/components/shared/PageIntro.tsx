import type { ReactNode } from "react";
import Container from "@/components/layout/Container";
import { Eyebrow } from "@/components/ui/SectionHeading";

type PageIntroProps = {
  title: string;
  eyebrow?: string;
  description?: string;
  children?: ReactNode;
};

/** Top-of-page heading block for inner pages. Holds the page's only h1. */
export default function PageIntro({ title, eyebrow, description, children }: PageIntroProps) {
  return (
    <Container className="pt-16 pb-12 sm:pt-24 sm:pb-16">
      <div className="max-w-3xl">
        {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        <h1 className="mt-3 text-4xl leading-[1.08] font-semibold tracking-tight text-balance text-ink sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        {description && (
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-pretty text-slate-600 sm:text-xl">
            {description}
          </p>
        )}
        {children && <div className="mt-9">{children}</div>}
      </div>
    </Container>
  );
}
