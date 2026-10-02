import Link from "next/link";
import {
  CalendarIcon,
  CheckIcon,
  HeadsetIcon,
  MenuIcon,
  MonitorIcon,
  PhoneIcon,
  RepeatIcon,
  StarIcon,
} from "@/components/ui/icons";

/*
 * Phone screen mockups for the hero, laid out for a 236px-wide screen.
 * All names and figures are generic sample data.
 */

function Check({ done = true }: { done?: boolean }) {
  return (
    <span
      className={`flex size-3.5 shrink-0 items-center justify-center rounded-full ${
        done ? "bg-hax text-white" : "border border-slate-300"
      }`}
    >
      {done && <CheckIcon className="size-2" strokeWidth={3.5} />}
    </span>
  );
}

type WebsiteScreenProps = {
  status: "idle" | "sending" | "sent";
  onSend: () => void;
};

/**
 * Left phone: a business website built to capture enquiries. "Book now"
 * opens the real booking page; "Send enquiry" runs the live system demo.
 */
export function WebsiteScreen({ status, onSend }: WebsiteScreenProps) {
  return (
    <div className="flex h-full flex-col px-3.5 pt-2 text-ink">
      <div className="flex items-center justify-between">
        <MenuIcon className="size-3.5" />
        <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[7px] text-slate-500">
          yourbusiness.com
        </span>
        <span className="size-3.5" />
      </div>

      <p className="mt-5 text-[7px] font-semibold tracking-wider text-hax uppercase">
        Local service business
      </p>
      <p className="mt-1 text-[17px] leading-[1.1] font-bold tracking-tight">
        Book your consultation online.
      </p>
      <p className="mt-1.5 text-[8px] leading-snug text-slate-500">
        Pick a service, choose a time and get an instant confirmation.
      </p>
      <Link
        href="/book"
        className="mt-3 inline-flex self-start rounded-full bg-hax px-3 py-1.5 text-[8px] font-semibold text-white transition-colors hover:bg-hax-dark"
      >
        Book now
      </Link>

      <div className="mt-4 rounded-xl border border-slate-200 p-2.5">
        <p className="text-[8px] font-semibold">Quick enquiry</p>
        {[
          ["Name", "Alex Morgan"],
          ["Service", "Consultation"],
          ["Preferred day", "Thursday"],
        ].map(([label, value]) => (
          <div key={label} className="mt-1.5 rounded-md bg-slate-50 px-2 py-1.5">
            <p className="text-[6px] text-slate-400">{label}</p>
            <p className="text-[8px] font-medium">{value}</p>
          </div>
        ))}
        <button
          type="button"
          onClick={onSend}
          disabled={status === "sending"}
          className="mt-2 block w-full cursor-pointer rounded-md bg-ink py-1.5 text-center text-[8px] font-semibold text-white transition-colors hover:bg-hax disabled:cursor-wait"
        >
          {status === "sending" ? "Sending…" : status === "sent" ? "Send again" : "Send enquiry"}
        </button>
      </div>

      {status === "sent" ? (
        <div className="demo-pop mt-3 flex items-center gap-2 rounded-xl border border-hax/25 bg-hax-soft px-2.5 py-2">
          <Check />
          <div>
            <p className="text-[8px] font-semibold">Enquiry received</p>
            <p className="text-[6.5px] text-slate-500">Added to the dashboard</p>
          </div>
        </div>
      ) : (
        <p className="mt-3 rounded-xl border border-dashed border-slate-200 px-2.5 py-2.5 text-center text-[7px] text-slate-400">
          Press &ldquo;Send enquiry&rdquo; to try it
        </p>
      )}
    </div>
  );
}

/** Centre phone: the HAX business dashboard. Updates live when the demo
 *  enquiry on the left phone is sent. */
export function DashboardScreen({ received }: { received: boolean }) {
  const metrics = [
    { label: "New enquiries", value: received ? "19" : "18", changed: received },
    { label: "Bookings", value: "12", changed: false },
    { label: "Calls answered", value: "27", changed: false },
    { label: "Follow-ups", value: "5", changed: false },
  ];
  const baseline = [
    { icon: PhoneIcon, text: "Call answered & booked", meta: "Thu 3:00 PM", done: true, isNew: false },
    { icon: RepeatIcon, text: "Follow-up sent", meta: "Automatic", done: true, isNew: false },
    { icon: StarIcon, text: "Review request", meta: "Scheduled · 6 PM", done: false, isNew: false },
    { icon: MonitorIcon, text: "Website enquiry", meta: "Jordan P. · 9:12", done: true, isNew: false },
  ];
  const today = received
    ? [
        { icon: MonitorIcon, text: "New website enquiry", meta: "Alex M. · just now", done: true, isNew: true },
        ...baseline.slice(0, 3),
      ]
    : baseline;

  return (
    <div className="flex h-full flex-col px-3.5 pt-2 text-ink">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <MenuIcon className="size-3.5" />
          <span className="flex size-3.5 items-center justify-center rounded bg-ink">
            <span className="size-1 rounded-[1px] bg-hax" />
          </span>
          <span className="text-[9px] font-bold">HAX</span>
        </div>
        <span className="flex items-center gap-1 rounded-full bg-hax-soft px-1.5 py-0.5 text-[6.5px] font-medium text-hax">
          <span className="size-1 rounded-full bg-hax" />
          Live
        </span>
      </div>

      <p className="mt-3 text-[6.5px] text-slate-400">Thursday · This week</p>
      <p className="text-[13px] font-semibold tracking-tight">Business overview</p>

      <dl className="mt-2.5 grid grid-cols-2 gap-1.5">
        {metrics.map(({ label, value, changed }) => (
          <div
            key={`${label}-${value}`}
            className={`rounded-lg px-2 py-1.5 ${changed ? "demo-pop bg-hax-soft text-hax" : "bg-slate-50"}`}
          >
            <dt className={`text-[6.5px] ${changed ? "text-hax" : "text-slate-500"}`}>{label}</dt>
            <dd className="text-[15px] leading-tight font-semibold tracking-tight">{value}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-2.5 rounded-lg bg-slate-50 p-2">
        <p className="text-[7px] font-medium">Enquiries &amp; bookings</p>
        <div className="mt-1.5 flex h-10 items-end gap-1">
          {[55, 70, 48, 82, 92, 40, 30].map((height, index) => (
            <span key={index} className="flex h-full flex-1 items-end gap-px">
              <span className="flex-1 rounded-t-[1px] bg-slate-200" style={{ height: `${height}%` }} />
              <span className="flex-1 rounded-t-[1px] bg-hax" style={{ height: `${height * 0.68}%` }} />
            </span>
          ))}
        </div>
      </div>

      <p className="mt-2.5 text-[7px] font-medium">Today</p>
      <ul className="mt-1 space-y-1">
        {today.map(({ icon: Icon, text, meta, done, isNew }) => (
          <li
            key={text}
            className={`flex items-center gap-2 rounded-lg border px-2 py-1.5 ${
              isNew ? "demo-pop border-hax/40 bg-hax-soft" : "border-slate-100"
            }`}
          >
            <Check done={done} />
            <span className="min-w-0 flex-1">
              <span className="block truncate text-[7.5px] font-medium">{text}</span>
              <span className="block text-[6px] text-slate-400">{meta}</span>
            </span>
            <Icon className="size-2.5 text-slate-400" />
          </li>
        ))}
      </ul>

      <div className="mt-auto mb-3 flex items-center justify-between border-t border-slate-100 pt-2 text-[7px]">
        <span className="font-semibold">Next booking</span>
        <span className="text-slate-500">Today · 3:00 PM</span>
      </div>
    </div>
  );
}

/** Right phone: an AI agent answering a call and booking it. */
export function CallScreen() {
  return (
    <div className="flex h-full flex-col px-3.5 pt-2 text-ink">
      <div className="flex items-center justify-between">
        <span className="text-[8px] font-semibold text-hax">AI agent</span>
        <span className="font-mono text-[7px] text-slate-400">00:42</span>
      </div>

      <div className="mt-4 flex flex-col items-center text-center">
        <span className="flex size-11 items-center justify-center rounded-full bg-slate-100 text-[11px] font-semibold text-slate-600">
          SM
        </span>
        <p className="mt-1.5 text-[11px] font-semibold">Sarah Mitchell</p>
        <p className="flex items-center gap-1 text-[7px] text-slate-500">
          <PhoneIcon className="size-2" />
          Incoming call · New customer
        </p>
      </div>

      <div className="mt-3 space-y-1.5 rounded-xl bg-slate-50 p-2">
        <p className="max-w-[85%] rounded-lg rounded-tl-sm border border-slate-200 bg-white px-2 py-1 text-[7.5px]">
          <span className="flex items-center gap-0.5 text-[6px] font-medium text-hax">
            <HeadsetIcon className="size-2" />
            AI agent
          </span>
          Thanks for calling. How can I help?
        </p>
        <p className="ml-auto max-w-[85%] rounded-lg rounded-tr-sm bg-ink px-2 py-1 text-[7.5px] text-white">
          I&rsquo;d like to book a consultation.
        </p>
        <p className="max-w-[85%] rounded-lg rounded-tl-sm border border-slate-200 bg-white px-2 py-1 text-[7.5px]">
          Thursday at 3:00 PM works. Shall I book it?
        </p>
        <p className="ml-auto max-w-[85%] rounded-lg rounded-tr-sm bg-ink px-2 py-1 text-[7.5px] text-white">
          Yes, please.
        </p>
      </div>

      <div className="mt-2.5 flex items-center justify-between rounded-lg bg-hax px-2.5 py-2 text-white">
        <span className="flex items-center gap-1 text-[8px] font-semibold">
          <CalendarIcon className="size-2.5" />
          Appointment booked
        </span>
        <span className="text-[7px] text-white/80">Thu · 3 PM</span>
      </div>

      <ul className="mt-2 space-y-1">
        {["Confirmation sent", "Customer added", "CRM updated"].map((item) => (
          <li key={item} className="flex items-center gap-1.5 rounded-lg border border-slate-100 px-2 py-1.5 text-[7.5px]">
            <Check />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
