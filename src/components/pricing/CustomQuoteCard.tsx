import PersonalisedLink from "@/components/industry/PersonalisedLink";
import { customQuote } from "@/config/pricing";

export default function CustomQuoteCard() {
  return (
    <div className="flex flex-col gap-5 rounded-3xl border border-slate-200 bg-slate-50/70 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
      <div className="max-w-2xl">
        <h2 className="text-2xl font-semibold tracking-tight text-ink">{customQuote.title}</h2>
        <p className="mt-2 text-lg leading-relaxed text-slate-600">{customQuote.text}</p>
      </div>
      <PersonalisedLink href="/book" size="lg" variant="secondary" className="w-full shrink-0 sm:w-auto">
        {customQuote.cta}
      </PersonalisedLink>
    </div>
  );
}
