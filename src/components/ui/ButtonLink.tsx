import Link from "next/link";
import type { ComponentProps } from "react";

type ButtonLinkProps = ComponentProps<typeof Link> & {
  variant?: "primary" | "secondary" | "inverse";
  size?: "md" | "lg";
};

const variantClasses = {
  primary: "bg-hax text-white shadow-sm shadow-hax/20 hover:bg-hax-dark",
  secondary:
    "border border-slate-300 bg-white text-ink hover:border-slate-400 hover:bg-slate-50",
  inverse: "bg-white text-ink hover:bg-slate-100",
};

const sizeClasses = {
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-6 text-base",
};

export default function ButtonLink({
  variant = "primary",
  size = "md",
  className = "",
  ...props
}: ButtonLinkProps) {
  return (
    <Link
      className={`inline-flex items-center justify-center gap-2 rounded-full font-medium whitespace-nowrap transition-colors ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...props}
    />
  );
}
