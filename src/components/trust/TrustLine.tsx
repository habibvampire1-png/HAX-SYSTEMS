const items = ["Talk directly to the founder", "Meet online or in person", "No contracts"];

/** One-line trust signals shown under the hero buttons. Wraps between items, never inside one. */
export default function TrustLine({ className = "" }: { className?: string }) {
  return (
    <ul className={`flex flex-wrap justify-center gap-x-3 gap-y-1 text-sm text-slate-600 ${className}`}>
      {items.map((item, index) => (
        <li key={item} className="flex gap-3">
          {index > 0 && (
            <span aria-hidden className="text-slate-400">
              ·
            </span>
          )}
          {item}
        </li>
      ))}
    </ul>
  );
}
