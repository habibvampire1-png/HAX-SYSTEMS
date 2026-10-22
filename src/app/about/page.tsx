import type { Metadata } from "next";
import Container from "@/components/layout/Container";
import CtaSection from "@/components/shared/CtaSection";
import FounderCard from "@/components/shared/FounderCard";
import PageIntro from "@/components/shared/PageIntro";
import { SITE_CONFIG, getPublicContact } from "@/config/site";

export const metadata: Metadata = {
  title: "About Habib Ali and HAX Systems",
  description:
    "HAX Systems is run by Habib Ali. You deal with the founder directly, from first call to go-live.",
};

const principles = [
  "We start with the business, not the technology.",
  "We understand the workflow — how customers arrive, get served and come back.",
  "We identify where friction, missed opportunities and manual work live.",
  "We decide what system actually makes sense.",
  "Then we build it, and keep improving it.",
];

export default function AboutPage() {
  const { email, phone, whatsapp } = getPublicContact();

  return (
    <main>
      <PageIntro
        eyebrow={`About ${SITE_CONFIG.name}`}
        title="You deal with me directly."
        description="HAX Systems is run by me, Habib Ali. I look at how your business handles calls and enquiries, then build what fixes it."
      />
      <Container className="grid gap-12 pb-20 sm:pb-28 lg:grid-cols-[7fr_5fr] lg:gap-20">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-ink">How I work</h2>
          <ol className="mt-6 divide-y divide-slate-200 border-y border-slate-200">
            {principles.map((principle, index) => (
              <li key={principle} className="flex gap-5 py-5 text-lg text-slate-700">
                <span className="w-6 shrink-0 text-sm font-semibold text-hax">0{index + 1}</span>
                {principle}
              </li>
            ))}
          </ol>
        </div>
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-ink">Who&rsquo;s behind it</h2>
          <div className="mt-6">
            <FounderCard />
          </div>
          {/* TODO(habib): review and personalise this story. It is written only
              from what is known about the business, with no invented history. */}
          <div className="mt-6 space-y-4 text-lg leading-relaxed text-slate-700">
            <p>
              I&rsquo;m {SITE_CONFIG.founder}, and I run {SITE_CONFIG.name}. We build AI receptionists and booking systems for service businesses.
            </p>
            <p>
              Most small businesses don&rsquo;t lose customers because the work is poor. They lose
              them because the phone rang while someone was busy, or an enquiry waited too long
              for a reply.
            </p>
            <p>
              I set up AI receptionists, booking and follow-up systems so that doesn&rsquo;t
              happen. I also build websites that turn visitors into enquiries.
            </p>
            <p>You&rsquo;ll deal with me directly, from the first call to the day it goes live.</p>
          </div>
          <h2 className="mt-10 text-2xl font-semibold tracking-tight text-ink">Get in touch</h2>
          <ul className="mt-4 space-y-2 text-lg text-slate-700">
            {email && (
              <li>
                Email:{" "}
                <a href={`mailto:${email}`} className="font-medium text-hax underline">
                  {email}
                </a>
              </li>
            )}
            {phone && (
              <li>
                Phone:{" "}
                <a href={phone.href} className="font-medium text-hax underline">
                  {phone.display}
                </a>
              </li>
            )}
            {whatsapp && (
              <li>
                <a
                  href={whatsapp.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-hax underline"
                >
                  Message me on WhatsApp
                </a>
              </li>
            )}
          </ul>
        </div>
      </Container>
      <CtaSection
        title="Let's find where you're losing customers."
        description="A 15-minute call. I'll tell you what I'd fix first."
      />
    </main>
  );
}
