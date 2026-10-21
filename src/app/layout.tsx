import type { Metadata } from "next";
import { Geist, Geist_Mono, Manrope } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileContactBar from "@/components/layout/MobileContactBar";
import LocalBusinessJsonLd from "@/components/seo/LocalBusinessJsonLd";
import { SITE_CONFIG, getPublicContact } from "@/config/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

/* Manrope is used only for the HAX Systems wordmark. */
const manrope = Manrope({
  variable: "--font-manrope-src",
  subsets: ["latin"],
  weight: ["500", "800"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    default: `${SITE_CONFIG.name} | AI Receptionists & Booking Systems for Irish Businesses`,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description: SITE_CONFIG.description,
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/icons/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/icons/favicon-16.png", sizes: "16x16", type: "image/png" },
    ],
  },
  openGraph: {
    type: "website",
    siteName: SITE_CONFIG.name,
    title: `${SITE_CONFIG.name} | AI Receptionists & Booking Systems for Irish Businesses`,
    description: SITE_CONFIG.description,
    url: "/",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const { phone, whatsapp } = getPublicContact();

  return (
    // suppressHydrationWarning: browser extensions add attributes to <html>
    // (e.g. data-js-focus-visible); this only affects this one element.
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${manrope.variable} h-full antialiased`}
    >
      {/* Bottom padding reserves room for the fixed mobile contact bar. */}
      <body className="flex min-h-full flex-col pb-[calc(4.5rem+env(safe-area-inset-bottom))] lg:pb-0">
        <LocalBusinessJsonLd />
        <Header />
        <div className="flex-1">{children}</div>
        <Footer />
        <MobileContactBar phone={phone} whatsapp={whatsapp} />
      </body>
    </html>
  );
}
