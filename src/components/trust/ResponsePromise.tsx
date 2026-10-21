import { RESPONSE_PROMISE } from "@/config/site";

/** Reply-time promise shown next to forms. Wording lives in the site config. */
export default function ResponsePromise({ className = "" }: { className?: string }) {
  return <p className={`text-sm text-slate-600 ${className}`}>{RESPONSE_PROMISE}</p>;
}
