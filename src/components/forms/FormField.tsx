import type { ReactNode } from "react";

const inputClass = (error?: string) =>
  `mt-2 block h-12 w-full rounded-xl border bg-white px-3.5 text-base text-ink focus:outline-none focus-visible:ring-2 ${
    error
      ? "border-red-600 focus-visible:ring-red-600/20"
      : "border-slate-300 focus:border-hax focus-visible:ring-hax/30"
  }`;

type FieldShellProps = {
  id: string;
  label: string;
  error?: string;
  className?: string;
  children: ReactNode;
};

function FieldShell({ id, label, error, className = "", children }: FieldShellProps) {
  return (
    <div className={className}>
      <label htmlFor={id} className="text-sm font-medium text-ink">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-sm text-red-700">
          {error}
        </p>
      )}
    </div>
  );
}

type TextFieldProps = {
  id: string;
  label: string;
  value: string;
  error?: string;
  onChange: (value: string) => void;
  autoComplete?: string;
  inputMode?: "text" | "email" | "tel";
  className?: string;
};

export function TextField({
  id,
  label,
  value,
  error,
  onChange,
  autoComplete,
  inputMode,
  className,
}: TextFieldProps) {
  return (
    <FieldShell id={id} label={label} error={error} className={className}>
      <input
        id={id}
        type="text"
        value={value}
        autoComplete={autoComplete}
        inputMode={inputMode}
        required
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        onChange={(event) => onChange(event.target.value)}
        className={inputClass(error)}
      />
    </FieldShell>
  );
}

type SelectFieldProps = {
  id: string;
  label: string;
  value: string;
  options: { value: string; label: string }[];
  placeholder: string;
  error?: string;
  onChange: (value: string) => void;
  className?: string;
};

export function SelectField({
  id,
  label,
  value,
  options,
  placeholder,
  error,
  onChange,
  className,
}: SelectFieldProps) {
  return (
    <FieldShell id={id} label={label} error={error} className={className}>
      <select
        id={id}
        value={value}
        required
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        onChange={(event) => onChange(event.target.value)}
        className={inputClass(error)}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </FieldShell>
  );
}
