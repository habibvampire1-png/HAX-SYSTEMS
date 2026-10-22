import type { Metadata } from "next";
import Container from "@/components/layout/Container";
import PageIntro from "@/components/shared/PageIntro";
import { SITE_CONFIG, getPublicContact } from "@/config/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "What personal information HAX Systems collects, why, and how to contact me about it.",
};

/* TODO(legal): this is a plain-English draft for Habib to review (ideally with
   a solicitor) before relying on it. It must be updated when form delivery
   (Phase 3) and analytics (Phase 6) go live. */
const sections = [
  {
    title: "Who I am",
    body: `${SITE_CONFIG.name} is a company registered in Ireland, run by ${SITE_CONFIG.founder}. I'm responsible for the personal information described on this page.`,
  },
  {
    title: "What I collect",
    body: "Only what you choose to send me through a form or by email: your name, business name, email address or phone number, and anything you write in the message box.",
  },
  {
    title: "Why I use it",
    body: "To reply to you, arrange a call and, if you go ahead, deliver the work. I don't sell your details and I don't add you to a mailing list without asking.",
  },
  {
    title: "Who sees it",
    body: "Only me. Form submissions are sent to my email inbox, so they pass through my email provider and the service that delivers the email.",
  },
  {
    title: "How long I keep it",
    body: "For as long as it's needed to reply to you or deliver work, and as long as the law requires me to keep business records. Ask me to delete it any time.",
  },
  {
    title: "Your rights",
    body: "You can ask to see, correct or delete the information I hold about you, or object to how I use it. You can also complain to the Data Protection Commission.",
  },
];

export default function PrivacyPage() {
  const { email } = getPublicContact();

  return (
    <main>
      <PageIntro title="Privacy Policy" description="Short and in plain English." />
      <Container className="max-w-3xl! pb-20 sm:pb-28">
        <div className="space-y-8">
          {sections.map(({ title, body }) => (
            <section key={title}>
              <h2 className="text-xl font-semibold text-ink">{title}</h2>
              <p className="mt-2 text-lg leading-relaxed text-slate-700">{body}</p>
            </section>
          ))}
          {email && (
            <section>
              <h2 className="text-xl font-semibold text-ink">Contact</h2>
              <p className="mt-2 text-lg leading-relaxed text-slate-700">
                For any privacy question, email{" "}
                <a href={`mailto:${email}`} className="font-medium text-hax underline">
                  {email}
                </a>
                .
              </p>
            </section>
          )}
        </div>
      </Container>
    </main>
  );
}
