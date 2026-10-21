"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { SelectField, TextField } from "@/components/forms/FormField";
import ResponsePromise from "@/components/trust/ResponsePromise";
import { CheckIcon } from "@/components/ui/icons";
import { getPublicContact } from "@/config/site";
import { postLead } from "@/lib/submitLead";

type Props = {
  /** Prefill from a personalised link (?b=), already sanitised. */
  initialBusiness?: string;
  /** Prefill from the page the visitor came from; a slug or "other". */
  initialIndustry?: string;
  industryOptions: { value: string; label: string }[];
  /** Package the visitor was looking at on the pricing page. */
  selectedPackage?: { id: string; name: string };
};

type Values = { name: string; business: string; industry: string; contact: string };
type Errors = Partial<Record<keyof Values, string>>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(values: Values): Errors {
  const errors: Errors = {};
  if (!values.name.trim()) errors.name = "Please enter your name.";
  if (!values.business.trim()) errors.business = "Please enter your business name.";
  if (!values.industry) errors.industry = "Please choose your industry.";

  const contact = values.contact.trim();
  if (!contact) {
    errors.contact = "Please enter an email address or phone number.";
  } else if (
    contact.includes("@") ? !EMAIL_PATTERN.test(contact) : contact.replace(/\D/g, "").length < 7
  ) {
    errors.contact = "Please enter a valid email address or phone number.";
  }
  return errors;
}

export default function DemoForm({ initialBusiness, initialIndustry, industryOptions, selectedPackage }: Props) {
  const [values, setValues] = useState<Values>({
    name: "",
    business: initialBusiness ?? "",
    industry: initialIndustry ?? "",
    contact: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"editing" | "submitting" | "sent">("editing");
  const [submitError, setSubmitError] = useState<string | null>(null);
  // Hidden spam trap: people never see it, bots fill it in.
  const [honeypot, setHoneypot] = useState("");
  const headingRef = useRef<HTMLHeadingElement>(null);
  const { email, phone } = getPublicContact();

  useEffect(() => {
    if (status === "sent") headingRef.current?.focus();
  }, [status]);

  function set<K extends keyof Values>(key: K) {
    return (value: string) => setValues((current) => ({ ...current, [key]: value }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    const firstInvalid = (Object.keys(nextErrors) as (keyof Values)[])[0];
    if (firstInvalid) {
      document.getElementById(`demo-${firstInvalid}`)?.focus();
      return;
    }

    setSubmitError(null);
    setStatus("submitting");
    const result = await postLead({
      type: "demo",
      ...values,
      package: selectedPackage?.id,
      companyWebsite: honeypot,
    });
    if (result.status === "sent") {
      setStatus("sent");
    } else {
      setSubmitError(result.message);
      setStatus("editing");
    }
  }

  if (status === "sent") {
    return (
      <div className="p-6 sm:p-8">
        <span className="flex size-12 items-center justify-center rounded-full bg-hax-soft text-hax">
          <CheckIcon className="size-6" strokeWidth={2.5} />
        </span>
        <h2
          ref={headingRef}
          tabIndex={-1}
          className="mt-5 text-2xl font-semibold tracking-tight text-ink outline-none"
        >
          I&rsquo;ll send your demo within 48 hours.
        </h2>
        <p className="mt-2 font-medium text-ink">— Habib</p>
        <h3 className="mt-8 text-sm font-semibold text-ink">What happens next</h3>
        <ol className="mt-3 space-y-2 text-slate-600">
          <li>1. I record a short demo of an AI receptionist answering a call for {values.business}.</li>
          <li>2. I send it to {values.contact}.</li>
          <li>3. If you like it, we can talk about setting it up. No pressure.</li>
        </ol>
      </div>
    );
  }

  return (
    <form noValidate onSubmit={handleSubmit} className="p-5 sm:p-8">
      <h2 className="text-2xl font-semibold tracking-tight text-ink">Where should I send your demo?</h2>
      <p className="mt-2 text-slate-600">Four quick answers. No payment, no commitment.</p>
      {selectedPackage && (
        <p className="mt-3 inline-block rounded-full bg-hax-soft px-3 py-1 text-sm font-medium text-hax">
          Interested in: {selectedPackage.name}
        </p>
      )}

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <TextField
          id="demo-name"
          label="Your name"
          autoComplete="name"
          value={values.name}
          error={errors.name}
          onChange={set("name")}
        />
        <TextField
          id="demo-business"
          label="Business name"
          autoComplete="organization"
          value={values.business}
          error={errors.business}
          onChange={set("business")}
        />
        <SelectField
          id="demo-industry"
          label="Your industry"
          placeholder="Choose one"
          options={industryOptions}
          value={values.industry}
          error={errors.industry}
          onChange={set("industry")}
        />
        <TextField
          id="demo-contact"
          label="Email or phone"
          autoComplete="email"
          inputMode="email"
          value={values.contact}
          error={errors.contact}
          onChange={set("contact")}
        />
      </div>

      {/* Honeypot: off-screen, skipped by keyboard and screen readers. */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="demo-company-website">Leave this field empty</label>
        <input
          id="demo-company-website"
          name="companyWebsite"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(event) => setHoneypot(event.target.value)}
        />
      </div>

      {submitError && (
        <p role="alert" className="mt-5 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-800">
          {submitError} Please try again
          {phone || email ? (
            <>
              , or reach me directly on{" "}
              {phone && (
                <a href={phone.href} className="font-medium underline">
                  {phone.display}
                </a>
              )}
              {phone && email && " or "}
              {email && (
                <a href={`mailto:${email}`} className="font-medium underline">
                  {email}
                </a>
              )}
            </>
          ) : null}
          .
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="mt-8 h-12 w-full rounded-full bg-hax px-6 text-base font-medium text-white shadow-sm shadow-hax/20 transition-colors hover:bg-hax-dark disabled:opacity-60 sm:w-auto"
      >
        {status === "submitting" ? "Sending…" : "Send me my free demo"}
      </button>
      <ResponsePromise className="mt-3" />
    </form>
  );
}
