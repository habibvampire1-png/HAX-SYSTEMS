import type { ReactNode } from "react";

type SectionHeadingProps = {
  id?: string;
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  className?: string;
};

export default function SectionHeading({
  id,
  eyebrow,
  title,
  description,
  align = "left",
  className = "",
}: SectionHeadingProps) {
  const alignment = align === "center" ? "mx-auto text-center" : "";

  return (
    <div className={`max-w-3xl ${alignment} ${className}`}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2
        id={id}
        className="mt-3 text-[2rem] leading-tight font-semibold tracking-tight text-balance text-ink sm:text-4xl lg:text-5xl lg:leading-[1.1]"
      >
        {title}
      </h2>
      {description && (
        <p className="mt-5 text-lg leading-relaxed text-pretty text-slate-600">
          {description}
        </p>
      )}
    </div>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="text-xs font-semibold tracking-[0.14em] text-hax uppercase">
      {children}
    </p>
  );
}
