"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import ChoiceChip from "@/components/booking/ChoiceChip";
import BookingProgress from "@/components/booking/BookingProgress";
import ResponsePromise from "@/components/trust/ResponsePromise";
import { CheckIcon } from "@/components/ui/icons";
import { DISPLAY_TIME_ZONE, getPublicContact } from "@/config/site";
import { bookingServiceOptions } from "@/data/booking";
import { submitBookingRequest, type BookingRequest } from "@/lib/booking";
import type { BookingServiceId } from "@/types";

const STEPS = ["What you need", "Time", "Your details"];
const DAY_OPTIONS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
const TIME_OPTIONS = ["Morning", "Afternoon", "Evening"];

type Details = { name: string; business: string; contact: string; notes: string };
type DetailErrors = Partial<Record<keyof Details, string>>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateDetails(details: Details): DetailErrors {
  const errors: DetailErrors = {};
  if (!details.name.trim()) errors.name = "Please enter your name.";
  if (!details.business.trim()) errors.business = "Please enter your business name.";

  const contact = details.contact.trim();
  const digits = contact.replace(/\D/g, "");
  if (!contact) {
    errors.contact = "Please enter an email address or phone number.";
  } else if (contact.includes("@") ? !EMAIL_PATTERN.test(contact) : digits.length < 7) {
    errors.contact = "Please enter a valid email address or phone number.";
  }
  return errors;
}

function toggle(list: string[], value: string) {
  return list.includes(value) ? list.filter((item) => item !== value) : [...list, value];
}

type BookingFlowProps = {
  initialService?: BookingServiceId;
};

export default function BookingFlow({ initialService }: BookingFlowProps) {
  const [step, setStep] = useState(0);
  const [service, setService] = useState<BookingServiceId | null>(initialService ?? null);
  const [serviceError, setServiceError] = useState(false);
  const [days, setDays] = useState<string[]>([]);
  const [times, setTimes] = useState<string[]>([]);
  const [details, setDetails] = useState<Details>({ name: "", business: "", contact: "", notes: "" });
  const [errors, setErrors] = useState<DetailErrors>({});
  const [status, setStatus] = useState<"editing" | "submitting" | "sent">("editing");
  const [submitError, setSubmitError] = useState<string | null>(null);
  // Hidden spam trap: people never see it, bots fill it in.
  const [honeypot, setHoneypot] = useState("");

  const headingRef = useRef<HTMLHeadingElement>(null);
  const hasNavigated = useRef(false);

  // Move focus to the new step's heading so keyboard and screen reader users
  // land at the start of each step (but not on first page load).
  useEffect(() => {
    if (hasNavigated.current) headingRef.current?.focus();
  }, [step, status]);

  function goTo(nextStep: number) {
    hasNavigated.current = true;
    setStep(nextStep);
  }

  function continueFromService() {
    if (!service) {
      setServiceError(true);
      return;
    }
    goTo(1);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validateDetails(details);
    setErrors(nextErrors);

    const firstInvalid = (Object.keys(nextErrors) as (keyof Details)[])[0];
    if (firstInvalid) {
      document.getElementById(`booking-${firstInvalid}`)?.focus();
      return;
    }
    if (!service) return;

    setSubmitError(null);
    setStatus("submitting");
    const result = await submitBookingRequest(buildRequest(service), honeypot);
    if (result.status === "sent") {
      hasNavigated.current = true;
      setStatus("sent");
    } else {
      setSubmitError(result.message);
      setStatus("editing");
    }
  }

  function buildRequest(selected: BookingServiceId): BookingRequest {
    return {
      service: selected,
      schedule: { days, times, timeZone: DISPLAY_TIME_ZONE },
      ...details,
    };
  }

  const selectedService = bookingServiceOptions.find((option) => option.id === service);
  const { email, phone, whatsapp } = getPublicContact();

  if (status === "sent") {
    return (
      <div className="p-6 sm:p-8">
        <span className="flex size-12 items-center justify-center rounded-full bg-hax-soft text-hax">
          <CheckIcon className="size-6" strokeWidth={2.5} />
        </span>
        <h2 ref={headingRef} tabIndex={-1} className="mt-5 text-2xl font-semibold tracking-tight text-ink outline-none">
          Got it — I&rsquo;ll be in touch within 1 working day.
        </h2>
        <p className="mt-2 font-medium text-ink">— Habib</p>

        <h3 className="mt-8 text-sm font-semibold text-ink">What happens next</h3>
        <ol className="mt-3 space-y-2 text-slate-600">
          <li>1. I read your answers.</li>
          <li>2. I contact you to confirm a time for a 15-minute call.</li>
          <li>3. We talk about what to fix first. No jargon.</li>
        </ol>

        <dl className="mt-6 divide-y divide-slate-100 rounded-2xl border border-slate-200 text-sm">
          {[
            ["Help with", selectedService?.label],
            ["Preferred days", days.length ? days.join(", ") : "No preference"],
            ["Preferred times (Irish time)", times.length ? times.join(", ") : "No preference"],
            ["Name", details.name],
            ["Business", details.business],
            ["Contact", details.contact],
          ].map(([label, value]) => (
            <div key={label} className="flex justify-between gap-4 px-4 py-3">
              <dt className="text-slate-500">{label}</dt>
              <dd className="text-right font-medium text-ink">{value}</dd>
            </div>
          ))}
        </dl>

        {(phone || whatsapp || email) && (
          <p className="mt-6 text-sm text-slate-600">
            In a hurry?{" "}
            {phone && (
              <a href={phone.href} className="font-medium text-hax underline">
                Call {phone.display}
              </a>
            )}
            {phone && whatsapp && ", "}
            {whatsapp && (
              <a
                href={whatsapp.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-hax underline"
              >
                message me on WhatsApp
              </a>
            )}
            {(phone || whatsapp) && email && " or email "}
            {!phone && !whatsapp && email && "Email "}
            {email && (
              <a href={`mailto:${email}`} className="font-medium text-hax underline">
                {email}
              </a>
            )}
            .
          </p>
        )}
      </div>
    );
  }

  return (
    <div>
      <div className="border-b border-slate-100 p-5 sm:px-8">
        <BookingProgress steps={STEPS} current={step} />
      </div>

      <div className="p-5 sm:p-8">
        {step === 0 && (
          <fieldset>
            <legend className="contents">
              <h2 ref={headingRef} tabIndex={-1} className="text-2xl font-semibold tracking-tight text-ink outline-none">
                What would you like help with?
              </h2>
            </legend>
            <p className="mt-2 text-slate-600">Not sure? That&rsquo;s fine — pick the last option.</p>
            <div className="mt-6 grid gap-2.5 sm:grid-cols-2">
              {bookingServiceOptions.map((option) => (
                <ChoiceChip
                  key={option.id}
                  type="radio"
                  name="service"
                  value={option.id}
                  checked={service === option.id}
                  onChange={() => {
                    setService(option.id);
                    setServiceError(false);
                  }}
                  className="flex-col p-4"
                >
                  <span className="font-semibold text-ink">{option.label}</span>
                  <span className="mt-0.5 text-sm text-slate-500">{option.description}</span>
                </ChoiceChip>
              ))}
            </div>
            {serviceError && (
              <p role="alert" className="mt-3 text-sm text-red-700">
                Please choose an option to continue.
              </p>
            )}
            <StepActions onNext={continueFromService} />
          </fieldset>
        )}

        {step === 1 && (
          <div>
            <h2 ref={headingRef} tabIndex={-1} className="text-2xl font-semibold tracking-tight text-ink outline-none">
              Choose a date and time
            </h2>
            <p className="mt-2 text-slate-600">
              Pick the days and times that suit you. I&rsquo;ll confirm an exact time.
            </p>

            <fieldset className="mt-6">
              <legend className="text-sm font-semibold text-ink">Preferred days</legend>
              <div className="mt-3 flex flex-wrap gap-2">
                {DAY_OPTIONS.map((day) => (
                  <ChoiceChip
                    key={day}
                    type="checkbox"
                    name="days"
                    value={day}
                    checked={days.includes(day)}
                    onChange={() => setDays((current) => toggle(current, day))}
                    className="px-4 py-2.5 text-sm font-medium text-ink"
                  >
                    {day}
                  </ChoiceChip>
                ))}
              </div>
            </fieldset>

            <fieldset className="mt-6">
              <legend className="text-sm font-semibold text-ink">Preferred time of day</legend>
              <div className="mt-3 flex flex-wrap gap-2">
                {TIME_OPTIONS.map((time) => (
                  <ChoiceChip
                    key={time}
                    type="checkbox"
                    name="times"
                    value={time}
                    checked={times.includes(time)}
                    onChange={() => setTimes((current) => toggle(current, time))}
                    className="px-4 py-2.5 text-sm font-medium text-ink"
                  >
                    {time}
                  </ChoiceChip>
                ))}
              </div>
              <p className="mt-3 text-xs text-slate-500">
                All times are Irish time (Europe/Dublin). Leave blank if you have no
                preference.
              </p>
            </fieldset>

            <StepActions onBack={() => goTo(0)} onNext={() => goTo(2)} />
          </div>
        )}

        {step === 2 && (
          <form noValidate onSubmit={handleSubmit}>
            <h2 ref={headingRef} tabIndex={-1} className="text-2xl font-semibold tracking-tight text-ink outline-none">
              Where should we reach you?
            </h2>
            <p className="mt-2 text-slate-600">Just the essentials.</p>
            <ResponsePromise className="mt-1" />

            {/* Honeypot: off-screen, skipped by keyboard and screen readers. */}
            <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
              <label htmlFor="booking-company-website">Leave this field empty</label>
              <input
                id="booking-company-website"
                name="companyWebsite"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={honeypot}
                onChange={(event) => setHoneypot(event.target.value)}
              />
            </div>

            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <TextField
                id="booking-name"
                label="Name"
                autoComplete="name"
                value={details.name}
                error={errors.name}
                onChange={(name) => setDetails((current) => ({ ...current, name }))}
              />
              <TextField
                id="booking-business"
                label="Business name"
                autoComplete="organization"
                value={details.business}
                error={errors.business}
                onChange={(business) => setDetails((current) => ({ ...current, business }))}
              />
              <TextField
                id="booking-contact"
                label="Email or phone"
                autoComplete="email"
                value={details.contact}
                error={errors.contact}
                onChange={(contact) => setDetails((current) => ({ ...current, contact }))}
                className="sm:col-span-2"
              />
              <div className="sm:col-span-2">
                <label htmlFor="booking-notes" className="text-sm font-medium text-ink">
                  What should I know before the call?{" "}
                  <span className="font-normal text-slate-500">(optional)</span>
                </label>
                <textarea
                  id="booking-notes"
                  rows={3}
                  value={details.notes}
                  onChange={(event) =>
                    setDetails((current) => ({ ...current, notes: event.target.value }))
                  }
                  className="mt-2 block w-full rounded-xl border border-slate-300 px-3.5 py-3 text-base text-ink placeholder:text-slate-400 focus:border-hax focus:outline-none focus-visible:ring-2 focus-visible:ring-hax/30"
                />
              </div>
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

            <StepActions
              onBack={() => goTo(1)}
              nextLabel={status === "submitting" ? "Sending…" : "Book my 15-minute call"}
              nextType="submit"
              nextDisabled={status === "submitting"}
            />
          </form>
        )}
      </div>
    </div>
  );
}

function StepActions({
  onBack,
  onNext,
  nextLabel = "Continue",
  nextType = "button",
  nextDisabled = false,
}: {
  onBack?: () => void;
  onNext?: () => void;
  nextLabel?: string;
  nextType?: "button" | "submit";
  nextDisabled?: boolean;
}) {
  return (
    <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
      {onBack ? (
        <button
          type="button"
          onClick={onBack}
          className="h-12 rounded-full px-5 text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-ink"
        >
          Back
        </button>
      ) : (
        <span />
      )}
      <button
        type={nextType}
        onClick={onNext}
        disabled={nextDisabled}
        className="h-12 rounded-full bg-hax px-6 text-base font-medium text-white shadow-sm shadow-hax/20 transition-colors hover:bg-hax-dark disabled:opacity-60"
      >
        {nextLabel}
      </button>
    </div>
  );
}

function TextField({
  id,
  label,
  value,
  error,
  onChange,
  autoComplete,
  className = "",
}: {
  id: string;
  label: string;
  value: string;
  error?: string;
  onChange: (value: string) => void;
  autoComplete?: string;
  className?: string;
}) {
  const errorId = `${id}-error`;
  return (
    <div className={className}>
      <label htmlFor={id} className="text-sm font-medium text-ink">
        {label}
      </label>
      <input
        id={id}
        type="text"
        value={value}
        autoComplete={autoComplete}
        required
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        onChange={(event) => onChange(event.target.value)}
        className={`mt-2 block h-12 w-full rounded-xl border px-3.5 text-base text-ink focus:outline-none focus-visible:ring-2 ${
          error
            ? "border-red-600 focus-visible:ring-red-600/20"
            : "border-slate-300 focus:border-hax focus-visible:ring-hax/30"
        }`}
      />
      {error && (
        <p id={errorId} className="mt-1.5 text-sm text-red-700">
          {error}
        </p>
      )}
    </div>
  );
}
