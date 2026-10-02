import type { Metadata } from "next";
import PageIntro from "@/components/shared/PageIntro";

export const metadata: Metadata = {
  title: "Terms of Service",
};

export default function TermsPage() {
  return (
    <main>
      <PageIntro title="Terms of Service" description="Coming soon." />
    </main>
  );
}
