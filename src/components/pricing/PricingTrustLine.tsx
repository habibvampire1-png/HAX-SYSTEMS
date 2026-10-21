import { pricingTrustLine } from "@/config/pricing";

export default function PricingTrustLine() {
  return <p className="text-center text-base text-slate-600">{pricingTrustLine.join(" · ")}.</p>;
}
