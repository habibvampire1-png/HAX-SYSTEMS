import type { ReactNode } from "react";

type ChoiceChipProps = {
  type: "radio" | "checkbox";
  name: string;
  value: string;
  checked: boolean;
  onChange: () => void;
  children: ReactNode;
  className?: string;
};

/** A native radio/checkbox styled as a selectable card or chip. */
export default function ChoiceChip({
  type,
  name,
  value,
  checked,
  onChange,
  children,
  className = "",
}: ChoiceChipProps) {
  return (
    <label
      className={`flex cursor-pointer rounded-xl border bg-white transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-hax ${
        checked
          ? "border-hax bg-hax-soft/50 ring-1 ring-hax"
          : "border-slate-200 hover:border-slate-300"
      } ${className}`}
    >
      <input
        type={type}
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        className="sr-only"
      />
      {children}
    </label>
  );
}
