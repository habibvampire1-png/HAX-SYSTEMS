import type { CallLine } from "@/data/industries";

/** An illustrative call as a transcript. Always labelled as an example. */
export default function CallScript({ lines }: { lines: CallLine[] }) {
  return (
    <figure className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
      <figcaption className="text-xs font-semibold tracking-[0.14em] text-slate-600 uppercase">
        Example call · not a real customer
      </figcaption>
      <ol className="mt-5 space-y-3">
        {lines.map((line, index) => {
          const isAi = line.speaker === "AI receptionist";
          return (
            <li key={index} className={`flex ${isAi ? "" : "justify-end"}`}>
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-3 text-base ${
                  isAi ? "bg-hax-soft text-ink" : "bg-slate-100 text-ink"
                }`}
              >
                <p className={`text-xs font-semibold ${isAi ? "text-hax" : "text-slate-600"}`}>
                  {line.speaker}
                </p>
                <p className="mt-0.5">{line.text}</p>
              </div>
            </li>
          );
        })}
      </ol>
    </figure>
  );
}
