import { ChevronDownIcon } from "@/components/ui/icons";

/** Questions and answers as native disclosure elements: keyboard-accessible with no JavaScript. */
export default function FaqList({ faqs }: { faqs: { question: string; answer: string }[] }) {
  return (
    <div className="divide-y divide-slate-200 border-y border-slate-200">
      {faqs.map(({ question, answer }) => (
        <details key={question} className="group py-1">
          <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-4 rounded-md py-3 text-lg font-semibold text-ink [&::-webkit-details-marker]:hidden">
            {question}
            <ChevronDownIcon className="size-5 shrink-0 text-slate-500 transition-transform group-open:rotate-180" />
          </summary>
          <p className="pb-4 text-base leading-relaxed text-slate-600">{answer}</p>
        </details>
      ))}
    </div>
  );
}
