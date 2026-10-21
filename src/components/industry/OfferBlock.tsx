import PersonalisedLink from "@/components/industry/PersonalisedLink";
import { CheckIcon } from "@/components/ui/icons";
import { formatEur, getPackage } from "@/config/pricing";
import { FLAGS, OFFERS } from "@/config/site";
import { demoCta, getDemoHref } from "@/data/navigation";

/** The offer: free demo, optional 14-day trial, and the pricing line. All wording comes from the site config. */
export default function OfferBlock({ industry }: { industry?: string }) {
  const receptionist = getPackage("ai-receptionist");
  const receptionistPrice = receptionist
    ? `AI Receptionist: ${formatEur(receptionist.setupEur)} setup, then ${formatEur(receptionist.monthlyEur)}/month. Fixed price, agreed before work starts.`
    : "Fixed price, agreed before work starts.";
  const points = [
    ...(FLAGS.DEMO_OFFER_ENABLED ? [OFFERS.demo.promise] : []),
    ...(FLAGS.TRIAL_OFFER_ENABLED ? [`${OFFERS.trial.title}. ${OFFERS.trial.guarantee}`] : []),
    receptionistPrice,
  ];

  return (
    <div className="rounded-[2rem] bg-ink p-7 text-white sm:p-10">
      <ul className="space-y-4">
        {points.map((point) => (
          <li key={point} className="flex gap-3 text-lg">
            <span className="mt-1 flex size-6 shrink-0 items-center justify-center rounded-full bg-hax">
              <CheckIcon className="size-3.5" strokeWidth={3} />
            </span>
            {point}
          </li>
        ))}
      </ul>
      {FLAGS.DEMO_OFFER_ENABLED && (
        <PersonalisedLink href={getDemoHref(industry)} size="lg" variant="inverse" className="mt-8 w-full sm:w-auto">
          {demoCta.label}
        </PersonalisedLink>
      )}
    </div>
  );
}
