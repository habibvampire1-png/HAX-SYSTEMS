import Image from "next/image";
import type { ComponentType, ReactNode } from "react";
import { CheckIcon, PhoneIcon } from "@/components/ui/icons";
import PhoneFrame from "@/components/ui/PhoneFrame";
import type { SolutionSlug } from "@/types";

/*
 * Realistic covers for the concept projects in data/caseStudies.ts. Each one
 * is styled in its fictional business's own brand, the way a real client
 * build would be. Decorative — rendered inside an aria-hidden box.
 */

function Notification({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={`absolute z-10 flex items-center gap-2 rounded-xl border border-black/5 bg-white/95 px-2.5 py-1.5 shadow-[0_12px_32px_rgb(18_18_18/0.16)] backdrop-blur ${className}`}
    >
      {children}
    </span>
  );
}

/* ---------------------------------------------------------------- Café */

function CafeCover() {
  const brand = "#6b3f24";
  return (
    <div className="relative h-full w-full bg-[#efe6da]">
      {/* Desktop website */}
      <div className="absolute top-5 left-[5%] w-[78%] overflow-hidden rounded-lg bg-[#fbf7f1] shadow-[0_20px_48px_rgb(60_30_10/0.22)]">
        <div className="flex items-center gap-1 bg-[#e9e1d6] px-2 py-1.5">
          <span className="size-1.5 rounded-full bg-[#ff5f57]" />
          <span className="size-1.5 rounded-full bg-[#febc2e]" />
          <span className="size-1.5 rounded-full bg-[#28c840]" />
          <span className="ml-2 flex-1 truncate rounded bg-white/80 px-1.5 py-px text-[0.5rem] text-stone-500">
            emberandoak.coffee
          </span>
        </div>
        <div className="flex items-center justify-between px-3 py-2">
          <span className="font-serif text-[0.6875rem] font-bold tracking-tight" style={{ color: brand }}>
            Ember &amp; Oak
          </span>
          <span className="flex items-center gap-2 text-[0.5rem] text-stone-500">
            <span>Menu</span>
            <span>Visit</span>
            <span className="rounded-full px-2 py-0.5 font-semibold text-white" style={{ background: brand }}>
              Book a table
            </span>
          </span>
        </div>
        <div className="grid grid-cols-[1.05fr_1fr] gap-2 px-3 pb-3">
          <div className="pt-2">
            <p className="text-[0.4375rem] font-semibold tracking-[0.15em] text-stone-500 uppercase">
              Open daily · 7am–6pm
            </p>
            <p className="mt-1 font-serif text-[1.0625rem] leading-[1.05] font-bold text-stone-900">
              Slow coffee. Warm tables.
            </p>
            <p className="mt-1.5 text-[0.5rem] leading-snug text-stone-500">
              Small-batch roasts and fresh bakes in the heart of town.
            </p>
            <span
              className="mt-2.5 inline-flex rounded-full px-2.5 py-1 text-[0.5rem] font-semibold text-white"
              style={{ background: brand }}
            >
              Book a table →
            </span>
          </div>
          <div className="relative h-28 overflow-hidden rounded-md">
            <Image
              src="/images/case-studies/cafe-hero.jpg"
              alt=""
              fill
              sizes="200px"
              className="object-cover"
            />
          </div>
        </div>
      </div>

      {/* Mobile booking screen */}
      <div className="absolute top-[30%] right-[5%]">
        <PhoneFrame width={118} screenColor="#fbf7f1">
          <div className="relative mx-1 h-14 overflow-hidden rounded-md">
            <Image src="/images/case-studies/cafe-latte.jpg" alt="" fill sizes="110px" className="object-cover" />
          </div>
          <div className="px-2 pt-1.5">
            <p className="font-serif text-[0.5625rem] font-bold text-stone-900">Book a table</p>
            <div className="mt-1 grid grid-cols-2 gap-1 text-[0.4375rem]">
              <span className="rounded bg-white px-1 py-0.5 text-stone-600">4 guests</span>
              <span className="rounded bg-white px-1 py-0.5 text-stone-600">Sat 10am</span>
            </div>
            <span
              className="mt-1.5 block rounded-full py-0.5 text-center text-[0.4375rem] font-semibold text-white"
              style={{ background: brand }}
            >
              Confirm booking
            </span>
          </div>
        </PhoneFrame>
      </div>

      <Notification className="bottom-4 left-[7%] max-sm:hidden">
        <span className="flex size-5 items-center justify-center rounded-md text-white" style={{ background: brand }}>
          <CheckIcon className="size-3" strokeWidth={3} />
        </span>
        <span className="leading-tight">
          <span className="block text-[0.625rem] font-semibold text-stone-900">New booking</span>
          <span className="block text-[0.5625rem] text-stone-500">Table for 4 · Sat 10:00 AM</span>
        </span>
      </Notification>
    </div>
  );
}

/* -------------------------------------------------------------- Dental */

function DentalCover() {
  const brand = "#0f766e";
  const slots = [
    { time: "9:00", name: "R. Kelly", type: "Clean & polish" },
    { time: "11:30", name: "J. Ortiz", type: "Filling" },
    { time: "3:00", name: "Sarah Mitchell", type: "Check-up", isNew: true },
    { time: "4:30", name: "M. Chen", type: "Consultation" },
  ];
  return (
    <div className="relative h-full w-full bg-[#e6f2f0]">
      {/* Clinic diary */}
      <div className="absolute top-5 left-[6%] w-[62%] overflow-hidden rounded-xl bg-white shadow-[0_20px_48px_rgb(15_60_55/0.18)]">
        <div className="flex items-center justify-between px-3 py-2 text-white" style={{ background: brand }}>
          <span className="flex items-center gap-1.5 text-[0.625rem] font-semibold">
            <span className="flex size-4 items-center justify-center rounded bg-white/20 text-[0.5rem] font-bold">N</span>
            Northside Dental
          </span>
          <span className="text-[0.5rem] text-white/80">Thursday</span>
        </div>
        <ul className="divide-y divide-slate-100 px-2 py-1">
          {slots.map((slot) => (
            <li key={slot.time} className="flex items-center gap-2 py-1.5">
              <span className="w-7 text-[0.5rem] text-slate-400">{slot.time}</span>
              <span
                className={`flex-1 rounded-md border-l-2 px-1.5 py-1 ${
                  slot.isNew ? "bg-[#e6f2f0]" : "bg-slate-50"
                }`}
                style={{ borderColor: slot.isNew ? brand : "#cbd5e1" }}
              >
                <span className="block text-[0.5625rem] font-semibold text-slate-800">{slot.name}</span>
                <span className="block text-[0.5rem] text-slate-500">
                  {slot.type}
                  {slot.isNew && (
                    <b className="ml-1 font-semibold" style={{ color: brand }}>
                      · Booked by AI
                    </b>
                  )}
                </span>
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Call screen */}
      <div className="absolute top-[22%] right-[5%]">
        <PhoneFrame width={128} tone="dark" screenColor="#134e4a">
        <div className="flex h-full flex-col items-center bg-linear-to-b from-[#134e4a] to-[#0f2e2c] px-2 pt-1 text-center text-white">
          <span className="text-[0.4375rem] text-white/60">Northside Dental · AI receptionist</span>
          <span className="mt-2 flex size-8 items-center justify-center rounded-full bg-white/15 text-[0.625rem] font-semibold">
            SM
          </span>
          <span className="mt-1 text-[0.625rem] font-semibold">Sarah Mitchell</span>
          <span className="text-[0.4375rem] text-white/60">01:12 · on call</span>
          <span className="mt-2 rounded-lg bg-white/10 px-1.5 py-1 text-[0.4375rem] leading-snug text-white/90">
            &ldquo;You&rsquo;re booked for a check-up on Thursday at 3:00 PM.&rdquo;
          </span>
          <span className="mt-2.5 flex size-6 items-center justify-center rounded-full bg-[#ef4444]">
            <PhoneIcon className="size-3 rotate-[135deg]" />
          </span>
        </div>
        </PhoneFrame>
      </div>

      <Notification className="top-3 right-[4%]">
        <span className="flex size-5 items-center justify-center rounded-md text-white" style={{ background: brand }}>
          <CheckIcon className="size-3" strokeWidth={3} />
        </span>
        <span className="text-[0.625rem] font-semibold text-slate-800">Confirmation text sent</span>
      </Notification>
    </div>
  );
}

/* ---------------------------------------------------------- Auto care */

function AutoCover() {
  const brand = "#ea580c";
  return (
    <div className="relative h-full w-full bg-[#f3efe9]">
      {/* Phone with text conversation */}
      <div className="absolute top-4 left-[7%]">
        <PhoneFrame width={156}>
          <div className="flex items-center gap-1.5 border-b border-slate-100 bg-slate-50 px-2 py-1.5">
            <span
              className="flex size-5 items-center justify-center rounded-full text-[0.4375rem] font-bold text-white"
              style={{ background: brand }}
            >
              A
            </span>
            <span className="leading-tight">
              <span className="block text-[0.5625rem] font-semibold text-slate-900">Apex Auto Care</span>
              <span className="block text-[0.4375rem] text-slate-400">Text message</span>
            </span>
          </div>
          <div className="space-y-1.5 px-2 py-2 pb-5 text-[0.5rem] leading-snug">
            <p className="max-w-[88%] rounded-xl rounded-bl-sm bg-slate-100 px-2 py-1 text-slate-800">
              Hi James, your Corolla is due for its service next week. Want us to book you in?
            </p>
            <p className="ml-auto max-w-[70%] rounded-xl rounded-br-sm bg-[#2b7cff] px-2 py-1 text-white">
              Yes please, Tuesday morning?
            </p>
            <p className="max-w-[88%] rounded-xl rounded-bl-sm bg-slate-100 px-2 py-1 text-slate-800">
              Done — you&rsquo;re booked for Tue 9:00 AM. We&rsquo;ll remind you the day before.
            </p>
          </div>
        </PhoneFrame>
      </div>

      {/* Workflow card */}
      <div className="absolute top-8 right-[6%] w-[40%] rounded-xl bg-white p-2.5 shadow-[0_20px_48px_rgb(18_18_18/0.14)]">
        <p className="text-[0.5625rem] font-semibold text-slate-900">Service reminder</p>
        <p className="text-[0.4375rem] text-slate-400">Runs automatically</p>
        <ol className="mt-2 space-y-1.5">
          {["Service due in 7 days", "Reminder text sent", "Customer replied", "Booking created"].map((step) => (
            <li key={step} className="flex items-center gap-1.5 text-[0.5rem] text-slate-700">
              <span
                className="flex size-3 shrink-0 items-center justify-center rounded-full text-white"
                style={{ background: brand }}
              >
                <CheckIcon className="size-2" strokeWidth={3.5} />
              </span>
              {step}
            </li>
          ))}
        </ol>
      </div>

      <Notification className="right-[8%] bottom-4">
        <span className="flex size-5 items-center justify-center rounded-md text-white" style={{ background: brand }}>
          <CheckIcon className="size-3" strokeWidth={3} />
        </span>
        <span className="leading-tight">
          <span className="block text-[0.625rem] font-semibold text-slate-900">Booked · Tue 9:00 AM</span>
          <span className="block text-[0.5625rem] text-slate-500">No phone calls needed</span>
        </span>
      </Notification>
    </div>
  );
}

const covers: Record<SolutionSlug, ComponentType> = {
  websites: CafeCover,
  "ai-calling": DentalCover,
  automation: AutoCover,
  "business-systems": AutoCover,
};

export default function CaseStudyCover({ solution }: { solution: SolutionSlug }) {
  const Cover = covers[solution];
  return <Cover />;
}
