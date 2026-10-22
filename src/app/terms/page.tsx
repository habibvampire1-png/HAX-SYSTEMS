import type { Metadata } from "next";
import Container from "@/components/layout/Container";
import PageIntro from "@/components/shared/PageIntro";
import { SITE_CONFIG, getPublicContact } from "@/config/site";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "The basic terms for using the HAX Systems website and working with HAX Systems.",
};

/* TODO(legal): plain-English draft for Habib to review (ideally with a
   solicitor). Add the registered company name and number once issued. */
const sections = [
  {
    title: "Using this website",
    body: `This website is provided by ${SITE_CONFIG.name} for general information. I try to keep it accurate, but it isn't a contract or a guaranteed offer.`,
  },
  {
    title: "Working together",
    body: "Each project is agreed in writing before work starts. That agreement sets out what I'll build, the price, the timeline and what happens if either of us wants to stop.",
  },
  {
    title: "Pricing",
    body: "Pricing is fixed and agreed before any work starts. I don't charge for work you haven't agreed to.",
  },
  {
    title: "Your content and data",
    body: "You keep ownership of your business content, your customer information and your existing phone number. Details are confirmed in the project agreement.",
  },
  {
    title: "Liability",
    body: "I take care with every build, but I can't promise specific business results.",
  },
  {
    title: "Governing law",
    body: "These terms are governed by the laws of Ireland. Nothing here limits any rights you have under the consumer laws of your own country.",
  },
];

export default function TermsPage() {
  const { email } = getPublicContact();

  return (
    <main>
      <PageIntro title="Terms of Service" description="Short and in plain English." />
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
              <h2 className="text-xl font-semibold text-ink">Questions</h2>
              <p className="mt-2 text-lg leading-relaxed text-slate-700">
                Email{" "}
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
