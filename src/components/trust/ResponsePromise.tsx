import { RESPONSE_PROMISE, getPublicContact } from "@/config/site";

/** Reply-time promise shown next to forms, with direct ways to reach the founder. */
export default function ResponsePromise({ className = "" }: { className?: string }) {
  const { email, phone } = getPublicContact();

  return (
    <p className={`text-sm text-slate-600 ${className}`}>
      {RESPONSE_PROMISE}
      {email && (
        <>
          {" "}
          Or email{" "}
          <a href={`mailto:${email}`} className="font-medium text-hax underline">
            {email}
          </a>
          {phone && (
            <>
              {" "}
              or call{" "}
              <a href={phone.href} className="font-medium text-hax underline">
                {phone.display}
              </a>
            </>
          )}
          .
        </>
      )}
    </p>
  );
}
