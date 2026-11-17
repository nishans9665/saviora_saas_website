import React from "react";
import type { Metadata } from "next";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { ETFCalculatorView } from "@/components/calculators/etf/ETFCalculatorView";

export const metadata: Metadata = {
  title: {
    absolute: "Employer Contribution Calculator | Statutory Benefits & Fund Value – Saviora",
  },
  description: "Calculate 100% employer-funded statutory contributions, payroll taxes, insurance, and long-term fund balance growth across global markets.",
  alternates: {
    canonical: "https://saviora.app/free-tools/etf-calculator",
  },
  openGraph: {
    title: "Employer Contribution Calculator | Statutory Benefits & Fund Value – Saviora",
    description: "Calculate 100% employer-funded statutory contributions, payroll taxes, insurance, and long-term fund balance growth across global markets.",
    url: "https://saviora.app/free-tools/etf-calculator",
    siteName: "Saviora",
    type: "website",
  },
};

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Saviora Etf Calculator",
    applicationCategory: "FinanceApplication",
    operatingSystem: "Web, iOS, Android",
    offers: { "@type": "Offer", price: "0.00", priceCurrency: "USD" },
    description: "Calculate 100% employer-funded statutory contributions, payroll taxes, insurance, and long-term fund balance growth across global markets.",
    url: "https://saviora.app/free-tools/etf-calculator",
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://saviora.app" },
      { "@type": "ListItem", position: 2, name: "Free Tools", item: "https://saviora.app/free-tools" },
      { "@type": "ListItem", position: 3, name: "Etf Calculator", item: "https://saviora.app/free-tools/etf-calculator" },
    ],
  },
];

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Navbar />
      <main>
        <ETFCalculatorView />
      </main>
      <Footer />
    </>
  );
}
