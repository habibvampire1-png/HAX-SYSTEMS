import Container from "@/components/layout/Container";
import HeroDevices from "@/components/home/HeroDevices";
import HeroTypewriter from "@/components/home/HeroTypewriter";
import ButtonLink from "@/components/ui/ButtonLink";
import { MonitorIcon, PhoneIcon, type IconComponent } from "@/components/ui/icons";
import { primaryCta } from "@/data/navigation";

function FloatingChip({
  icon: Icon,
  title,
  detail,
  className,
}: {
  icon: IconComponent;
  title: string;
  detail: string;
  className: string;
}) {
  return (
    <div className={`absolute ${className}`}>
      <div className="hero-float flex items-center gap-2.5 rounded-[18px] bg-white px-4 py-3 whitespace-nowrap shadow-[0_14px_40px_rgb(18_18_18/0.1)]">
        <Icon className="size-[1.125rem] text-hax" />
        <span>
          <b className="block text-[0.8125rem] font-bold text-ink">{title}</b>
          <span className="block text-[0.6875rem] text-slate-500">{detail}</span>
        </span>
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <section aria-labelledby="hero-heading" className="relative isolate overflow-hidden">
      <div aria-hidden className="dot-grid absolute inset-0 -z-10" />

      <Container className="relative pt-10 pb-8 text-center sm:pt-16 sm:pb-12">
        {/* Floating status chips — desktop only, decorative. */}
        <div aria-hidden className="pointer-events-none absolute inset-0 z-[2] hidden min-[861px]:block">
          <FloatingChip
            icon={MonitorIcon}
            title="New enquiry"
            detail="Website · just now"
            className="top-[20%] left-[2%] -rotate-[7deg]"
          />
          <FloatingChip
            icon={PhoneIcon}
            title="Call answered"
            detail="Booked · Thu 3 PM"
            className="top-[24%] right-[3%] rotate-[4deg] [&>div]:[animation-delay:-3.5s]"
          />
        </div>

        <h1 id="hero-heading" className="hero-display relative z-[1] text-ink">
          <span className="sr-only">
            Every business needs a system — a website, AI agent, CRM,
            dashboard, workflow or follow-up. We build it.
          </span>
          <span aria-hidden>
            Every business
            <br />
            needs a <HeroTypewriter />
            <span className="hero-dot" />
          </span>
        </h1>

        <div className="relative z-[1] mx-auto max-w-[46ch]">
          <p className="mx-auto mb-[22px] max-w-[min(70vw,300px)] text-sm leading-[1.55] text-slate-600 sm:mb-[30px] sm:max-w-none sm:text-[1.0625rem] sm:leading-[1.6]">
            <span className="sm:hidden">
              We find where you&rsquo;re losing customers — and build the
              system that wins them back.
            </span>
            <span className="hidden sm:inline">
              We find where your business is losing customers and time, then
              build the website, AI calling and automation that fix it — all
              connected, all working for you.
            </span>
          </p>

          <ButtonLink href={primaryCta.href} size="lg" className="min-w-[150px] px-[38px]">
            {primaryCta.label}
          </ButtonLink>
          <p className="mt-3 text-sm text-slate-500">
            One conversation. A clear plan. No technical jargon.
          </p>
        </div>

        <p className="sr-only">
          Below: three phones. A business website that captures enquiries, the
          dashboard where those enquiries land, and an AI agent answering a
          call and booking an appointment.
        </p>
        <HeroDevices />
      </Container>
    </section>
  );
}
