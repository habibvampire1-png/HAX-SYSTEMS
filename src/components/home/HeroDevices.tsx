"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { CallScreen, DashboardScreen, WebsiteScreen } from "@/components/home/DeviceScreens";
import ButtonLink from "@/components/ui/ButtonLink";
import { CheckIcon } from "@/components/ui/icons";
import PhoneFrame from "@/components/ui/PhoneFrame";
import { primaryCta } from "@/data/navigation";

/** Distance (px) the page scrolls before the side phones are fully fanned out. */
const FAN_DISTANCE = 320;
const SEND_DELAY_MS = 700;

function Device({
  variant,
  mobileVariant,
  label,
  children,
}: {
  variant: "left" | "lead" | "right";
  /** Position override for phones (≤600px), see globals.css. */
  mobileVariant?: "lead" | "left";
  /** Accessible name for an interactive phone; omit to hide a purely visual one. */
  label?: string;
  children: ReactNode;
}) {
  return (
    <PhoneFrame
      className={`device--${variant} ${mobileVariant ? `device--mobile-${mobileVariant}` : ""}`}
      role={label ? "group" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      {children}
    </PhoneFrame>
  );
}

/**
 * Three phones that fan out on scroll. The left phone is a working demo:
 * "Book now" opens the booking page, and "Send enquiry" drops a new enquiry
 * into the dashboard on the centre phone, then invites the visitor to book.
 */
export default function HeroDevices() {
  const ref = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const fan = Math.min(1, Math.max(0, window.scrollY / FAN_DISTANCE));
      element.style.setProperty("--fan", fan.toFixed(3));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    if (status !== "sending") return;
    const timer = window.setTimeout(() => setStatus("sent"), SEND_DELAY_MS);
    return () => window.clearTimeout(timer);
  }, [status]);

  return (
    <>
      <div ref={ref} className="hero-devices" style={{ "--fan": 0 } as CSSProperties}>
        <Device variant="left" mobileVariant="lead" label="Demo business website">
          <WebsiteScreen status={status} onSend={() => setStatus("sending")} />
        </Device>
        <Device variant="lead" mobileVariant="left">
          <DashboardScreen received={status === "sent"} />
        </Device>
        <Device variant="right">
          <CallScreen />
        </Device>
      </div>

      <div aria-live="polite" className="relative z-[3] mx-auto mt-8 min-h-14 max-w-xl px-4">
        {status === "sent" ? (
          <div className="demo-pop flex flex-col items-center gap-4 rounded-2xl border border-hax/20 bg-white/90 p-4 shadow-[0_14px_40px_rgb(18_18_18/0.08)] backdrop-blur sm:flex-row sm:text-left">
            <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-hax text-white">
              <CheckIcon className="size-4" strokeWidth={3} />
            </span>
            <p className="flex-1 text-sm text-slate-700">
              <b className="text-ink">That enquiry just landed in the dashboard.</b>{" "}
              No copying, no chasing. Want this for your business?
            </p>
            <ButtonLink href={primaryCta.href}>{primaryCta.label}</ButtonLink>
          </div>
        ) : (
          <p className="text-center text-sm text-slate-500">
            Try it: press <b className="font-semibold text-ink">Send enquiry</b> on the
            website phone and watch the dashboard update.
          </p>
        )}
      </div>
    </>
  );
}
