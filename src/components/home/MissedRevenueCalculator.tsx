"use client";

import { useId, useState } from "react";
import Link from "next/link";
import Container from "@/components/layout/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { demoCta } from "@/data/navigation";

const WEEKS_PER_YEAR = 52;
const MAX_ENQUIRIES = 10_000;
const MAX_VALUE = 1_000_000;

const euro = new Intl.NumberFormat("en", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
});

/** Reads a number from text input, keeping it between 0 and max. Empty becomes 0. */
function toNumber(raw: string, max: number) {
  const value = Number(raw.replace(/[^\d.]/g, ""));
  if (!Number.isFinite(value)) return 0;
  return Math.min(Math.max(value, 0), max);
}

function NumberField({
  id,
  label,
  hint,
  prefix,
  value,
  onChange,
}: {
  id: string;
  label: string;
  hint: string;
  prefix?: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-medium text-ink">
        {label}
      </label>
      <div className="relative mt-2">
        {prefix && (
          <span aria-hidden className="absolute inset-y-0 left-3.5 flex items-center text-slate-500">
            {prefix}
          </span>
        )}
        <input
          id={id}
          type="text"
          inputMode="numeric"
          autoComplete="off"
          value={value}
          aria-describedby={`${id}-hint`}
          onChange={(event) => onChange(event.target.value)}
          className={`block h-12 w-full rounded-xl border border-slate-300 bg-white text-base text-ink focus:border-hax focus:outline-none focus-visible:ring-2 focus-visible:ring-hax/30 ${
            prefix ? "pr-3.5 pl-8" : "px-3.5"
          }`}
        />
      </div>
      <p id={`${id}-hint`} className="mt-1.5 text-sm text-slate-600">
        {hint}
      </p>
    </div>
  );
}

/**
 * Works out roughly how much a business loses to missed calls and enquiries.
 * Everything comes from the visitor's own numbers, and the result is labelled
 * as an estimate. Runs entirely in the browser.
 */
export default function MissedRevenueCalculator() {
  const uid = useId();
  const [enquiries, setEnquiries] = useState("25");
  const [missedPercent, setMissedPercent] = useState(20);
  const [jobValue, setJobValue] = useState("100");

  const weekly = toNumber(enquiries, MAX_ENQUIRIES);
  const value = toNumber(jobValue, MAX_VALUE);
  const yearly = weekly * (missedPercent / 100) * value * WEEKS_PER_YEAR;
  const monthly = yearly / 12;
  const missedPerWeek = Math.round(weekly * (missedPercent / 100) * 10) / 10;

  return (
    <section id="calculator" aria-labelledby="calculator-heading" className="border-t border-slate-200">
      <Container className="grid gap-10 py-20 sm:py-28 lg:grid-cols-2 lg:gap-16">
        <div>
          <SectionHeading
            id="calculator-heading"
            eyebrow="Missed-revenue calculator"
            title="What could missed calls be costing you?"
            description="Put in your own numbers. It takes ten seconds."
          />
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-xl shadow-slate-900/[0.05] sm:p-8">
          <div className="grid gap-5 sm:grid-cols-2">
            <NumberField
              id={`${uid}-enquiries`}
              label="Calls and enquiries per week"
              hint="Your best guess is fine."
              value={enquiries}
              onChange={setEnquiries}
            />
            <NumberField
              id={`${uid}-value`}
              label="Average job or booking value"
              hint="What one customer is worth."
              prefix="€"
              value={jobValue}
              onChange={setJobValue}
            />
          </div>

          <div className="mt-6">
            <div className="flex items-baseline justify-between">
              <label htmlFor={`${uid}-missed`} className="text-sm font-medium text-ink">
                How many do you miss?
              </label>
              <output htmlFor={`${uid}-missed`} className="text-lg font-semibold text-ink">
                {missedPercent}%
              </output>
            </div>
            <input
              id={`${uid}-missed`}
              type="range"
              min={0}
              max={100}
              step={5}
              value={missedPercent}
              onChange={(event) => setMissedPercent(Number(event.target.value))}
              className="mt-3 h-11 w-full cursor-pointer accent-hax"
            />
          </div>

          <div role="status" aria-live="polite" className="mt-6 rounded-2xl bg-ink p-5 text-white sm:p-6">
            <p className="text-sm text-slate-300">
              About {missedPerWeek} missed {missedPerWeek === 1 ? "enquiry" : "enquiries"} a week could be worth
            </p>
            <p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
              {euro.format(monthly)} <span className="text-lg font-medium text-slate-300">a month</span>
            </p>
            <p className="mt-1 text-lg text-slate-200">{euro.format(yearly)} a year</p>
          </div>

          <p className="mt-4 text-sm text-slate-600">
            This is an estimate based only on the numbers you entered. It assumes each missed
            enquiry would have become a paying customer, which won&rsquo;t always be true.
          </p>

          <Link
            href={demoCta.href}
            className="mt-6 inline-flex h-12 w-full items-center justify-center rounded-full bg-hax px-6 text-base font-medium text-white shadow-sm shadow-hax/20 transition-colors hover:bg-hax-dark sm:w-auto"
          >
            Get a free demo that fixes this
          </Link>
        </div>
      </Container>
    </section>
  );
}
