import Container from "@/components/layout/Container";
import HeroDevices from "@/components/home/HeroDevices";
import IndustrySelector from "@/components/home/IndustrySelector";
import TrustLine from "@/components/trust/TrustLine";
import ButtonLink from "@/components/ui/ButtonLink";
import { MonitorIcon, PhoneIcon, type IconComponent } from "@/components/ui/icons";
import { demoCta, primaryCta } from "@/data/navigation";

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
          Never miss
          <br />
          another customer
          <span className="hero-dot" />
        </h1>

        <div className="relative z-[1] mx-auto mt-5 max-w-[46ch] sm:mt-7">
          <p className="mb-6 text-base leading-[1.55] text-slate-600 sm:mb-8 sm:text-[1.0625rem] sm:leading-[1.6]">
            We set up AI receptionists, booking and follow-up systems for Irish
            businesses — so every call and enquiry gets answered, even when
            you&rsquo;re busy.
          </p>

          <div className="flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
            <ButtonLink href={demoCta.href} size="lg" className="px-7">
              {demoCta.label}
            </ButtonLink>
            <ButtonLink href={primaryCta.href} size="lg" variant="secondary" className="px-7">
              {primaryCta.label}
            </ButtonLink>
          </div>
          <TrustLine className="mt-4" />
        </div>

        <IndustrySelector />

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
