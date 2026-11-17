import React from "react";
import type { Metadata } from "next";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { IncomeTaxCalculatorView } from "@/components/calculators/income-tax/IncomeTaxCalculatorView";

export const metadata: Metadata = {
  title: {
    absolute: "Global Income Tax Calculator | Progressive Tax Slabs & Effective Rates – Saviora",
  },
  description: "Free progressive income tax calculator by country. Calculate personal income tax, standard deductions, tax brackets, and take-home pay across 8 global markets.",
  alternates: {
    canonical: "https://saviora.app/free-tools/income-tax-calculator",
  },
  openGraph: {
    title: "Global Income Tax Calculator | Progressive Tax Slabs & Effective Rates – Saviora",
    description: "Free progressive income tax calculator by country. Calculate personal income tax, standard deductions, tax brackets, and take-home pay across 8 global markets.",
    url: "https://saviora.app/free-tools/income-tax-calculator",
    siteName: "Saviora",
    type: "website",
  },
};

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Saviora Income Tax Calculator",
    applicationCategory: "FinanceApplication",
    operatingSystem: "Web, iOS, Android",
    offers: { "@type": "Offer", price: "0.00", priceCurrency: "USD" },
    description: "Free progressive income tax calculator by country. Calculate personal income tax, standard deductions, tax brackets, and take-home pay across 8 global markets.",
    url: "https://saviora.app/free-tools/income-tax-calculator",
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://saviora.app" },
      { "@type": "ListItem", position: 2, name: "Free Tools", item: "https://saviora.app/free-tools" },
      { "@type": "ListItem", position: 3, name: "Income Tax Calculator", item: "https://saviora.app/free-tools/income-tax-calculator" },
    ],
  },
];

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Navbar />
      <main>
        <IncomeTaxCalculatorView />
      </main>
      <Footer />
    </>
  );
}
