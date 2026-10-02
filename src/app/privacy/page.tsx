import type { Metadata } from "next";
import PageIntro from "@/components/shared/PageIntro";

export const metadata: Metadata = {
  title: "Privacy Policy",
};

export default function PrivacyPage() {
  return (
    <main>
      <PageIntro title="Privacy Policy" description="Coming soon." />
    </main>
  );
}
